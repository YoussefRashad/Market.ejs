
const mongoose = require('mongoose')
const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userID: String,
    productID: String,
    timeStamp: Number
})
const cartItem = mongoose.model('cart',cartSchema)
const DB_URL = 'mongodb://localhost:27017/market';


exports.addNewItem = (data) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true }).then(() => {
            return cartItem.findOne({ productID: data.productID})
        }).then((itemInDB) => {
            if (!itemInDB){
                let item = new cartItem(data)
                return item.save()
            }
            else{
                return cartItem.updateOne({ productID: data.productID }, {
                     amount: ((+itemInDB.amount) + (+data.amount)),
                     timeStamp : Date.now()
                    })
            }
        }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getElementByUserID = (ID)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(DB_URL, {useNewUrlParser: true}).then(()=>{
            return cartItem.find({ userID: ID }, {}, { sort: { timeStamp: 1}})
        }).then(items=>{
            mongoose.disconnect()
            resolve(items)
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.editItem = (ID, newData)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(DB_URL, {useNewUrlParser:true}).then(()=>{
            return cartItem.updateOne({ _id: ID}, newData)
        }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch(err=>{
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.deleteItem = (ID)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(DB_URL, { useNewUrlParser: true }).then(()=>{
            return cartItem.findByIdAndDelete(ID)
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}
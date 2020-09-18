
const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    // details of user
    userID: String,
    address: String,
    //details of Product
    cartID: String, // i will convert it to array but i wanna check wheater it works or not
    cartName: String,
    amount: Number,
    price: Number,
    status: String,
    timeStamp: Number
})
const order = mongoose.model('order', orderSchema);
const DB_URL = 'mongodb://localhost:27017/market'


exports.addOrder = (data) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true }).then(() => {
            let newOrder = new order(data);
            return newOrder.save()
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch((err) => {
            mongoose.disconnect()
            reject(err);
        })
    })
}

exports.addAllOrders = (data) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true }).then(() => {
            let newOrder = new order(data);
            return newOrder.save()
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch((err) => {
            mongoose.disconnect()
            reject(err);
        })
    })
}

exports.getOrdersforSpecificUserByID = (ID)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(DB_URL, {useNewUrlParser:true}).then(()=>{
            return order.find({userID:ID}, {}, {sort:{timeStamp: 1}})
        }).then((orders)=>{
            mongoose.disconnect()
            resolve(orders)
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.cancelOrder = (ID) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true }).then(() => {
            return order.findByIdAndDelete(ID)
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.cancelAllOrders = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL, { useNewUrlParser: true }).then(() => {
            return order.deleteMany()
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}
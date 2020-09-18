

const moongose = require('mongoose')
const productSchema = moongose.Schema({
    name : String,
    price : Number,
    description : String,
    category : String,
    image : String
})
let productModel = moongose.model('product',productSchema)
const DB_URL = "mongodb://localhost:27017/market"

exports.getAllProduct = ()=>{
    return new Promise((resolve, reject)=>{
        moongose.connect(DB_URL, { useNewUrlParser: true }).then(()=>{
            return productModel.find({})
        }).then((results)=>{
            moongose.disconnect()
            resolve(results)
        }).catch((err)=>{
            moongose.disconnect()
            resolve(err)
        })
    })
}

exports.getSepcificCategory = (cat)=>{
    return new Promise((resolve, reject)=>{
        moongose.connect(DB_URL, {useNewUrlParser:true}).then(()=>{
            return productModel.find({category : cat})
        }).then((results)=>{
            moongose.disconnect()
            resolve(results)
        }).catch((err)=>{
            moongose.disconnect()
            reject(err)
        })
    })
}

exports.getProductByID = (ID)=>{
    return new Promise((resolve, reject)=>{
        moongose.connect(DB_URL, {useNewUrlParser:true}).then(()=>{
            return productModel.findById(ID)
        }).then(result=>{
            moongose.disconnect()
            resolve(result)
        }).catch(err=>{
            moongose.disconnect()
            reject(err)
        })
    })
}

exports.postAddProduct = (data)=>{
    return new Promise((resolve, reject)=>{
        moongose.connect(DB_URL, {useNewUrlParser:true}).then(()=>{
            let newProduct = new productModel(data)
            return newProduct.save()
        }).then(()=>{
            moongose.disconnect()
            resolve()
        }).catch((err)=>{
            moongose.disconnect()
            reject(err)
        })
    })
}



const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    email: String,
    password: String,
    userName: String,
    isAdmin:{
        type:Boolean,
        default:false
    }
})
const User = mongoose.model('user',userSchema);
const DB_URL = 'mongodb://localhost:27017/market';
const bcrypt = require('bcrypt')

exports.signup = (userName, email, pass)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(DB_URL,{ useNewUrlParser: true }).then(()=>{
            return User.findOne({email:email})
        }).then((result)=>{
            if(result){
                mongoose.disconnect()
                reject('sorry, email is used !')
             }else{ 
                return hashPass = bcrypt.hash(pass,10)
             }
        }).then((hashPass)=>{
            let newUser = new User({
                email:email,
                password: hashPass,
                userName:userName
            })
            return newUser.save()
        }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}


exports.login = (email, pass)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(DB_URL, { useNewUrlParser: true }).then(()=>{
            User.findOne({email:email}).then((user)=>{
                if(!user){
                    mongoose.disconnect()
                    reject('Email is not found')
                }else{
                    bcrypt.compare(pass, user.password).then((same)=>{
                        if (!same) {
                            mongoose.disconnect()
                            reject('pass is not correct')
                        } else {
                            mongoose.disconnect()
                            console.log(user._id)
                            resolve({
                                ID: user._id,
                                isAdmin: user.isAdmin
                            })
                        }
                    }).catch((err) => {
                        mongoose.disconnect()
                        reject(err)
                    })
                }
            })
        })
    })
}
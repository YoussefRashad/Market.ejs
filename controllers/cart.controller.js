

const cartModel = require('../models/cart.model')
const validationResult = require('express-validator').validationResult


exports.postCard = (req,res,next)=>{
    if (validationResult(req).isEmpty()){
        cartModel.addNewItem({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.productCount,
            userID: req.session.userID,
            productID: req.body.productID,
            timeStamp: Date.now()
        }).then(()=>{
            res.redirect('/cart')
        }).catch((err) => {
            res.status(500)
            next(err)
        })
    }else{
        req.flash('validationError',validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }
}

exports.getCart = (req,res,next)=>{
    cartModel.getElementByUserID(req.session.userID).then((items)=>{
        res.render('cart',{
            items:items,
            isUser:true,
            validationError: req.flash('validationError')[0],
            isAdmin: req.session.isAdmin,
            pageTitle: 'Cart'
        })
    })
}

exports.postSave = (req, res, next) => {
    if(validationResult(req).isEmpty()){
        cartModel.editItem(req.body.cartID, {
            amount: req.body.amount,
            timeStamp: Date.now()
        }).then(() => {
            res.redirect('/cart')
        }).catch((err) => {
            res.status(500)
            next(err);
        })
    } else{
        req.flash('validationError',validationResult(req).array());
        res.redirect('/cart')
    }
}
exports.postDelete = (req, res, next) => {
    cartModel.deleteItem(req.body.cartID).then(()=>{
        res.redirect('/cart')
    }).catch(err => {
        res.status(500)
        next(err)
    })
}

const orderModel = require('../models/order.model')

//Verify Orders
exports.getVerifyOrder = (req,res,next)=>{
    console.log('Get Verify Order')//order/verifyOrder
    let orderObject = {
        userID: req.session.userID,
        cartID: req.query.cartID,
        cartName: req.query.cartName,
        amount: req.query.amount,
        price: req.query.price
    }
    res.render('verifyOrder',{
        dataVerifyOrder : orderObject,
        isUser: true,
        isAdmin: req.session.isAdmin,
        pageTitle: 'Verify Order'
    })
}

exports.postVerifyOrder = (req,res,next)=>{
    orderModel.addOrder({
        userID: req.session.userID,
        address: req.body.address,
        cartID: req.body.cartID,
        cartName: req.body.cartName,
        amount: req.body.amount,
        price: req.body.price,
        status: 'pending',
        timeStamp : Date.now(),
    }).then(()=>{
        res.redirect('/order')
    }).catch((err) => {
        res.status(500)
        next(err)
    })
}

exports.postVerifyAllOrders = (req, res, next) => {
    console.log(req.body.ID)
    
}


// Get from verify Orders to Order
exports.getOrderByUserID = (req,res,next)=>{
    orderModel.getOrdersforSpecificUserByID(req.session.userID).then((orders)=>{
        res.render('order',{
            orders: orders,
            isUser: true,
            isAdmin: req.session.isAdmin,
            pageTitle: 'Orders'
        })
    })
}

exports.cancelOrder = (req, res, next) => {
    console.log(req.body.ID)
    orderModel.cancelOrder(req.body.ID).then(()=>{
        res.redirect('/order')
    }).catch((err)=>{
        res.status(500)
        next(err)
    })
}

exports.cancelAllOrder = (req, res, next) => {
    orderModel.cancelAllOrders().then(()=>{
        res.redirect('/cart')
    }).catch((err) => {
        res.status(500)
        next(err)
    })
}
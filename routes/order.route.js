

const router = require('express').Router();
const bodyParser = require('body-parser')
const bodyParserMW = bodyParser.urlencoded({
    extended:true
});
const authGuard = require('./guards/auth.guard');
const check = require('express-validator').check;
const orderController = require('../controllers/order.controller')

// for verifyOrders
router.get('/verifyOrder', authGuard.isAuth, orderController.getVerifyOrder);
router.post('/verifyOrder', authGuard.isAuth, bodyParserMW,
    check('address').not().isEmpty().withMessage('Please Enter your address'),
    orderController.postVerifyOrder); // for form in verifyOrder.ejs
/*
router.post('/verifyAllOrders', authGuard.isAuth, bodyParserMW,
    orderController.postVerifyAllOrders); // for form in verifyOrder.ejs*/

// for orders page
router.get('/', authGuard.isAuth, orderController.getOrderByUserID);
router.post('/cancel', authGuard.isAuth, bodyParserMW, orderController.cancelOrder);
router.post('/cancelAll', authGuard.isAuth, bodyParserMW, orderController.cancelAllOrder); 

module.exports = router

const router = require('express').Router()
const cartController = require('../controllers/cart.controller')
const check = require('express-validator').check
const bodyParser = require('body-parser')
const bodyParserMW = bodyParser.urlencoded({extended:true})
const  authGuard = require('./guards/auth.guard')


router.get('/',authGuard.isAuth, cartController.getCart)

router.post('/', authGuard.isAuth, bodyParserMW,
    check('productCount').not().isEmpty().withMessage('amount is required').isInt({min:1}).withMessage('amount must be greater than 0'),
    cartController.postCard)

router.post('/save',authGuard.isAuth,
    bodyParserMW,
    check('amount').not().isEmpty().withMessage('amount is required').isInt({ min: 1 }).withMessage('amount must be greater than 0'),
    cartController.postSave)
router.post('/delete', authGuard.isAuth, bodyParserMW , cartController.postDelete)



module.exports = router
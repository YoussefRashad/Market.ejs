

const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const bodyParser = require('body-parser')
const bodyParserMW = bodyParser.urlencoded({
    extended:true
})
const check = require('express-validator').check
const authGuard = require('./guards/auth.guard')


router.get('/signup',authGuard.notAuth, authController.getSignup)

router.post('/signup', authGuard.notAuth, 
    bodyParserMW,
    check('userName').not().isEmpty(),
    check('email').isEmail(),
    check('password').isLength({min:6}),
    check('confirmPassword').custom((value, {req})=>{
            if(value === req.body.password) 
                return true;
            else     
                throw "Confirm Password & Password aren't equivelant"; 
    }),

    authController.postSignup)

router.get('/login', authGuard.notAuth, authController.getLogin)

router.post('/login', authGuard.notAuth,
    bodyParserMW, 
    check('email').isEmail().withMessage('Enter right email'),
    check('password').isLength({min:6}).withMessage('the length of password should bigger than 5'),
    authController.postLogin)

router.all('/logout', authGuard.isAuth, authController.logout)

module.exports = router
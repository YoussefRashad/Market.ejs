

const authModel = require('../models/auth.model')
const ValidationResult = require('express-validator').validationResult;
// lsh m7tyt4 el validation


exports.getSignup = (req, res, next)=>{
    res.render('signup',{
        isUser : false,
        authError : req.flash('authError')[0],
        isAdmin: false,
        pageTitle: 'Signup'
    })
}
exports.postSignup = (req, res, next) => {
    authModel.signup(req.body.userName, req.body.email, req.body.password).then(()=>{
        res.redirect('/login')
    }).catch(err=>{
        req.flash('authError',err)
        res.redirect('/signup')
    })
}


exports.getLogin = (req,res, next)=>{
    res.render('login',{
        isUser:false,
        authError: req.flash('authError')[0],
        isAdmin: false,
        pageTitle: 'Login'
    })
}
exports.postLogin = (req,res, next)=>{
    authModel.login(req.body.email, req.body.password).then((result)=>{
        req.session.userID = result.ID
        req.session.isAdmin = result.isAdmin
        console.log('Login')
        res.redirect('/')
    }).catch((err)=>{
        req.flash('authError',err)
        res.redirect('/login')
    })

}

exports.logout = (req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}

const productModel = require('../models/product.model')

exports.getAddProduct = (req, res, next) => {
    res.render('addProduct', {
        validationError: req.flash('validationError')[0],
        isUser: true,
        isAdmin: true,
        pageTitle: 'Add Product'
    })
}

exports.getManageProduct = (req, res, next) => {
    res.render('manageProduct', {
        validationError: req.flash('validationError')[0],
        isUser: true,
        isAdmin: true,
        pageTitle: 'Manage Product'
    })
}

exports.postAddProduct = (req, res, next)=>{
    productModel.postAddProduct({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.file.filename

    }).then(()=> res.redirect('/'))
    .catch((err)=>{
        res.status(403)
        next(err)
    })
}
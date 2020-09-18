
const productModel = require('../models/product.model')

exports.getProduct = (req,res,next)=>{
    // get product
    // render product.ejs

    let ID = req.params.id
    productModel.getProductByID(ID).then(product=>{
        res.render('product',{
            product : product,
            isUser: req.session.userID,
            isAdmin: req.session.isAdmin,
            pageTitle: 'Product'
        })
    })
}
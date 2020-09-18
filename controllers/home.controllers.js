
const productsModel = require('../models/product.model')

exports.getHome = (req,res,next)=>{
    //get specific Category
    // render index.ejs
    const category = req.query.category
    let productResult;

    if(category && category!=='All')
        productResult = productsModel.getSepcificCategory(category)
    else
        productResult =  productsModel.getAllProduct()
    
    productResult.then((results) => {
        res.render('index', {
            products: results,
            isUser: req.session.userID,
            validationError: req.flash('validationError')[0],
            isAdmin: req.session.isAdmin,
            pageTitle: 'Home'
        })
    })
}

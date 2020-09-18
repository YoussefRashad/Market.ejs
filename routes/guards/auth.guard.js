

exports.isAuth = (req,res,next)=>{
    if(req.session.userID) 
        next()
    else 
        res.redirect('/login')
}

exports.notAuth = (req, res, next) => {
    if (!req.session.userID) 
        next()
    else 
        res.redirect('/')

}
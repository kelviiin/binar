module.exports = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    console.log("reject need login admin")
    res.redirect("/");
}
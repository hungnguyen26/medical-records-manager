module.exports.createPost = (req, res, next)=>{
    if(!req.body.name){
        req.flash("thatbai","Vui lòng nhập tên thuốc !! ");
        res.redirect("back");
        return;
    }
    next();
}
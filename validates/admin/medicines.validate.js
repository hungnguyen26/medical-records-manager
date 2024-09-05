module.exports.createPost = (req, res, next)=>{
    if(!req.body.name){
        req.flash("thatbai","Vui lòng nhập tên thuốc !! ");
        res.redirect("back");
        return;
    }
    if(!req.body.quantity){
        req.flash("thatbai","Vui lòng nhập số lượng thuốc !! ");
        res.redirect("back");
        return;
    }
    if(!req.body.price){
        req.flash("thatbai","Vui lòng nhập giá thuốc !! ");
        res.redirect("back");
        return;
    }
    if(!req.body.usage){
        req.flash("thatbai","Vui lòng chọn cách dùng !! ");
        res.redirect("back");
        return;
    }
    next();
}
module.exports.createPost = (req , res , next)=>{
    if(!req.body.fullName){
        req.flash("thatbai","Vui lòng nhập họ tên !! ");
        res.redirect("back");
        return;
    }
    if(!req.body.email){
        req.flash("thatbai","Vui lòng nhập email !! ");
        res.redirect("back");
        return;
    }
    if(!req.body.password){
        req.flash("thatbai","Vui lòng nhập mật khẩu !! ");
        res.redirect("back");
        return;
    }
    if(!req.body.phone){
        req.flash("thatbai","Vui lòng nhập số điện thoại !! ");
        res.redirect("back");
        return;
    }
    if(!req.body.address){
        req.flash("thatbai","Vui lòng nhập địa chỉ !! ");
        res.redirect("back");
        return;
    }
    if(!req.body.dateOfBirth){
        req.flash("thatbai","Vui lòng nhập ngày sinh !! ");
        res.redirect("back");
        return;
    }
    if(!req.body.Role_id){
        req.flash("thatbai","Vui lòng chọn chức vụ !! ");
        res.redirect("back");
        return;
    }
    next();
}
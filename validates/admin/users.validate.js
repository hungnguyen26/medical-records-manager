module.exports.createPatientPost = (req , res , next)=>{
    if(!req.body.fullName){
        req.flash("thatbai","Vui lòng nhập họ tên.");
        res.redirect("back");
        return;
    }
    if(!req.body.phone){
        req.flash("thatbai","Vui lòng nhập số điện thoại.");
        res.redirect("back");
        return;
    }
    if(!req.body.dateOfBirth){
        req.flash("thatbai","Vui lòng chọn ngày sinh.");
        res.redirect("back");
        return;
    }
    if(!req.body.sex){
        req.flash("thatbai","Vui lòng chọn giới tính.");
        res.redirect("back");
        return;
    }
    if(!req.body.address){
        req.flash("thatbai","Vui lòng nhâp địa chỉ.");
        res.redirect("back");
        return;
    }
    next();
}
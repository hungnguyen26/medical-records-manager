const Account = require("../../models/accounts.model");
const systemConfig = require("../../config/system");
const md5 = require("md5");
// [GET] admin/auth/login
module.exports.login = async (req, res) => {
    res.render("admin/pages/auth/login.pug",{
        pageTitle: "Đăng nhập"
    })
};

// [POST] admin/auth/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Account.findOne({
        email: req.body.email,
        deleted:false
    })

    if(!user){
        req.flash("thatbai","Email không tồn tại !!");
        res.redirect("back");
        return;
    }

    if(md5(password) != user.password){
        req.flash("thatbai","Sai mật khẩu !!");
        res.redirect("back");
        return;
    }

    if(user.status == "inactive"){
        req.flash("thatbai","Tài khoản đã bị khóa !!");
        res.redirect("back");
        return;
    }
    req.flash("thanhcong", "Đăng nhập thành công !!")
    res.cookie("tokenUser",user.token);
    res.redirect(`${systemConfig.prefixAdmin}`)
};

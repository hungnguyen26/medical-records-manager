const md5 = require("md5");
const systemConfig = require("../../config/system");

const Account = require("../../models/accounts.model");
const Role = require("../../models/roles.model");
const searchHelper = require("../../helpers/search");

// [GET] admin/accounts
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    };
    
    // tìm kiếm
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
        find.fullName = objectSearch.regex;
    }
    // end tìm kiếm

    const records = await Account.find(find).select("-password -token"); 
    for (const record of records) {
        const role = await Role.findOne({
        _id: record.Role_id,
        deleted: false,
        });
        record.role = role;
    }

    res.render("admin/pages/user/index.pug", {
        pageTitle: "Quản lí người dùng",
        records: records,
        keyword:objectSearch.keyword
    });
};

// [GET] admin/accounts/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted:false
    });
    res.render("admin/pages/user/create.pug", {
        pageTitle: "Thêm mới người dùng",
        roles:roles
    });
};

// [POST] admin/accounts/create
module.exports.createPost = async (req, res) => {
    const emailTontai = await Account.findOne({
        email: req.body.email,
        deleted:false
    });
    if(emailTontai){
        res.redirect("back");
        return;
    }
    if(!emailTontai){
        req.body.password = md5(req.body.password);
        // console.log(req.body);
        const record = new Account(req.body);
        await record.save();
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
};

const Account = require("../../models/accounts.model");
const Role = require("../../models/roles.model");

// [GET] admin/accounts
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    };
    
    // tìm kiếm
    let keyword = "";
    if(req.query.keyword){
        keyword = req.query.keyword;

        const regex = new RegExp(keyword,"i");

        find.fullName = regex;
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
        keyword:keyword
    });
};

const Account = require("../../models/accounts.model");

// [GET] admin/accounts
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };
    const records = await Account.find(find).select("-password -token");
    console.log(records);
    res.render("admin/pages/user/index.pug", {
        pageTitle: "Quản lí người dùng",
        records:records
    });
};

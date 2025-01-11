const Role = require("../../models/roles.model");
const Account = require("../../models/accounts.model");

// [GET] admin/home
module.exports.index = async (req, res) => {
  res.render("admin/pages/calendars/index.pug", {
    pageTitle: "Lịch biểu",
  });
};

module.exports.create = async (req, res) => {
  const date = req.query;
  const roleDoctor = await Role.findOne({ quyen: "doctor" });
  // console.log(roleDoctor);

  const doctors = await Account.find({
    Role_id: roleDoctor.id,
    deleted: false,
    status: "active",
    _id: { $ne: res.locals.User.id },
  });
  // console.log(doctors);

  res.render("admin/pages/calendars/create.pug", {
    pageTitle: "Tạo cuộc họp",
    date,
    doctors,
  });
};

module.exports.createPost = async (req, res) => {
 res.send("ok");
};

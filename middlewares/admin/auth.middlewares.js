const systemConfig = require("../../config/system");
const Account = require("../../models/accounts.model");
const Role = require("../../models/roles.model");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.tokenUser) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  }
  const user = await Account.findOne({
    token: req.cookies.tokenUser,
  }).select("-password");

  if (!user) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  }

  const role = await Role.findOne({
    _id: user.Role_id,
  }).select("title quyen description");

  res.locals.User = user; // tạo biến toàn cục tên user, tất cả file pug đều dùng được user
  res.locals.Role = role;
  
  next();
};

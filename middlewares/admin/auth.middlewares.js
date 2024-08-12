const systemConfig = require("../../config/system");
const Account = require("../../models/accounts.model");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.tokenUser) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  } else {
    // console.log(req.cookies.tokenUser);
    const user = await Account.findOne({
      token: req.cookies.tokenUser,
    });
    if (!user) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      next();
    }
  }
};

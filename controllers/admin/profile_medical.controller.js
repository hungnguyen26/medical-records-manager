const User = require("../../models/users.model");
const searchHelper = require("../../helpers/search");

// [GET] admin/profile-medical
module.exports.index = async (req, res) => {
  const find = { deleted: false };

  // search
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.name = objectSearch.regex;
  }
  // end search

  const users = await User.find(find);
  console.log(users);

  res.render("admin/pages/administrative-staff/profile-medical/index.pug", {
    pageTitle: "Hồ sơ bệnh án",
    users: users,
  });
};

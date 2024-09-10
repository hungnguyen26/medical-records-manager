const User = require("../../models/users.model");
const searchHelper = require("../../helpers/search");

const systemConfig = require("../../config/system");

// [GET] admin/profile-medical
module.exports.index = async (req, res) => {
  const find = { deleted: false };

  // search
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.fullName = objectSearch.regex;
  }
  // end search

  const users = await User.find(find);
  // console.log(users);
  
  res.render("admin/pages/administrative-staff/profile-medical/index.pug", {
    pageTitle: "Hồ sơ bệnh án",
    users: users,
    keyword: objectSearch.keyword
  });
};


// [GET] admin/profile-medical/create-patient
module.exports.createPatient = async (req, res) => {
  
  res.render("admin/pages/administrative-staff/profile-medical/createPatient.pug", {
    pageTitle: "Tạo hồ sơ bệnh nhân"
  });
};

// [POST] admin/profile-medical/create-patient
module.exports.createPatientPost = async (req, res) => {
  try {
    if(req.body.dateOfBirth){
      req.body.dateOfBirth = new Date(req.body.dateOfBirth);
    }
    const newPatient = new User(req.body);
    await newPatient.save();

    req.flash("thanhcong", " Thêm bệnh nhân mới.");
    res.redirect(`${systemConfig.prefixAdmin}/profile-medical`);

  } catch (error) {

    console.log(error);
    req.flash("thatbai", "Có lỗi xảy ra khi thêm bệnh nhân.");
    res.redirect(`${systemConfig.prefixAdmin}/profile-medical`);
  }
  
};

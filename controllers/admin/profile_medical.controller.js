// const searchHelper = require("../../../helpers/search");


// [GET] admin/profile-medical
module.exports.index = async (req, res) => {
    // const find = {};

    // // search 

    // // end search 

    res.render("admin/pages/administrative-staff/profile-medical/index.pug", {
      pageTitle:  "Hồ sơ bệnh án"
    });
  };
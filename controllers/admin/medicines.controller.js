const Medicine = require("../../models/medicines.model");
const searchHelper = require("../../helpers/search");

// [GET] admin/medicines
module.exports.index = async (req, res) => {
  const find = {};

  // search
  const objectSearch = searchHelper(req.query);
  if(objectSearch.regex){
    find.name = objectSearch.regex;    
  }
  // end search

  const medicines = await Medicine.find(find);
  // console.log(medicines);

  res.render("admin/pages/medicines/index.pug", {
    pageTitle:  "Danh sách thuốc",
    medicines: medicines,
    keyword: objectSearch.keyword
  });
};

// [GET] admin/medicines
module.exports.create = async (req, res) => {

  res.render("admin/pages/medicines/create.pug", {
    pageTitle: "Danh sách thuốc"
  });
};

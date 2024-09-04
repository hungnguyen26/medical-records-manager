const Medicine = require("../../models/medicines.model");
const searchHelper = require("../../helpers/search");

const systemConfig = require("../../config/system");


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

// [POST] admin/medicines
module.exports.createPost = async (req, res) => {
  // console.log(req.body);
  const tenThuocTonTai = await Medicine.findOne({
    name: req.body.name
  })
  if(tenThuocTonTai){
    req.flash("thatbai", " Tên thuốc đã tồn tại.");
    res.redirect("back");
  }else{
      const record = new Medicine(req.body);
      await record.save();
      
      req.flash("thanhcong", " Thêm thuốc thành công.");
      res.redirect(`${systemConfig.prefixAdmin}/medicines`);
  }
};

// [PATCH] admin/medicines/edit/:id
module.exports.edit = async (req, res) => {
  console.log(req.params.id); 
  res.send("Ok")
};
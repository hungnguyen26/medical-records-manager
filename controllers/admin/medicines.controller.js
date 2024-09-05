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

// [GET] admin/medicines/create
module.exports.create = async (req, res) => {

  res.render("admin/pages/medicines/create.pug", {
    pageTitle: "Thêm thuốc"
  });
};

// [POST] admin/medicines/create
module.exports.createPost = async (req, res) => {
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


// [DELETE] admin/medicines/delete/:id
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    await Medicine.findByIdAndDelete(id);
    req.flash("thanhcong", " Xóa thuốc thành công.");
    res.redirect(`${systemConfig.prefixAdmin}/medicines`);
  } catch (error) {
    req.flash("thatbai", " Xóa thuốc thất bại.");
    res.redirect(`${systemConfig.prefixAdmin}/medicines`);
  }
};

// [GET] admin/medicines/edit/:id
module.exports.edit = async (req, res) => {
  const medicine = await Medicine.findOne({
    _id: req.params.id
  })  
  res.render("admin/pages/medicines/edit.pug", {
    pageTitle: "Chỉnh sửa thuốc",
    medicine:medicine
  });
};

// [PATCH] admin/medicines/edit/:id
module.exports.editPatch = async (req, res) => {
  // console.log(req.body);
  const id = req.params.id;
  try {
    await Medicine.updateOne({_id:id }, req.body);
    req.flash("thanhcong", " Chỉnh sửa thuốc thành công.");
    res.redirect(`${systemConfig.prefixAdmin}/medicines`);
  } catch (error) {
    req.flash("thatbai", " Chỉnh sửa thuốc thất bại.");
    res.redirect(`${systemConfig.prefixAdmin}/medicines`);

  }
};
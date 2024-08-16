const Medicine = require("../../models/medicines.model");

// [GET] admin/medicines
module.exports.index = async (req, res) => {
  const find = {}
  const medicines = await Medicine.find(find);
  console.log(medicines);

  res.render("admin/pages/medicines/index.pug", {
    pageTitle:  "Quản lý thuốc",
    medicines: medicines
  });
};

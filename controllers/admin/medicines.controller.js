// [GET] admin/medicines
module.exports.index = (req, res)=>{
    res.render("admin/pages/medicines/index.pug", {
        pageTitle: "Thuốc",
      });
}
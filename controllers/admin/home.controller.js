

// [GET] admin/home
module.exports.home = async (req, res) => {
  res.render("admin/pages/home/index.pug", {
    pageTitle: "Trang chủ"
  });
};

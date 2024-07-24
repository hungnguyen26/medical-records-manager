

// [GET] admin/dashboard
module.exports.home = async (req, res) => {
  res.render("admin/pages/home/index.pug", {
    pageTitle: "Trang admin"
  });
};

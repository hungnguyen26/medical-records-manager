// [GET] admin/home
module.exports.index = async (req, res) => {
  res.render("admin/pages/examinations/index.pug", {
    pageTitle: "Khám bệnh",
  });
};

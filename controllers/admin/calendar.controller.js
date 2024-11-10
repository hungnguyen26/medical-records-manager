// [GET] admin/home
module.exports.index = async (req, res) => {
  res.render("admin/pages/calendars/index.pug", {
    pageTitle: "Lịch biểu",
  });
};

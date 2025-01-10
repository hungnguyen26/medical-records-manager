// [GET] admin/home
module.exports.index = async (req, res) => {
  res.render("admin/pages/calendars/index.pug", {
    pageTitle: "Lịch biểu",
  });
};


module.exports.create = async (req, res) => {
  const date = req.query;
  res.render("admin/pages/calendars/create.pug", {
    pageTitle: "Tạo cuộc họp",
    date:date
  });
};

module.exports.createPost = async (req, res) => {
  console.log(req.body);
  
};


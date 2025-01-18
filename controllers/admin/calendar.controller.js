const systemConfig = require("../../config/system");

const Role = require("../../models/roles.model");
const Account = require("../../models/accounts.model");
const Meeting = require("../../models/meetings.model");

// [GET] admin/home
module.exports.index = async (req, res) => {
  res.render("admin/pages/calendars/index.pug", {
    pageTitle: "Lịch biểu",
  });
};

// [GET] admin/calendar/meeting/create
module.exports.create = async (req, res) => {
  const date = req.query;
  const roleDoctor = await Role.findOne({ quyen: "doctor" });
  // console.log(roleDoctor);

  const doctors = await Account.find({
    Role_id: roleDoctor.id,
    deleted: false,
    status: "active",
    _id: { $ne: res.locals.User.id },
  });
  // console.log(doctors);

  res.render("admin/pages/calendars/create.pug", {
    pageTitle: "Tạo cuộc họp",
    date,
    doctors,
  });
};

// [POST] admin/calendar/meeting/create
module.exports.createPost = async (req, res) => {
  // const owner = res.locals.User.id;
  // console.log(req.body);
  try {
    const {
      subject,
      description,
      date,
      startTime,
      endTime,
      room,
      participants,
      files,
    } = req.body;
    const startDate = new Date(`${date}T${startTime}:00`);
    const endDate = new Date(`${date}T${endTime}:00`);

    const newMeeting = new Meeting({
      subject,
      description,
      room,
      startDate,
      endDate,
      participants,
      files,
      owner: res.locals.User.id,
    })
    
    await newMeeting.save();
    
    req.flash("thanhcong", "Tạo cuộc họp thành công");
    res.redirect(`${systemConfig.prefixAdmin}/calendar`);

  } catch (error) {
    console.log(error);
    req.flash("thatbai", "Lỗi khi tạo cuộc họp");
    res.redirect(`back`);
  }

};

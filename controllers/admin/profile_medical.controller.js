const User = require("../../models/users.model");
const Department = require("../../models/department.model");
const searchHelper = require("../../helpers/search");

const systemConfig = require("../../config/system");
const Account = require("../../models/accounts.model");
const Appointment = require("../../models/appoinments.model");

// [GET] admin/profile-medical
module.exports.index = async (req, res) => {
  const find = { deleted: false };

  // search
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.fullName = objectSearch.regex;
  }
  // end search

  const users = await User.find(find);
  // console.log(users);

  res.render("admin/pages/administrative-staff/profile-medical/index.pug", {
    pageTitle: "Hồ sơ bệnh án",
    users: users,
    keyword: objectSearch.keyword,
  });
};

// [GET] admin/profile-medical/create-patient
module.exports.createPatient = async (req, res) => {
  res.render(
    "admin/pages/administrative-staff/profile-medical/createPatient.pug",
    {
      pageTitle: "Tạo hồ sơ bệnh nhân",
    }
  );
};

// [POST] admin/profile-medical/create-patient
module.exports.createPatientPost = async (req, res) => {
  try {
    if (req.body.dateOfBirth) {
      req.body.dateOfBirth = new Date(req.body.dateOfBirth);
    }
    const newPatient = new User(req.body);
    await newPatient.save();

    req.flash("thanhcong", " Thêm bệnh nhân mới.");
    res.redirect(`${systemConfig.prefixAdmin}/profile-medical`);
  } catch (error) {
    console.log(error);
    req.flash("thatbai", "Có lỗi xảy ra khi thêm bệnh nhân.");
    res.redirect(`${systemConfig.prefixAdmin}/profile-medical`);
  }
};

// [GET] admin/profile-medical/:id
module.exports.detailPatient = async (req, res) => {
  const patient_id = req.params.id;
  const patient = await User.findOne({
    _id: patient_id,
  });
  // console.log(patient);

  res.render(
    "admin/pages/administrative-staff/profile-medical/detailPatient.pug",
    {
      pageTitle: "Thông tin bệnh nhân",
      patient: patient,
    }
  );
};

// [GET] admin/profile-medical/edit-patient/:id
module.exports.editPatient = async (req, res) => {
  const patient_id = req.params.id;
  const patient = await User.findOne({
    _id: patient_id,
  });
  res.render(
    "admin/pages/administrative-staff/profile-medical/editPatient.pug",
    {
      pageTitle: "Cập nhật bệnh nhân",
      patient: patient,
    }
  );
};

// [PATCH] admin/profile-medical/edit-patient/:id
module.exports.editPatientPatch = async (req, res) => {
  const patient_id = req.params.id;
  try {
    if (req.body.dateOfBirth) {
      req.body.dateOfBirth = new Date(req.body.dateOfBirth);
    }
    await User.findByIdAndUpdate(patient_id, req.body);
    req.flash("thanhcong", " Cập nhật bệnh nhân thành công.");
    res.redirect(`${systemConfig.prefixAdmin}/profile-medical`);
  } catch (error) {
    console.log(error);
    req.flash("thatbai", " Có lỗi xảy ra khi cập nhật bệnh nhân.");
    res.redirect(`${systemConfig.prefixAdmin}/profile-medical`);
  }
};

// [GET] admin/profile-medical/book-appointment/:id
module.exports.bookAppointment = async (req, res) => {
  const departments = await Department.find({
    deleted: false,
  });
  const patient = await User.findOne({ _id: req.params.id }).select(
    "fullName phone dateOfBirth"
  );
  res.render(
    "admin/pages/administrative-staff/profile-medical/bookAppointment.pug",
    {
      pageTitle: "Đặt lịch khám",
      departments: departments,
      patient: patient,
    }
  );
};

// [POST] admin/profile-medical/book-appointment/:id
module.exports.bookAppointmentPost = async (req, res) => {
  try {
    const data = {
      ...req.body,
      status: "booked",
    };
    // console.log(data);
    
    const bookAppointment = new Appointment(data);
    await bookAppointment.save();
    // console.log(bookAppointment);
    req.flash("thanhcong", " Đặt lịch khám.");
    res.redirect(`${systemConfig.prefixAdmin}/profile-medical`);
  } catch (error) {
    console.log(error);
    req.flash("thatbai", " Có lỗi khi đặt lịch khám.");
    res.redirect(`${systemConfig.prefixAdmin}/profile-medical`);
  }
};

// [GET] admin/profile-medical/appointment/:id
module.exports.detailAppointment = async (req, res) => {
  const userInfo = await User.findOne({
    _id: req.params.id,
    deleted:false
  }).select("fullName phone");
  
  const appoinments = await Appointment.find({
    patientId: req.params.id,
    status: "booked"
  }).sort({ createdAt: -1 }); 

  const updateAppointments = [];

  for (let appoinment of appoinments) {

    const doctor = await Account.findOne({
      _id: appoinment.doctorId,
    }).select("fullName");

    if(doctor){
      appoinment = appoinment.toObject();
      appoinment.doctorName = doctor.fullName;
      
      const department = await Department.findOne({
        _id: appoinment.department_id
      })
      appoinment.departmentName = department.title

    }

    updateAppointments.push(appoinment);
  }

  // console.log("Updated Appointments: ", updateAppointments);
  

  res.render(
    "admin/pages/administrative-staff/profile-medical/detailAppointment.pug",
    {
      pageTitle: "Lịch hẹn",
      userInfo,
      updateAppointments
    }
  );
};

// [GET] admin/profile-medical/appointment/:id/edit
module.exports.editAppointment = async (req, res) => {
  try {
    const idAppointment = req.params.id;

    const appointment = await Appointment.findOne({
      _id: idAppointment,
      isExamined: false
    });

    if (!appointment) {
      return res.status(404).render("admin/pages/error", {
        message: "Lịch khám không tồn tại hoặc đã được khám."
      });
    }

    const patient = await User.findOne({
      _id: appointment.patientId,
      deleted: false
    }).select("fullName phone dateOfBirth");

    const departments = await Department.find({
      deleted: false
    });

    const doctor = await Account.findOne({ _id: appointment.doctorId }).select("fullName");

    res.render("admin/pages/administrative-staff/profile-medical/editAppointment.pug", {
      pageTitle: "Cập nhật lịch khám",
      departments,
      appointment,
      patient,
      doctor
    });
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu:", error);
  }
};

// [PATCH] admin/profile-medical/appointment/:id/edit
module.exports.editAppointmentPatch = async (req, res) => {
  const idAppointment = req.params.id;
  try {
    if (req.body.date) {
      req.body.date = new Date(req.body.date);
    }
    // console.log(req.body);
    // res.send("ok")
    await Appointment.findByIdAndUpdate(idAppointment, req.body);

    req.flash("thanhcong", " Cập nhật lịch khám thành công.");
    res.redirect(`${systemConfig.prefixAdmin}/profile-medical`);
  } catch (error) {
    console.log(error);
    req.flash("thatbai", " Có lỗi xảy ra khi cập nhật lịch khám.");
    res.redirect(`${systemConfig.prefixAdmin}/profile-medical`);
  }
};


// [GET] api filterDoctors
module.exports.apifilterDoctors = async (req, res) => {
  const departmentId = req.params.department_id;
  try {
    const department = await Department.findOne({
      _id: departmentId,
    });
    const doctorsIds = department.doctors.map((doctor) => doctor.doctor_id);

    const doctors = await Account.find({
      _id: { $in: doctorsIds },
    });
    res.json(doctors);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Có lỗi xảy ra" });
  }
};

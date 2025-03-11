const Appointment = require("../../models/appoinments.model");
const User = require("../../models/users.model");

module.exports.index = async (req, res) => {

    let appointments = [];
    const appoinmentsFromDB = await Appointment.find({
        status: "finished",
        isExamined:true,
    }).lean();

    appointments = [...appoinmentsFromDB];

    for(let appoinment of appointments){
      const patient = await User.findById(appoinment.patientId).lean();
      appoinment.patientInfo = patient;
    }
    
  res.render("admin/pages/sales/index", {
    pageTitle: "Kê toa thuốc",
    appointments : appointments
  });
};

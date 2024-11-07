const Appointment = require("../../models/appoinments.model");

// [GET] admin/appointments-patient
module.exports.index = async (req, res) => {
    const appointments = await Appointment.find({
        status: "booked"
    })
    res.render("admin/pages/administrative-staff/appointments-patient/index.pug", {
        pageTitle: "Danh sách khám",
        appointments
      });
};


// api lấy các cuộc hẹn theo ngày
module.exports.getAppointmentsByDate = async (req, res) => {
    try {
        const { date } = req.query;
        const appointments = await Appointment.find({ date }); 
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách cuộc hẹn" });
    }
};
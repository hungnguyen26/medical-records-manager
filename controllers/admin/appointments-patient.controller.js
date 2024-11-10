const Appointment = require("../../models/appoinments.model");
const Department = require("../../models/department.model");
const Account = require("../../models/accounts.model");
const User = require("../../models/users.model");

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
        const dateQuery = req.query.date; // Lấy giá trị date từ query, ví dụ '2024-11-09'
        const formattedDate = new Date(dateQuery).toISOString(); // Chuyển thành định dạng ISO 8601, ví dụ '2024-11-09T00:00:00.000Z'

        const dateWithOffset = formattedDate.replace('Z', '+00:00');

        const appointments = await Appointment.find({
            date:dateWithOffset,
            status: "booked"
          }).sort({ createdAt: -1 }); 

        
        const updateAppointments = [];

        for (let appointment of appointments) {
            const doctor = await Account.findOne({
                _id: appointment.doctorId,
            }).select("fullName phone");
            const userInfo = await User.findOne({
                _id: appointment.patientId,
                deleted:false
            }).select("fullName phone");
            if (doctor) {
                appointment = appointment.toObject();
                appointment.doctorName = doctor.fullName;
                appointment.doctorPhone = doctor.phone;

                const department = await Department.findOne({
                    _id: appointment.department_id
                })
                appointment.departmentName = department.title;
            }
            if (userInfo) {
                appointment.patientName = userInfo.fullName;
                appointment.patientPhone = userInfo.phone;
            }
            updateAppointments.push(appointment);
        }
        // console.log(updateAppointments);
        
        res.json(updateAppointments);

        
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách cuộc hẹn" });
    }
};

// [PATCH] admin/appointments-patient/waiting/:appointmentId
module.exports.updateStatusToWaiting = async (req, res) => {
    const appointmentId = req.params.appointmentId;
    res.send(appointmentId)
};


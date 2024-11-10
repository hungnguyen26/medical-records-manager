const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/appointments-patient.controller");

router.get("/", controller.index);

// api lấy các cuộc hẹn theo ngày
router.get("/dates", controller.getAppointmentsByDate);

router.patch("/waiting/:appointmentId", controller.updateStatusToWaiting);


module.exports = router;

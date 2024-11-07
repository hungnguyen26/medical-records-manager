const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/appointments-patient.controller");

router.get("/", controller.index);

// api lấy các cuộc hẹn theo ngày
router.get("/dates", controller.getAppointmentsByDate);


module.exports = router;

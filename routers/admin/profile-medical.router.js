const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/profile_medical.controller");

router.get("/", controller.index);

router.get("/create-patient", controller.createPatient);

router.post("/create-patient", controller.createPatientPost);

module.exports = router;

const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/profile_medical.controller");
const validatePatient = require("../../validates/admin/users.validate");


router.get("/", controller.index);

router.get("/create-patient", controller.createPatient);

router.post(
    "/create-patient",
    validatePatient.createPatientPost, 
    controller.createPatientPost
);

module.exports = router;

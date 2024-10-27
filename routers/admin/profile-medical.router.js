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

router.get("/:id", controller.detailPatient);

router.get("/edit-patient/:id", controller.editPatient);

router.patch("/edit-patient/:id", controller.editPatientPatch);

router.get("/book-appointment/:id", controller.bookAppointment);

router.post("/book-appointment/:id", controller.bookAppointmentPost);

router.get("/appointment/:id", controller.detailAppointment);

router.get("/appointment/:id/edit", controller.editAppointment);


//api
router.get("/api/doctors-by-department/:department_id", controller.apifilterDoctors)



module.exports = router;

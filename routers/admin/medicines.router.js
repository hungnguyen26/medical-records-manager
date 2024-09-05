const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/medicines.controller.js");
const validateMedicines = require("../../validates/admin/medicines.validate.js");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
    "/create", 
    validateMedicines.createPost, 
    controller.createPost
);

router.get("/edit/:id", controller.edit);

router.delete("/delete/:id", controller.delete);

module.exports = router;

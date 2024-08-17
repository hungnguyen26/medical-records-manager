const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/medicines.controller.js")

router.get("/", controller.index);

router.get("/create", controller.create);

module.exports = router;
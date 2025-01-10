const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/calendar.controller");

router.get("/", controller.index);

router.get("/meeting/create", controller.create);

router.post("/meeting/create", controller.createPost);




module.exports = router;

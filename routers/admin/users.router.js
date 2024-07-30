const express = require("express");
const router = express.Router();
const validate = require("../../validates/admin/accounts.validate");

const controller = require("../../controllers/admin/users.controller");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", validate.createPost, controller.createPost);

module.exports = router;

const express = require("express");
const router = express.Router();
const validate = require("../../validates/admin/accounts.validate");

// multer
const multer = require("multer");
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() });

const controller = require("../../controllers/admin/users.controller");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("avatar"),
  validate.createPost,
  controller.createPost
);

module.exports = router;

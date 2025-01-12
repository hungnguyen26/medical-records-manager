const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const controller = require("../../controllers/admin/calendar.controller");

router.get("/", controller.index);

router.get("/meeting/create", controller.create);

router.post(
  "/meeting/create",
  upload.single('files'),
  uploadCloud.upload,
  controller.createPost
);

module.exports = router;

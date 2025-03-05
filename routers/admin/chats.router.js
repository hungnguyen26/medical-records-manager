const express = require('express');
const router = express.Router();

const controller = require("../../controllers/admin/chat.controller");
// const chatMiddleware = require("../../middlewares/client/chat.middlewares");

router.get('/', controller.index);

module.exports = router;
const systemConfig = require("../../config/system");
const homeRouter = require("./home.router");
const usersRouter = require("./users.router");
const auth = require("./auth.router");
const medicinesRouter = require("./medicines.router");

const authMiddlewares = require("../../middlewares/admin/auth.middlewares");
const authControllers = require("../../controllers/admin/auth.controller");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.get(PATH_ADMIN  + "/" , authControllers.login )

  app.use(PATH_ADMIN + "/home",authMiddlewares.requireAuth,  homeRouter);

  app.use(PATH_ADMIN + "/accounts", authMiddlewares.requireAuth, usersRouter);

  app.use(PATH_ADMIN + "/auth", auth);

  app.use(PATH_ADMIN + "/medicines", authMiddlewares.requireAuth, medicinesRouter);
};

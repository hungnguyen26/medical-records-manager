const systemConfig = require("../../config/system");
const homeRouter = require("./home.router");
const accountsRouter = require("./accounts.router");
const auth = require("./auth.router");
const medicinesRouter = require("./medicines.router");
const profile_medicalRouter = require("./profile-medical.router");
const { apifilterDoctors } = require("../../controllers/admin/profile_medical.controller");
const appointments_patient = require("./appointments-patient.router");
const calendarsRouter = require("./calendars.router");
const examinationsRouter = require("./examinations.router");

const authMiddlewares = require("../../middlewares/admin/auth.middlewares");
const authControllers = require("../../controllers/admin/auth.controller");
const { calendarFormat } = require("moment");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.get( "/" , authControllers.login )
  app.get(PATH_ADMIN  + "/" , authControllers.login )

  app.use(PATH_ADMIN + "/home",authMiddlewares.requireAuth,  homeRouter);

  app.use(PATH_ADMIN + "/accounts", authMiddlewares.requireAuth, accountsRouter);

  app.use(PATH_ADMIN + "/auth", auth);

  app.use(PATH_ADMIN + "/medicines", authMiddlewares.requireAuth, medicinesRouter);

  app.use(PATH_ADMIN + "/profile-medical", authMiddlewares.requireAuth, profile_medicalRouter);

  app.use(PATH_ADMIN + "/appointments-patient", authMiddlewares.requireAuth, appointments_patient);

  app.use(PATH_ADMIN + "/calendar", authMiddlewares.requireAuth, calendarsRouter);

  app.use(PATH_ADMIN + "/examination", authMiddlewares.requireAuth, examinationsRouter);

};

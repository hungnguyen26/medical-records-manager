const systemConfig = require("../../config/system");
const homeRoter = require("./home.router");
const usersRoter = require("./users.router");
const auth = require("./auth.router");

module.exports = (app) => {
  
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(PATH_ADMIN + "/", homeRoter);

  app.use(PATH_ADMIN + "/accounts", usersRoter);

  app.use(PATH_ADMIN + "/auth", auth);
};

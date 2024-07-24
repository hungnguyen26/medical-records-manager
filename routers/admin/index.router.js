const systemConfig = require("../../config/system");
const homeRoter = require("./home.router");

module.exports = (app) => {
  
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(PATH_ADMIN + "/home", homeRoter);
};

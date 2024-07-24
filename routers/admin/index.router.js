const homeRoter = require("./home.router");

module.exports = (app) => {
  app.get("/", homeRoter);
};

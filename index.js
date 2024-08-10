const express = require("express");
require("dotenv").config();
const database = require("./config/database");
const adminRouter = require("./routers/admin/index.router");
const systemConfig = require("./config/system");
const bodyParser = require("body-parser");

const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const methodOverride = require("method-override");

const app = express();
const port = 3000;

app.use(methodOverride("_method"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

database.connect();

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// flash - thông báo FE
app.use(cookieParser("djkhajksdhjkas"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// end flash

app.use(express.static("public"));

// biến toàn cục
app.locals.prefixadmin = systemConfig.prefixAdmin;

// router admin
adminRouter(app);

app.get("*", (req, res) => {
  res.render("admin/pages/errors/404.pug",{
    pageTitle: "404 Not Found"
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

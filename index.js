const express = require("express");
require("dotenv").config();
const database = require("./config/database");
const adminRouter = require("./routers/admin/index.router");
const systemConfig = require("./config/system");
const bodyParser = require("body-parser");
const http = require('http');

// Socket io
const { Server } = require("socket.io");

const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const methodOverride = require("method-override");

const moment = require("moment")

const app = express();
const port = process.env.PORT || 4000 ;

app.use(methodOverride("_method"));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

database.connect();

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");


// socketIO
const server = http.createServer(app);
const io = new Server(server);
global._io = io;          // _io là biến toàn cục



// flash - thông báo FE
app.use(cookieParser("djkhajksdhjkas"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// end flash

app.use(express.static("public"));

// biến toàn cục
app.locals.prefixadmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

// router admin
adminRouter(app);

app.get("*", (req, res) => {
  res.render("admin/pages/errors/404.pug",{
    pageTitle: "404 Not Found"
  });
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});

const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");
const adminRouter = require("./routers/admin/index.router");
const systemConfig = require("./config/system");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


dotenv.config();
database.connect();

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static('public')) ;

// biến toàn cục
app.locals.prefixadmin = systemConfig.prefixAdmin;

// router admin
adminRouter(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

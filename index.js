const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");
const adminRouter = require("./routers/admin/index.router");
const systemConfix = require("./config/system");

const app = express();
const port = 3000;

dotenv.config();
database.connect();

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static('public')) ;

// biến toàn cục
app.locals.prefixadmin = systemConfix.prefixAdmin;

// router admin
adminRouter(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");

const app = express();
const port = 3000;

dotenv.config();
database.connect();

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.get("/",(req, res)=>{
  res.send("trang chủ")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

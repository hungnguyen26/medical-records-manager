const mongoose = require("mongoose");
const generate = require("../helpers/generate")

const accountSchema = new mongoose.Schema(
  {
    fullName: String,
    avatar: String, 
    address: String, 
    dateOfBirth: Date,
    sex: String,
    email: String,
    password: String,
    token: {
        type: String,
        default: generate.generateRandomString(40)
    },
    phone: String,
    Role_id: String,
    department_id: String,
    status: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);
const Account = mongoose.model("Account", accountSchema, "accounts");

module.exports = Account;

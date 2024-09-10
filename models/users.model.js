const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    address: String, 
    dateOfBirth: Date,
    sex: String,
    phone: String,
    status: String,
    note: String,
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
const User = mongoose.model("User", userSchema, "users");

module.exports = User;
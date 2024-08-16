const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: String,
    quantity: Number,
    price: Number,
    usage: String,
    note: String,
    description: String,
    //   outOfPill: Boolean,
  },
  {
    timestamps: true,
  }
);
const Medicine = mongoose.model("Medicine", medicineSchema, "medicines");

module.exports = Medicine;

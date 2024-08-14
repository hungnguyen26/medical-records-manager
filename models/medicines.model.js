const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  usage: String,
  note: String,
  description: String,
  //   outOfPill: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Medicine = mongoose.Schema("Medicine", medicineSchema, "medicines");

module.exports = Medicine;

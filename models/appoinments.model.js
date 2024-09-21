const mongoose = require("mongoose");
const { Schema } = mongoose;  

const appointmentSchema = new Schema(
  {
    patientId: String,
    doctorId: String,
    date: Date,
    time: String,
    purpose: String,
    status: String,
    isExamined: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema, "appointments");

module.exports = Appointment;

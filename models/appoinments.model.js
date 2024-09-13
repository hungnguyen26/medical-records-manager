const mongoose = require("mongoose");

const appointmentSchema = Schema(
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

const Appointment = mongoose.model(
  "Appointment",
  appointmentSchema,
  "appointments"
);

module.exports = Appointment;

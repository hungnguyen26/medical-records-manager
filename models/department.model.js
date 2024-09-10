const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    doctors:[
        {
            doctor_id: { type: String, required: true },
            addedAt: { type: Date, default: Date.now },
        }
    ],
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
const Department = mongoose.model("Department", departmentSchema, "departments");

module.exports = Department;

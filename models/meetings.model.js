const mongoose = require("mongoose");
const { Schema } = mongoose;  

const meetingsSchema = new Schema(
  {
    subject: String,  // chủ đề
    description: String, // mô tả
    files: [String],   // files
    participants: [
      {
        doctor_id: String,
      }
    ],
    room: String,
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      default: "pending",
    },
    owner: String,
    
  },
  {
    timestamps: true,
  }
);

const Meeting = mongoose.model("Meeting", meetingsSchema, "meetings");

module.exports = Meeting;

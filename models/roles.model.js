const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    quyen: String,
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
const Role = mongoose.model("Role", RoleSchema, "roles");

module.exports = Role;

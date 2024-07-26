const mongoose = require("mongoose");

const RolesSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
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
const Roles = mongoose.model("Role", RolesSchema, "roles");

module.exports = Roles;

const mongoose = require("mongoose");

const ApplySchema = mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  userName: { type: String, require: true },
  email: { type: String, require: true },
  mobile_number: { type: String, require: true },
  resume: { type: String, require: true },
  applied_date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});
module.exports = mongoose.model("Apply", ApplySchema);

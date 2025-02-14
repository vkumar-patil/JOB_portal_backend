const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  mobile_number: { type: String },
  Employer: { type: Boolean, default: false },
  password: { type: String, require: true },
});
module.exports = mongoose.model("user", userSchema);

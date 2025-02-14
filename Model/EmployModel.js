const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  title: { type: String, require: true },
  company: { type: String, require: true },
  location: { type: String, require: true },
  salary: { type: String, require: true },
  description: { type: String, require: true },
  posted_date: { type: Date, require: true },
});
module.exports = mongoose.model("Post", PostSchema);

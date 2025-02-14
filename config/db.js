const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongooseURLLOCAL);
    console.log("MongoDB URI:", process.env.mongooseURLLOCAL);

    console.log("mongoDB Connected");
  } catch (error) {
    console.log("database not found");
  }
};
module.exports = connectDB;

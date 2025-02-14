const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/userRoute");
const EmployerRoute = require("./routes/EmployerRoute");
const SeekerRoute = require("./routes/SeekerRoute");
const path = require("path");
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/user", userRoute);
app.use("/api/Posts", EmployerRoute);
app.use("/api/Applys", SeekerRoute);
const port = 8003;
connectDB();
app.listen(port, () => {
  console.log("http://localhost:8003");
});

module.exports = app;

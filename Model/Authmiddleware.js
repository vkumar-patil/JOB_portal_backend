const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid token", error: error.message });
  }
};

module.exports = authMiddleware;

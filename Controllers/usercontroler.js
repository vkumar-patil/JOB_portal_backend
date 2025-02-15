const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Model/useModel");

exports.register = async (req, res) => {
  const { username, email, password, mobile_number} = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      mobile_number,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid email or password" });
    }
    if (user.role !== role) {
      return res.status(400).send({ message: "Invalid email or role" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, Employer: user.Employer },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res.status(200).send({ message: "Login successful", token });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

exports.protect =
  (allowedRoles = []) =>
  (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .send({ message: "Authorization failed, token missing" });
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send({ message: "Authorization failed, token missing" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
        return res
          .status(403)
          .send({ message: "Access denied. Insufficient permissions." });
      }

      next();
    } catch (error) {
      res.status(401).send({ message: "Invalid token", error: error.message });
    }
  };

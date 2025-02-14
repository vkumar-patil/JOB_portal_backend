const express = require("express");
const userController = require("../Controllers/usercontroler");

const router = express.Router();

router.post("/Register", userController.register);
router.post("/Login", userController.login);

// router.get("/profile", userController.protect, (req, res) => {
//   res.send({ message: "Access granted to protected route", user: req.user });
// });

module.exports = router;

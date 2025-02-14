const express = require("express");
const router = express.Router();
const Employercontroler = require("../Controllers/Employercontroler");

router.post("/Post", Employercontroler.Jobpost);
router.get("/getAll", Employercontroler.getallPost);

router.get("/:id", Employercontroler.id);

module.exports = router;
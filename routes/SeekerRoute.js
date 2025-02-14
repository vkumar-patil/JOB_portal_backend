const express = require("express");
const router = express.Router();
const Applycontroller = require("../Controllers/Applycontroller");
const upload = require("../Middleware/MiddlewareUplode");
//const { protect } = require("../Controllers/usercontroler");
router.post(
  "/Apply",
  upload.single("resume"),

  Applycontroller.createApplyfom
);
router.patch("/:applicationId",Applycontroller.status)

router.get("/job/:jobId", Applycontroller.getapplyfom);
router.get("/applyed", Applycontroller.getUserApplication);
//router.get("/applyed", Applycontroller.getUserApplications);

//router.get("/myApplications", protect, Applycontroller.getUserApplications);

module.exports = router;

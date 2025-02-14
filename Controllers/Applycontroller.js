const Apply = require("../Model/SeekerModel");
const mongoose = require("mongoose");
exports.createApplyfom = async (req, res) => {
  try {
    console.log(req.body);

    const { userName, email, mobile_number, title, resume, jobid } = req.body;
    if (!userName || !email || !mobile_number || !jobid) {
      return res.status(400).send({ message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).send({ message: "Resume file is required" });
    }
    const resumePath = req.file ? req.file.path : null;
    const Applyfom = new Apply({
      userName,
      email,
      mobile_number,
      title,

      resume: resumePath,
      job: jobid,
    });
    await Applyfom.save();
    res.status(200).send({ message: "Apply done", success: true });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

// exports.getUserApplications = async (req, res) => {
//   try {
//     const userId = req.query.userId || req.user?.id; // Temporary query param-based testing
//     if (!userId) {
//       return res.status(400).json({ message: "User ID is required" });
//     }

//     const applications = await Apply.find({
//       user: mongoose.Types.ObjectId(userId),
//     }).populate("job", "title company");

//     res.status(200).json({
//       message: "User applications retrieved successfully",
//       data: applications,
//     });
//   } catch (error) {
//     console.error("Error fetching user applications:", error.message);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

exports.getapplyfom = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID format" });
    }

    const applicants = await Apply.find({ job: jobId });

    applicants.forEach((applicant) => {
      if (applicant.resume) {
        applicant.resume = applicant.resume.replace(/\\/g, "/");
      }
    });

    res.status(200).json({
      message: "Applicants fetched successfully",
      data: applicants,
    });
  } catch (error) {
    console.error("Error fetching applicants:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching applicants", error: error.message });
  }
};

exports.getUserApplication = async (req, res) => {
  try {
    const applications = await Apply.find();

    res.status(200).send({
      message: "User applications retrieved successfully",
      data: applications,
    });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

exports.status = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Apply.findById(applicationId);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      message: `Application status updated to ${status}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

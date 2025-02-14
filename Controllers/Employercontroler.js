const Post = require("../Model/EmployModel");
exports.Jobpost = async (req, res) => {
  console.log(req.body);
  const { title, company, location, salary, description, posted_date } =
    req.body;
  try {
    const NewPost = new Post({
      title,
      company,
      location,
      salary,
      description,
      posted_date,
    });
    await NewPost.save();
    res.status(200).send({ message: "post update done", success: true });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};
exports.getallPost = async (req, res) => {
  try {
    const allPosts = await Post.find();
    console.log(allPosts);
    res
      .status(200)
      .send({ data: allPosts, message: "Job posts fetched successfully." });
  } catch (error) {
    console.error("Error fetching job posts:", error.message);
    res
      .status(500)
      .send({ message: "Internal server error. Please try again later." });
  }
};

exports.id = async (req, res) => {
  try {
    const job = await Post.findById(req.params.id);
    if (!job) {
      return res.status(404).send({ message: "Job not found" });
    }
    res.status(200).send({ data: job });
  } catch (error) {
    console.error("Error fetching job post by ID:", error.message);
    res.status(500).send({ message: "Internal server error" });
  }
};

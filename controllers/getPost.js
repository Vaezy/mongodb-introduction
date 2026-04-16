const BlogPost = require("../models/blogPost");

module.exports = (req, res) => {
  const postId = req.params.id;
  BlogPost.findById(postId)
    .then((blogPost) => {
      res.render("post", {
        blogPost,
        title: blogPost ? blogPost.title : "Détails",
      });
    })
    .catch((err) => {
      console.error("Error fetching blog post:", err);
      res.render("post", { blogPost: null, title: "Post introuvable" });
    });
};

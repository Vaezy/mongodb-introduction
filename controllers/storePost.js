const path = require("path");
const BlogPost = require("../models/blogPost.js");

module.exports = (req, res) => {
  const { title, body, username } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required" });
  }

  const image = req.files && req.files.image ? req.files.image.name : null;

  image &&
    req.files.image.mv(
      path.join(__dirname, "..", "public/images", image),
      (err) => {
        if (err) {
          console.error("Error uploading image:", err);
        } else {
          console.log("Image uploaded successfully");
          BlogPost.create({ title, body, image, username })
            .then((blogPost) => {
              console.log("Blog post created:", blogPost);
              res.redirect("/");
            })
            .catch((err) => {
              console.error("Error creating blog post:", err);
              res.render("create", { title: "Nouveau Post - Création" });
            });
        }
      },
    );
};

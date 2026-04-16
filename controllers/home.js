const BlogPost = require("../models/blogPost");

module.exports = (req, res) => {
  BlogPost.find({})
    .then((blogPosts) => {
      res.render("index", { blogPosts });
    })
    .catch((err) => {
      res.render("index", { blogPosts: [] });
    });
};

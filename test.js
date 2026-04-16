const express = require("express");
const mongoose = require("mongoose");
const BlogPost = require("./src/models/blogPost.js");

const app = express();
const PORT = 3000;

async function main() {
  await mongoose
    .connect("mongodb://127.0.0.1/my_blog_minotaure")
    .then(() => console.log("Connected"))
    .catch((err) => console.log("Connected failed", err));
}

main();

let id = "690a25e491503d262eeaeaab";

BlogPost.create({
  title: "My first blog post",
  body: "This is the content of my first blog post.",
})
  .then((blogPost) => {
    console.log("Blog post created:", blogPost);

    return BlogPost.findById(id);
  })
  .then((foundPost) => {
    console.log("Blog post found:", foundPost);

    return BlogPost.find();
  })
  .then((blogPosts) => {
    console.log("All blog posts:", blogPosts);
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error:", err);
    mongoose.connection.close();
  });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

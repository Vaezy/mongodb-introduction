const mongoose = require("mongoose");
const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

const app = express();

mongoose.connect("mongodb://localhost/my_blog");

app.use(
  expressSession({
    secret: "X9rfqEGCA4adTfqCUpbxFZiR3ho8KebZ",
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(flash());

global.loggedIn = null;
app.use((req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

const homeController = require("./controllers/home");
const newPostController = require("./controllers/newPost");
const getPostController = require("./controllers/getPost");
const storePostController = require("./controllers/storePost");
const listPostController = require("./controllers/listPost");
const newUserController = require("./controllers/newUser");
const storeUserController = require("./controllers/storeUser");
const loginUserController = require("./controllers/loginUser");
const logoutController = require("./controllers/logout");

const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");
const validateMiddleWare = require("./middleware/validateMiddleWare");

app.get("/", homeController);
app.get("/home", homeController);
app.get("/list", listPostController);
app.get("/post/:id", getPostController);

app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);
app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController,
);
app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginUserController);
app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController,
);

app.get("/post/new", authMiddleware, newPostController);
app.post(
  "/posts/store",
  authMiddleware,
  validateMiddleWare,
  storePostController,
);
app.get("/auth/logout", logoutController);

app.use((req, res) => res.render("notfound"));

app.listen(4000, () => {
  console.log("App listening on port 4000");
});

const validateMiddleWare = (req, res, next) => {
  if (req.files == null || req.body.title == null || req.body.body == null) {
    return res.redirect("/post/new");
  }
  next();
};

module.exports = validateMiddleWare;

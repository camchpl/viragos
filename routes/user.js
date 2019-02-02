const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

// const ensureLogin = require("connect-ensure-login");

// authRoutes.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
//   res.render("private", { user: req.user });
// });

// function ensureLogin(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.redirect("/login");

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.redirect("/login");

router.get("/profile/show", (req, res, next) => {
  res.render("user/show", { user: req.user }); // shows current user information, can then be edited
  console.log(req.user);
});

router.get("/profile/edit", (req, res, next) => {
  console.log(req.user);
  console.log("this is a GET call");
  res.render("user/edit", { user: req.user }); // show the edit page, data can be edited here
});

router.post("/profile/edit", (req, res, next) => {
  const { firstName, lastName, role, currentPosition, summary } = req.body;
  console.log(req.body);
  console.log("did this route get called");
  console.log("THIS IS THE REQ USER", req.user);
  User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        firstName,
        lastName,
        role,
        currentPosition,
        summary
      }
    }
  )
    .then(user => {
      console.log("user", user);
      res.redirect("/user/show");
    })
    .catch(err => console.log(err));
});

module.exports = router;

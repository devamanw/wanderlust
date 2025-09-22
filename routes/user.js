const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const controllerUser = require("../controller/users.js");


router.route("/signup")
.get(controllerUser.renderSignUp)
.post(wrapAsync(controllerUser.signUp));

router.route("/login")
.get(controllerUser.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate('local', { failureRedirect: '/login' }),controllerUser.login);


router.get("/logout",controllerUser.destroy);


module.exports = router;

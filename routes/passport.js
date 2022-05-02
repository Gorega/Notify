const express = require("express");
const router = express.Router();
const passport = require("passport");
const { signUser } = require("../controllers/passport");

router.route("/google").get(passport.authenticate("google",{scope:["profile","email"]}));
router.route("/facebook").get(passport.authenticate("facebook",{scope:["user_friends","email"]}));
router.route("/github").get(passport.authenticate("github",{scope:['user:email']}));
router.route("/google/callback").get(passport.authenticate("google",{failureRedirect:"/"}),signUser)
router.route("/facebook/callback").get(passport.authenticate("facebook",{failureRedirect:"/"}),signUser)
router.route("/github/callback").get(passport.authenticate("github",{failureRedirect:"/"}),signUser)

module.exports = router;
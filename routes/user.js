const express = require("express");
const router = express.Router();
const {register,login,user,logOut,updateUserInfo,updateUserPassword} = require("../controllers/user");
const {auth} = require("../controllers/auth");

router.route("/api/v1/register").post(register)
router.route("/api/v1/login").post(login);
router.route("/api/v1/logout").get(auth,logOut);
router.route("/api/v1/user").get(auth,user).patch(auth,updateUserInfo);
router.route("/api/v1/user/update/pass").patch(auth,updateUserPassword);

module.exports = router;
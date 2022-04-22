const express = require("express");
const router = express.Router();
const {forgetPass,token,resetPass} = require("../controllers/resetPass");

router.route("/api/v1/user/forget").post(forgetPass);
router.route("/api/v1/user/reset/pass/:token").patch(resetPass);

module.exports = router;
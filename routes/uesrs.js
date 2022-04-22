const express = require("express");
const router = express.Router();
const {getAllUsers,getUser} = require("../controllers/users");

router.route("/api/v1/users").get(getAllUsers);
router.route("/api/v1/users/:userId").get(getUser);

module.exports = router;
const express = require("express");
const router = express.Router();
const { auth } = require("../controllers/auth");
const {getComments,createComment} = require("../controllers/comment");

router.route("/api/v1/comments/:postId").get(getComments);
router.route("/api/v1/comments").post(auth,createComment);

module.exports = router;
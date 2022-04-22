const express= require("express");
const router = express.Router();
const {getPosts,createPost,getPost,editPost,deletePost,getSavedPost,savePost,deleteSavedPost} = require("../controllers/post");
const {auth} = require("../controllers/auth");

router.route("/api/v1/posts").get(getPosts).post(auth,createPost);
router.route("/api/v1/post/:id").get(getPost).patch(auth,editPost).delete(auth,deletePost);
router.route("/api/v1/user-list").get(auth,getSavedPost).post(auth,savePost)
router.route("/api/v1/user-list/:postId").delete(auth,deleteSavedPost);

module.exports = router;
const express = require("express")
const { getAllBlog, createBlog, blogDetailPage, UpdateBlog, LikeBlog, DeleteBlog, dislikedBlog } = require("../controller/blogController")
const { authmiddleware, isAdmin } = require("../middleware/authMiddlerware")
const router = express.Router()



router.get("/allBlog",getAllBlog)
router.post("/createBlog",authmiddleware,isAdmin,createBlog)
router.get("/blogDetailpage/:id",authmiddleware,blogDetailPage)
router.put("/updateBlog/:id",authmiddleware,isAdmin,UpdateBlog)
router.put("/blogLike",authmiddleware,LikeBlog)
router.put("/blogDislike",authmiddleware,dislikedBlog)
router.delete("/deleteBlog/:id",authmiddleware,isAdmin,DeleteBlog)

module.exports= router
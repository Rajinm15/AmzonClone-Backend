const express = require("express")
const { createBlogCategory, getAllBlogCategory, updateBlogCategory, deleteBlogCategory, getCategoryById } = require("../controller/blogCategoryController")
const { isAdmin, authmiddleware } = require("../middleware/authMiddlerware")
const router = express.Router()



router.post("/createBlogCategory",authmiddleware,isAdmin,createBlogCategory)
router.get("/getAllBlogCategory",authmiddleware,isAdmin,getAllBlogCategory)
router.put("/updateCategory/:id",authmiddleware,isAdmin,updateBlogCategory)
router.delete("/deleteCategory/:id",authmiddleware,isAdmin,deleteBlogCategory)
router.get("/getCategoryByID/:id",authmiddleware,isAdmin,getCategoryById)

module.exports = router
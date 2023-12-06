const express = require("express")
const { createCategory, getAllCategory, updateCategory, deleteCategory, categoryByID } = require("../controller/ProductcategoryController")
const { isAdmin, authmiddleware } = require("../middleware/authMiddlerware")
const router = express.Router()

router.post("/addCategory",authmiddleware,isAdmin,createCategory)
router.get("/getAllCategory",getAllCategory)
router.put("/updateCategory/:id",authmiddleware,isAdmin ,updateCategory)
router.delete("/deleteCategory/:id",authmiddleware,isAdmin,deleteCategory)
router.get("/categoryById/:id",authmiddleware,isAdmin,categoryByID)


module.exports = router
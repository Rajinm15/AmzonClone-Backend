const express = require("express")
const { authmiddleware, isAdmin } = require("../middleware/authMiddlerware")
const { createBrand, getAllBrand, updateBrand, deleteBrand, getBrandById } = require("../controller/brandController")
const router = express.Router()

router.post("/addBrand",authmiddleware,isAdmin,createBrand)
router.get("/getAllBrand",authmiddleware,isAdmin,getAllBrand)
router.put("/updateBrand/:id",authmiddleware,isAdmin,updateBrand)
router.delete("/deleteBrand/:id",authmiddleware,isAdmin,deleteBrand)
router.get("/getBrandById/:id",authmiddleware,isAdmin,getBrandById)


module.exports = router
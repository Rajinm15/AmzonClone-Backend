const express = require("express")
const { createCoupon, getAllCoupon, deleteCoupon, UpdateCoupon } = require("../controller/couponController")
const { authmiddleware, isAdmin } = require("../middleware/authMiddlerware")
const router = express.Router()


router.post("/addCoupon",authmiddleware,isAdmin,createCoupon)
router.get("/getallCoupon",authmiddleware,isAdmin,getAllCoupon)
router.delete("/deleteCoupon/:id",authmiddleware,isAdmin,deleteCoupon)
router.put("/updateCoupon/:id",authmiddleware,isAdmin,UpdateCoupon)


module.exports = router
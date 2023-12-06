const express = require("express")
const { createUser, LoginUser, getAllUser, getSingleUser, deleteUser, UpdateUser,
    blockUser, unBlockUser, handleRefreshToken, handleLogout, updatePassword,
    forgotPassword, resetPassword, userCart, getUserCart, emptyCart, applyCoupon, createOrder, getAllOrder, getOrderByUserId, updateOrderStatus } = require("../controller/userController")
const { authmiddleware, isAdmin } = require("../middleware/authMiddlerware")
const router = express.Router()

router.post("/register", createUser)
router.post("/login", LoginUser)
router.get("/getAllUser", getAllUser)
router.get("/singleUser/:id", authmiddleware, isAdmin, getSingleUser)
router.delete("/deleteUser/:id", deleteUser)
router.put("/updateUser/:id", authmiddleware, UpdateUser)
router.put("/block-user/:id", authmiddleware, isAdmin, blockUser)
router.put("/unblock-user/:id", authmiddleware, isAdmin, unBlockUser)
router.get("/refreshToken", handleRefreshToken)
router.post("/logout", handleLogout)
router.put("/updatePassword/:id", authmiddleware, updatePassword)
router.post("/forgot-password-token", forgotPassword)
router.put("/reset-password/:token", resetPassword)
router.post("/cart",authmiddleware,userCart)
router.get("/getUserCart",authmiddleware,getUserCart)
router.delete("/emptyCart",authmiddleware,emptyCart)
router.post("/cart/applyCoupon",authmiddleware,applyCoupon)
router.post("/cart/cash-onDelivry",authmiddleware,createOrder)
router.get("/cart/getAllOrder",authmiddleware,getAllOrder)
router.get("/cart/getUserOrder",authmiddleware,getOrderByUserId)
router.put("/cart/updateOrderStatus/:id",authmiddleware,isAdmin,updateOrderStatus)



module.exports = router

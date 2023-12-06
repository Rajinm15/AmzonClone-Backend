const express = require("express")
const { authmiddleware, isAdmin } = require("../middleware/authMiddlerware")
const { getAllColor, addColor, deleteColor, updateColor, getColorById } = require("../controller/colorController")
const router = express.Router()


router.get("/getAllColor",authmiddleware,isAdmin,getAllColor)
router.post("/AddColor",authmiddleware,isAdmin,addColor)
router.delete("/deleteColor/:id",authmiddleware,isAdmin,deleteColor)
router.put("/updateColor/:id",authmiddleware,isAdmin,updateColor)
router.get("/getColorbyId/:id",authmiddleware,isAdmin,getColorById)


module.exports = router
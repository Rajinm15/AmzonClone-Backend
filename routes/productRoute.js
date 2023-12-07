const express = require("express")
const { createProduct, getAllProduct, productDetailPage ,deteleProduct, updateProduct, ratting, uploadImages, deleteImages} = require("../controller/productControllerl")
const { isAdmin, authmiddleware } = require("../middleware/authMiddlerware")
const { uploadPhoto, productImgResize } = require("../middleware/uploadImages")

const router = express.Router()

router.post("/createProduct",authmiddleware,isAdmin,createProduct)
router.get("/getAllProduct",getAllProduct)
router.get("/productDetailpage/:id",productDetailPage)
router.put("/ratting",authmiddleware,ratting)
router.delete("/deleteProduct/:id",authmiddleware,isAdmin,deteleProduct)
router.put("/updateProduct/:id",authmiddleware,isAdmin,updateProduct)
router.put("/upload/:id",authmiddleware,isAdmin,uploadPhoto.array('images',10),productImgResize,uploadImages)
router.delete("/delete/:id",authmiddleware,isAdmin,deleteImages)

module.exports= router
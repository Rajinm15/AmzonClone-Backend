const express = require("express")
const { authmiddleware, isAdmin } = require("../middleware/authMiddlerware")
const { createInqiry, getAllInquriy, getInqById } = require("../controller/enqController")
const router = express.Router()


router.post("/createEnq",authmiddleware,createInqiry)
router.get("/getAllInqiry",authmiddleware,isAdmin,getAllInquriy)
router.get("/inqByID/:id",authmiddleware,isAdmin,getInqById)


module.exports = router

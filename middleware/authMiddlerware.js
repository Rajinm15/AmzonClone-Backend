const User = require("../model/userModel")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const authmiddleware = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers?.authorization?.startsWith("Bearer")){
        token = req.headers?.authorization?.split(" ")[1]
        try {
                if(token){
                    const decode = jwt.verify(token,process.env.JWT_SECRET)
                    console.log(decode,"decode")
                    const user = await User.findById(decode.id)
                    console.log(user)
                    req.user = user,
                    next()
                } 
        } catch (error) {
            throw  new Error("Not Autheraized token expired, Please login agian")
        }
    }
    else{
        throw new Error("There is no token atteched to header")
    }
})


const isAdmin = asyncHandler(async(req,res,next)=>{
    const {email} = req.user
    const adminUser = await User.findOne({email})
    if(adminUser.role !== "admin" ){
        throw new Error("You are not an Admin")
    }
    else{
        next()
    }
    console.log(adminUser)


})
module.exports = {authmiddleware,isAdmin}
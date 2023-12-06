const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const crypto = require("crypto")


const userSchema = new mongoose.Schema({
    firstName :{
        type:String,
        required:true,
    },
    lastName :{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
    cart:{
        type:Array,
        default:[]
    },
    isBlocked:{
        type :Boolean,
        default:false
    },
    address:[{
        type:mongoose.Schema.ObjectId, ref:"Adress" 
    }],
    wishlist:[{
        type:mongoose.Schema.ObjectId ,ref:"Product"
    }],
    refreshToken:{
        type:String
    },
    passwordChangeAt:Date,
    passwordResetToken: String,
    passwordResetExpries: Date

},{
    timestamps:true
})

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next()
    }
    const salt = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.isPasswordMatched = async function(enterdPassword){
    return await bcrypt.compare(enterdPassword,this.password)
}

userSchema.methods.createPasswordResetToken = async function(){
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest("hex")
    this.passwordResetToken= Date.now()+30*60*1000 // 10 mint
   return resetToken 
}

module.exports = mongoose.model("User",userSchema)
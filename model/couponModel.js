const mongooes = require("mongoose")

const couponSchema =  new mongooes.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        uppercase:true
    },
    expiry:{
        type:Date,
        required:true
    },
    discount:{
        type:Number,
        required:true
    }
})


module.exports = mongooes.model("Coupon",couponSchema)
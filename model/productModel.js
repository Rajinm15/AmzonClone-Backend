const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowecase:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String ,
        required:true
    },
    category: {
        type: String,
        required: true,
      },  
    brand:{
        type:String,
        required:true
    },
    quntity: {
        type:String,
        required:true
    },
    sold:{
        type:Number,
        default:0,
        select:false
        
    },

    images:[],
    color:[],
    tags:[],
ratting:[{
    star:Number,
    postby:{type:mongoose.Schema.ObjectId,ref:"User"},
    comment:String,
}],

totalRatings:{
    type:String,
    default:0
}

},{timestamps:true})

module.exports = mongoose.model("Product",productSchema)
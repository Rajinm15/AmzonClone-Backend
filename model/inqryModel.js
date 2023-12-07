const mongooes = require("mongoose")

const inquriySchema = new mongooes.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true
    }

})

module.exports = mongooes.model("Inquery",inquriySchema)
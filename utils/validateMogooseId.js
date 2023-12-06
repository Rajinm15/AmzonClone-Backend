const mongoose = require("mongoose")
const validateMongoID = (id)=>{
    const IsValid = mongoose.Schema.Types.ObjectId.isValid(id)
    console.log(IsValid,"valid")
        if(!IsValid) throw new Error("this id id not a valid or not found")   
}


module.exports = {validateMongoID}
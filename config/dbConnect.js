const mongoose = require("mongoose")

const dbConnect =()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"AmzonClone",
    }).then(()=>console.log("database connected successfully")).catch((err)=>
    console.log(err))
}  
  
module.exports =dbConnect;
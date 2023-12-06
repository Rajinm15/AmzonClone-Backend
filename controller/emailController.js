const nodemailer = require("nodemailer")
const asyncHandler = require("express-async-handler")

const sendEmail = asyncHandler(async(data,req,res)=>{
    let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:process.env.EMAIL_ID,
            pass:process.env.PASSWORD
        }
    })

    let info = await transporter.sendMail({
        from: process.env.EMAIL_ID,
        to:data?.to,
        subject:data?.subject,
        text:data?.text,
        html:data?.html
    })

    console.log("MESEAGE SENT:",info.messageId)
    console.log("preview url",nodemailer.getTestMessageUrl(info))
})


module.exports={sendEmail}
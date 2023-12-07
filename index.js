const express = require("express")
const dotenv =  require("dotenv").config()
const authRouter = require("./routes/authRoute")
const PORT = process.env.PORT || 7000
const dbConnect = require("./config/dbConnect")
const bodyParser = require('body-parser')
const { notFound, errorHandler } = require("./middleware/errorHandler")
const cookieParser = require("cookie-parser")
const productRouter = require("./routes/productRoute")
const blogRouter = require("./routes/blogRoute")
const categoryRoute = require("./routes/categoryRoute")
const blogCategory = require("./routes/blogCategoryRoute")
const brandRoute = require("./routes/brandRoute")
const couponRoute = require("./routes/couponRoute")
const colorRoute = require("./routes/colorRoute")
const enqRoute  = require("./routes/enqRoute")
const morgan = require("morgan")

const app = express()

// app.get("/",(req,res)=>{
//     res.send("hello world")
// })

//databse connection
dbConnect()


app.use(morgan("dev"))
//json converter
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

//cookie parser
app.use(cookieParser())

//api routes
app.use('/api/user',authRouter)
app.use("/api/product",productRouter)
app.use("/api/blog",blogRouter)
app.use("/api/category",categoryRoute)
app.use("/api/blogCategory",blogCategory)
app.use("/api/brand",brandRoute)
app.use("/api/coupon",couponRoute)
app.use("/api/color",colorRoute)
app.use("/api/enq",enqRoute)


//middleware
    
app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server is runnig on this ${PORT}`)
})


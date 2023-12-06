const multer = require("multer")
const sharp = require("sharp")
const path = require("path")
const fs = require("fs")

const multerStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../public/images"))
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now()+ '-'+ Math.random(Math.random() *1e9)
        cb(null,file.filename+"-"+uniqueSuffix + ".jpeg")

    },
});

const multerFilter = (req,file,cb)=>
{
    if(file.mimetype === 'image/jpeg' ||file.mimetype === 'image/png'){
      cb(null,true);
    }else{
        cb(new Error('Unsupported file'), false);
    }
 }


const uploadPhoto = multer({
    storage:multerStorage,
    fileFilter:multerFilter,
    limits:{fileSize:20000000}

})

const productImgResize = async(req,res,next)=>{
    if(!req.files) return next()
    await Promise.all(req.files.map(async (file)=>{
await sharp(file.path).
resize(300,300).
toFormat('jpeg').
jpeg({quality:90}).
toFile(`public/images/product/${file.filename}`)
// fs.unlinkSync(`public/images/product/${file.filename}`)
}),
),
// console.log(file.filename,"file,,,,,,,,,")
next()
}


const blogImgResize = async(req,res,next)=>{
    if(!req.files) return next()
    await Promise.all(req.files.map(async(file)=>{
        await sharp(file.path).resize(300,300).toFormat("jpeg").jpeg({quality:90}).toFile(`public/images/blog${file.filename}`)
    }))
    next()
}
module.exports = {uploadPhoto,blogImgResize,productImgResize}
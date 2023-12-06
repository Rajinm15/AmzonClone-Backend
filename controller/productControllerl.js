const Product = require("../model/productModel")
const asyncHandler = require("express-async-handler")
const { default: slugify } = require("slugify")
const cloudinaryUploadImg = require("../utils/cloudinary")
const fs  =require("fs")


//create Product
const createProduct = asyncHandler(async(req,res)=>{
    try {

        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await Product.create(req.body)
        res.json({
            code:201,
            message:"product created succesfully",
            success:true,
            result:newProduct
        })
        
    } catch (error) {
            throw new Error(error)
    }

})

//update Product
const updateProduct = asyncHandler(async(req,res)=>{

    const {params:{id}} = req
        try {
            if(req.body.title){
                req.body.slug = slugify(req.body.title)
            }
            const doUpdateData = await Product.findByIdAndUpdate(id,req.body,{new:true})
            res.json({
                code:200,
                message:"product Update Successfully",
                success:true,
                result:doUpdateData
            })
            
        } catch (error) {
            throw new Error(error)
        }
})


//get all product

const getAllProduct = asyncHandler(async(req,res)=>{
        try {
            const queryObj = {...req.query}
            const exludeFileds = ["page","sort","limit","fields"]
            exludeFileds.forEach((el)=> delete queryObj[el])
                //filter
            let queryStr = JSON.stringify(queryObj)
            queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match)=>`$${match}`)
            let query =  Product.find(JSON.parse(queryStr))
            //sorting
            if(req.query.sort){
                const sortBy = req.query.sort.split(',').join(" ")
                query = query.sort(sortBy)
            }else{
                query = query.sort('-createdAt')
            }
            //limiting the fields
            if(req.query.fields){
                const fields = req.query.fields.split(',').join(' ')
                query = query.select(fields)
                console.log(query,"............")
            }else{
                query = query.select('-__v')
            }
            //pagination

            const page = req.query.page;
            const limit = req.query.limit;
            const skip = (page -1) * limit
            query = query.skip(skip).limit(limit)

            if(req.query.page){
                const productCount = await Product.countDocuments()
                if(skip >= productCount) throw new Error ("this page does not exisit")
            }

            const getProduct = await query
            console.log(getProduct,"query")
            res.send({
                code:200,
                message:"all product get Successfully",
                success:true,
                result:getProduct
            })
            
        } catch (error) {
                throw new Error(error)
        }
})

//get product detailpage

const productDetailPage = asyncHandler(async(req,res)=>{
    
    try {
        const {params:{id}} = req
        const doGetProdctPage = await Product.findById(id)
        res.send({
            code:200,
            message:"product detailpage",
            success:true,
            result:doGetProdctPage
        })     
    } catch (error) {
        throw new Error(error)
    }
})

//delete product

const deteleProduct = asyncHandler(async(req,res)=>{
    const {params:{id}} =req

    const doDeleteProduct = await Product.findByIdAndDelete(id)
    res.json({
        code:200,
        message:"product deleted successfully",
        success:true,
        result:doDeleteProduct
    })
})


const ratting = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, prodId, comment } = req.body;
    try {
      const product = await Product.findById(prodId);
      let alreadyRated = product.ratting.find(
        (userId) => userId.postby.toString() === _id.toString()
      );
      if (alreadyRated) {
        const updateRating = await Product.updateOne(
          {
            ratings: { $elemMatch: alreadyRated },
          },
          {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment },
          },
          {
            new: true,
          }
        );
        console.log(updateRating,"update")
      } 
      else {
        const rateProduct = await Product.findByIdAndUpdate(
          prodId,
          {
            $push: {
              ratings: {
                star: star,
                comment: comment,
                postby: _id,
              },
            },
          },
          {
            new: true,
          }
        );
        console.log(rateProduct,"rateProduct")
      }
      const getallratings = await Product.findById(prodId);
      let totalRating = getallratings.ratting.length;
      let ratingsum = getallratings.ratting
        .map((item) => item.star)
        .reduce((prev, curr) => prev + curr, 0);
      let actualRating = Math.round(ratingsum / totalRating);
      let finalproduct = await Product.findByIdAndUpdate(
        prodId,
        {
          totalrating: actualRating,
        },
        { new: true }
      );

      res.json(finalproduct);
    } catch (error) {
      throw new Error(error);
    }
  });


  const uploadImages = async(req,res)=>{
    // const {params:{id}} = req
    // try {
    //     const uploder = (path)=> cloudinaryUploadImg(path,"images")
    //     const urls = []
    //     const files = req.files
    //     for (const files of files){
    //       const {path} = files
    //       const newPath = await uploder(path)
    //       urls.push(newPath)
    //     }
    //     const findProduct = await Product.findByIdAndUpdate(id,{images:urls.map((file)=>{
    //       return file
    //     })},
    //     {new:true})
    //     console.log(findProduct,".......")
    //     // res.json(findProduct)
    // } catch (error) {
    //   throw new Error(error)
    // }

    const { params: { id } } = req;
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const url = [];
        const uploadedFiles = req.files; // Use a different variable name

        for (const file of uploadedFiles) { // Use a different variable name
            const { path}  = file; // Use a different variable name
            console.log(path,"newPAth.......")
            const newPath = await uploader(path);
            console.log(newPath,"nm,,,,,,,,,,,,,,,,,,,,,,")
            url.push(newPath);
            fs.unlinkSync(path)
            
        }
        const images = url.map((file)=>{
          return file
        }) 
      
        console.log(uploader,"uploader")
        const findProduct = await Product.findByIdAndUpdate(id, {
            images: url.map((file) => file),
        }, {
            new: true
        });

        console.log(url, "......");
        res.json(images)
    } catch (error) {
        throw new Error(error);
    }
  }





module.exports ={
    createProduct,
    getAllProduct,
    productDetailPage,
    deteleProduct,
    updateProduct,
    ratting,
    uploadImages
}
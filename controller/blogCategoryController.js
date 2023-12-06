const blogCategory = require("../model/blogCategoryModel")

const createBlogCategory = async(req,res)=>{
    try {
        
        const createCategory = await blogCategory.create(req.body)
        res.json({
            code:201,
            message:"blog category created successfully",
            success:true,
            result:createCategory
        })

    } catch (error) {
        throw new Error(error)
    }

}


const getAllBlogCategory = async(req,res)=>{
    try {
        const getAllData = await blogCategory.find()
        res.json({
            code:200,
            message:"get all category successfully",
            success:true,
            result:getAllData
        })
        
    } catch (error) {
        throw new Error(error)
    }

}

const updateBlogCategory = async(req,res)=>{
    const {params:{id}} = req
    console.log(id,"id..................")
    console.log("hittttttt")
    try {
        const updateCategory = await blogCategory.findByIdAndUpdate(id,req.body,{new:true})
        res.json({
            code:200,
            message:"category update successfully",
            success:true,
            result:updateCategory
        })
    } catch (error) {
        throw new Error(error)
    }
}

const deleteBlogCategory = async(req,res)=>{
    const {params:{id}} = req
    try {
        const deleteCate = await blogCategory.findByIdAndDelete(id)
        res.json({
            code:200,
            message:"category delete successfully",
            success:true,
            result:deleteCate
        })
        
    } catch (error) {
        throw new Error(error)
    }

}

const getCategoryById = async(req,res)=>{
    const {params:{id}} = req
    try {
            const getByID = await blogCategory.findById(id)
            res.json({
                code:200,
                message:"data get successfully",
                success:true,
                result:getByID
            })
        
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    createBlogCategory,
    getAllBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
    getCategoryById
}
const Category = require("../model/categoryModel")

const createCategory = async(req,res)=>{
    try {
        console.log('hittttttttttt')
        const newCategory = await Category.create(req.body)
        res.json({
            code:201,
            message:"category added succesfully",
            success:true,
            result:newCategory
        })
        
    } catch (error) {
        throw new Error(error)
    }
}

const getAllCategory = async(req,res)=>{

    try {
        const getAll = await Category.find()
        res.json({
            code:200,
            message:"getAll category successfully",
            success:true,
            result:getAll
        })
        
    } catch (error) {
        throw new Error(error)
    }

}

const updateCategory = async(req,res)=>{
    console.log("hitttttttttttt")
    const {params:{id}} = req
    console.log(id,"idd")
    try {
        const updateData = await Category.findByIdAndUpdate(id,req.body,{new:true})
        console.log(updateData,"data")
        res.json({
            code:200,
            message:"category Update Successfully",
            success:true,
            result:updateData
        })

        
    } catch (error) {
            throw new Error(error)
    }
}

const deleteCategory = async(req,res)=>{
    const {params:{id}} =req
    console.log("id",id)
    try {
        
        const deleteData = await Category.findByIdAndDelete(id)
        res.json({
            code:200,
            message:"category delete successfully",
            success:true,
            result:deleteData
        })
    } catch (error) {
            throw new Error(error)
    }

}


const categoryByID = async(req,res)=>{
        console.log("hitttttttttttt")
        const {params:{id}} = req
    try {
        const getDataByID = await Category.findById(id)
        res.json({
            code:200,
            message:"get data successfully",
            success:true,
            result:getDataByID
                })
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteCategory,
    categoryByID

}
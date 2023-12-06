const Brand = require("../model/brandModel")

const createBrand = async(req,res)=>{

    try {
        const addBrand = await Brand.create(req.body)
        res.json({
            code:200,
            message:"brand added successfully",
            success:true,
            result:addBrand
        })
    } catch (error) {
        throw new Error(error)
    }

}

const getAllBrand = async(req,res)=>{
    try {
        const getAllData = await Brand.find()
        res.json({
            code:200,
            message:"get all data successfullt",
            success:true,
            result:getAllData
        })
    } catch (error) {
        throw new Error(error)
    }
}

const updateBrand= async(req,res)=>{
    const {params:{id}} = req
    try {
        const updateData = await Brand.findByIdAndUpdate(id,req.body,{new:true})
        res.json({
            code:200,
            message:"brand update successfully",
            success:true,
            result:updateData

        })

    } catch (error) {
        throw new Error(error)
    }
}

const deleteBrand= async(req,res)=>{
    const {params:{id}} = req
    
    try {
        const removeData = await Brand.findByIdAndDelete(id)
        res.json({
            code:200,
            message:"brand delete successfully",
            success:true,
            result:removeData
        })        
    } catch (error) {
        throw new Error(error)
    }
}

const getBrandById = async(req,res)=>{
const {params:{id}} = req

    try {
            const getDataByID = await Brand.findById(id)
            res.json({
                code:200,
                message:"get brand by id",
                success:true,
                result:getDataByID
            })

    } catch (error) {
        throw new Error(error)
    }
}


module.exports = {
    createBrand,
    getAllBrand,
    updateBrand,
    deleteBrand,
    getBrandById

}
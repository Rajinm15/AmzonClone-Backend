const ENQ  =require("../model/inqryModel")

const createInqiry = async(req,res)=>{
    try {
        const newEntry = await ENQ.create(req.body)
        res.json({
            code:201,
            message:"inquriy send successfully",
            success:true,
            result:newEntry

        })
    } catch (error) {
        throw new Error(error)
    }
}

const getAllInquriy = async(req,res)=>{
    try {
        const getAllInfo = await ENQ.find()
        res.json({
            code:200,
            message:"get all inquriy",
            success:true,
            result:getAllInfo
        })
    } catch (error) {
        throw new Error(error)
    }
}

const getInqById = async(req,res)=>{
    const{id} = req.params
    try {
            const getById = await ENQ.findById(id)
            res.json({
                code:200,
                message:"inqiry get successfully",
                success:true,
                result:getById
            })
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    createInqiry,
    getAllInquriy,
    getInqById
}
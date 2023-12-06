const Color = require("../model/colorModel")

const getAllColor = async(req,res)=>{
    try {
        const getAll = await Color.find()
        res.json({
            code:200,
            message:"get all color",
            sucess:true,
            result:getAll
        })
    } catch (error) {
        throw new Error(error)
    }
}

const addColor = async(req,res)=>{
    try {
        const newColor = await Color.create(req.body)
        res.json({
            code:201,
            message:"color added successfully",
            success:true,
            result:newColor
        })
    } catch (error) {
        throw new Error(error)
    }
}


const deleteColor = async(req,res)=>{
    const {params:{id}} =req
    console.log(id,"id")
    try {
        const colorDel =  await Color.findByIdAndDelete(id)
        res.json({
            code:200,
            message:"color delted successfully",
            success:true,
            result:colorDel
        })
    } catch (error) {
        throw new Error(error)
    }
}

const updateColor = async(req,res)=>{
    const {params:{id}}= req
    console.log(id,"id")
    
    try {
        const updatData = await Color.findByIdAndUpdate(id,req.body,{new:true})
        res.json({
            code:200,
            message:"color updated succesfully",
            success:true,
            result:updatData
        })        
    } catch (error) {
        throw new Error(error)
    }
}

const getColorById = async(req,res)=>{
    const {params:{id}}= req
    console.log(id,"id,,,,,,,")
    try {
        const getById = await Color.findById(id)
        res.json({
            code:200,
            message:"color get successfully",
            success:true,
            result:getById
        })
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = {
getAllColor,
addColor,
deleteColor,
updateColor,
getColorById
}
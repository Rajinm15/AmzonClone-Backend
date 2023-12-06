const Coupon = require("../model/couponModel")

const createCoupon = async(req,res)=>{
    console.log("hit............")
    try {
        const  newCoupon  = await Coupon.create(req.body)
        console.log(newCoupon,"new,,,,,,,,,,,,,") 
        res.json({
            code:201,
            message:"Coupon added successfully",
            success:true,
            result:newCoupon

        })
        
    } catch (error) {
            throw new Error(error)
    }
}

const getAllCoupon = async(req,res)=>{
    try {
        const getCoupon = await Coupon.find()
        res.json({
            code:200,
            message:"get all coupen successfully",
            success:true,
            result:getCoupon
        })
        
    } catch (error) {
        throw new Error(error)
    }
}

const deleteCoupon = async(req,res)=>{
    const {params:{id}} = req
    console.log(id,"id.........................")
    try {
        const DeleteData = await Coupon.findByIdAndDelete(id)
        res.json({
            code:200,
            message:"Coupon Deleted successfully",
            success:true,
            result:DeleteData
        })

    } catch (error) {
        throw new Error(error)
    }
}


const UpdateCoupon = async(req,res)=>{
    const {params:{id}} = req
    try {
            const UpdateData = await Coupon.findByIdAndUpdate(id,req.body,{new:true})
            console.log(UpdateData,"..................")
            res.json({
                code:201,
                message:"Coupon updated successfully",
                success:true,
                result:UpdateData
            })
    } catch (error) {
        throw new Error(error)
    }

}

module.exports = {
    createCoupon,
    getAllCoupon,
    deleteCoupon,
    UpdateCoupon
}
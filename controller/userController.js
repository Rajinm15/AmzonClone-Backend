const { genrateToken } = require("../config/jwtToken");
const { genrateRefreshToken } = require("../config/refreshToken");
const User = require("../model/userModel")
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken");
const { sendEmail } = require("./emailController");
const crypto = require("crypto")
const uniqid = require('uniqid'); 
const Cart = require("../model/cartModel")
const Product= require("../model/productModel")
const Coupon = require("../model/couponModel")
const Order = require("../model/orderModel")


//@post  userregister
const createUser = asyncHandler(async (req, res) => {

    try {
        const email = req.body.email;

        const findUser = await User.findOne({ email: email })
        console.log(findUser, "email")
        if (!findUser) {
            const newUsee = await User.create(req.body)
            res.json({
                code: 201,
                message: "user created succesfully",
                success: true,
                result: newUsee
            })

        } else {
            throw new Error("User Already Exist")
        }
    } catch (error) {

        throw new Error(error)
    }
})

//@post  Loginuser

const LoginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        const findUser = await User.findOne({ email: email });
        const token = genrateToken(findUser._id)
        console.log(findUser, "user")


        if (findUser && (await findUser.isPasswordMatched(password))) {
            const refreshToken = await genrateRefreshToken(findUser?._id)
            const updateInfo = await User.findByIdAndUpdate(findUser._id, {
                refreshToken: refreshToken
            }, { new: true }
            )

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 72 * 60 * 60 * 1000
            })
            res.json({
                code: 200,
                message: `Welcome back ${findUser.firstName}`,
                success: true,
                data: { result: findUser, accessToken: token },
            });
        } else {
            throw new Error("Invalid Password");
        }

    } catch (error) {
        throw new Error(error)

    }
});


// @handleRefresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie?.refreshToken) throw new Error("No refresh Token")
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({ refreshToken })
    if (!user) throw new Error("no refresh token present in db or not match")
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decode) => {
        if (err || user.id !== decode.id) {
            throw new Error("Something went wrong with refresh token")
        }
        const accessToken = genrateToken(user.id)
        res.json(accessToken)
    })

})

//   @get allUSer

const getAllUser = asyncHandler(async (req, res) => {

    try {

        const getallUser = await User.find()
        console.log(getallUser)

        res.json({
            code: 200,
            message: "success",
            success: true,
            result: getallUser
        })
    } catch (error) {
        throw new Error(error)

    }
})

// @get singleUSer

const getSingleUser = asyncHandler(async (req, res) => {
    const {
        params: { id },
    } = req;
    console.log(id, "......................................");

    try {
        const getSingleInfo = await User.findById(id)

        res.json({
            code: 200,
            message: "User Infromation",
            success: true,
            result: getSingleInfo
        })
    } catch (error) {
        throw new Error(error)
    }
})


// @delete USer
const deleteUser = asyncHandler(async (req, res) => {
    const {
        params: { id },
    } = req;
    console.log(id, "......................................");

    try {
        const getSingleInfo = await User.findByIdAndDelete(id)

        res.json({
            code: 200,
            message: "User Infromation",
            success: true,
            result: getSingleInfo
        })
    } catch (error) {
        throw new Error(error)
    }
})


// @Update User

const UpdateUser = asyncHandler(async (req, res) => {
    const { params: { id } } = req
    console.log(id, "idddddddddddd")
    try {
        const updateUser = await User.findByIdAndUpdate(id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }, { new: true })
        console.log(updateUser, "user")
        res.json({
            code: 200,
            message: "user update successfully",
            success: true,
            result: updateUser
        })

    } catch (error) {
        throw new Error(error)
    }


})

const blockUser = asyncHandler(async (req, res) => {
    const { params: { id } } = req

    try {
        const blockData = await User.findByIdAndUpdate(id, {
            isBlocked: true
        },
            { new: true }
        )

        res.json({
            code: 200,
            message: "block sucessfully",
            success: true,
            result: blockData
        })
    } catch (error) {
        throw new Error("something went worng")
    }
})



const unBlockUser = asyncHandler(async (req, res) => {
    const { params: { id } } = req
    console.log(id)
    try {
        const unblockData = await User.findByIdAndUpdate(id, {
            isBlocked: false
        }, {
            new: true
        })

        res.json({
            code: 200,
            message: "unblock Successfully",
            success: true,
            result: unblockData
        })

    } catch (error) {
        throw new Error("something went Wrong")
    }


})


//@logout
const handleLogout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie?.refreshToken) throw new Error("No refresh Token in Cookies")
    const refreshToken = cookie.refreshToken
    console.log(refreshToken, "refffffff")
    const user = await User.findOne({ refreshToken })
    console.log(user, "DDDDDDd")
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true
        })
        return res.sendStatus(204)
    }
    await User.findOneAndUpdate({ refreshToken }, {
        refreshToken: ""
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true
    })
    return res.sendStatus(204)
})

//update Password
const updatePassword = asyncHandler(async (req, res) => {
    try {
        const { params: { id } } = req
        console.log(id)
        const password = req.body.password
        const user = await User.findById(id)
        console.log(user)
        if (password) {
            user.password = password
            console.log(password)
            const updatePass = await user.save()
            console.log(updatePass, "updatePass")
            res.json(updatePass)
        }

    } catch (error) {
        throw new Error(error)
    }

})


//forgot password

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) throw new Error("User not found with this email")
    try {

        const token = await user.createPasswordResetToken()
        await user.save()
        const resetURL = `Hii, Please follow this link to reset your password. This link is valid for 10 mints from now 
        <a href="localhost:7000/api/user/reset-password/${token}">RESET PASSWORD LINK</a>`

        const data = {
            to: email,
            text: "Hey User",
            subject: "Forgot Password Link",
            html: resetURL
        }

        sendEmail(data)
        console.log(data,"dya")
        res.json(data)
    } catch (error) {
        throw new Error(error
        )
    }
})


// reset password 

const resetPassword = asyncHandler(async (req, res) => {
    try {
      const { password } = req.body;
      const { token } = req.params;
      const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  
      console.log("Input Token:", token);
      console.log("Hashed Token:", hashedToken);
  
      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpries: { $gt: Date.now() }
      });
  
      console.log("User:", user);
  
      if (!user) {
        return res.status(400).json({ message: "Token is expired or invalid" });
      }
  
      user.password = password;
      user.passwordResetToken = undefined;
      user.passwordResetExpries = undefined;
      await user.save();
  
      res.json({ message: "Password reset successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while resetting the password" });
    }
  });


  const userCart = async(req,res)=>{
    const { cart } = req.body;
  const { _id } = req.user;
  try {
    let products = [];
    const user = await User.findById(_id);
    const alreadyExistCart = await Cart.findOne({ orderby: user._id });
    if (alreadyExistCart) {
      alreadyExistCart.remove();
    }
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i].id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      let getPrice = await Product.findById(cart[i].id).select("price").exec();
      object.price = getPrice.price;
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      orderby: user?._id,
    }).save();
    res.json({
        code:201,
        message:"add to cart successfully",
        success:true,
        result:newCart
    });
  } catch (error) {
    throw new Error(error);
  }
  }

  const getUserCart = async (req, res) => {
    const { id } = req.user;
  
    try {
      const cart = await Cart.findOne({ orderby: id }).populate("products.product")
      
      console.log(cart, "cart");
  
      res.json({
            code:200,
            message:"get cart successfully",
            success:true,
            result:cart
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

  const emptyCart = async(req,res)=>{
    const {_id} = req.user
    console.log(_id,"id")
    
    
    try {
        const user = await User.findOne({_id})
        const removeCart = await Cart.findOneAndDelete({orderby:user._id})
        console.log(user,"user")    
        res.json({
            code:200,
            message:"cart clear successfully",
            success:true,
            result:removeCart
        })
    } catch (error) {
        throw new Error(error)
    }
  }

  const applyCoupon = async(req,res)=>{
    const {coupon} = req.body
    const {_id} = req.user
    try {
        const validateCoupon = await Coupon.findOne({name:coupon})
        if(validateCoupon === null){
            throw new Error("invalid Coupon")
        }
    const user = await User.findOne({_id})
    let  cartTotal  = await Cart.findOne({
        orderby: user._id,
      })
      let totalAfterDiscount = (
        cartTotal.cartTotal - (cartTotal.cartTotal * validateCoupon.discount) / 100
        ).toFixed(2);
     res.json({
        code:200,
        message:"coupon apply successfully",
        success:true,
        result:totalAfterDiscount
    })
    } catch (error) {
            throw new Error(error)
    }
  }

  const createOrder = async(req,res)=>{
    console.log("hoittttttttttt")
    const {COD,couponApplied} = req.body
    const {_id} = req.user 

    try {
        if(!COD) throw new Error("Create cash order failed")
        const user = await  User.findById(_id)
    let userCart = await Cart.findOne({orderby:_id})
    console.log(userCart,"userCart")
    console.log(user,"user")
    let finalCount = 0 
    if(couponApplied && userCart.totalAfterDiscount){
        finalCount = userCart.cartTotal * 100
    }
    else{
        finalCount = userCart.cartTotal
    }
    let newOrder = await new Order({
        products:userCart.products,
        paymentIntent:{
            id:uniqid(),
            method:"COD",
            amount:finalCount,
            status:"Cash on Delivery",
            cerated :Date.now(),
            currency:"USD"
        },
        orderBy:user._id,
        orderStatus:"Processing"
    }).save()
    let upadte =userCart.products.map((item)=>{
        return {
            updateOne: {
                filter: { _id: item.product?._id },
                update: { "$inc": { quantity: -item.count, sold: +item.count }},
                upsert: true,
            }
        };
    })
    const uodated = await Product.bulkWrite(upadte,{})
    res.json({
        message:"success",
        result:newOrder
    })
    } catch (error) {
        console.log(error,"err")
        throw new Error(error)
    }
  }

  const getAllOrder = async(req,res)=>{
    try {
        const getOrder = await Order.find().populate("products.product")
        .exec()
        res.json({
            code:200,
            message:"get all order successfully",
            success:true,
            result:getOrder
        })
        
    } catch (error) {
        throw new Error(error)
    }
  }

const getOrderByUserId = async(req,res)=>{
    const {_id} = req.user
    console.log(_id,"id")
    
    try {
        const getUserOrder = await Order.findOne({orderBy:_id}).populate("products.product").exec()
res.json({
    code:200,
    message:"get order successfully",
    success:true,
    result:getUserOrder
})

    } catch (error) {
        throw new Error(error)
        
    }
}

const updateOrderStatus = async(req,res)=>{
    const {params:{id}} = req
    const {status} = req.body
    try {
        const updateOrder = await Order.findByIdAndUpdate(id,{
            orderStatus:status,
            paymentIntent:{
                status:status
            }
        },{new:true})

        console.log(updateOrder,"nnnnnnnnnnnnnnnnnnn")
        res.json({
            code:200,
            message:"orderstatus change successfully",
            success:true,
            result:updateOrder
        })
        
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = {
    createUser,
    LoginUser,
    getAllUser,
    getSingleUser,
    deleteUser,
    UpdateUser,
    blockUser,
    unBlockUser,
    handleRefreshToken,
    handleLogout,
    updatePassword,
    forgotPassword,
    resetPassword,
    userCart,
    getUserCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getAllOrder,
    getOrderByUserId,
    updateOrderStatus
}
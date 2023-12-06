const Blog = require("../model/blogModel")
const User = require("../model/userModel")

//crreate Blog
const createBlog = async (req, res) => {
    console.log("hitttttttttttttttttttt")
    try {
        const doCreateblog = await Blog.create(req.body)
        console.log(doCreateblog)
        res.json({
            code: 201,
            message: "blog created successfully",
            success: true,
            result: doCreateblog
        })
    } catch (error) {
        throw new Error(error)
    }

}

//get all blog

const getAllBlog = async (req, res) => {
    try {
        const doGetInfo = await Blog.find()
        console.log(doGetInfo, "info")
        res.json({
            code: 200,
            message: "all blog get successfully",
            success: true,
            result: doGetInfo

        })
    } catch (error) {
        throw new Error(error)
    }
}

//get blog by id

const blogDetailPage = async (req, res) => {
    const { params: { id } } = req
    try {
        const doGetDetailPage = await Blog.findById(id)
        res.json({
            code: 200,
            message: "blog get successfully",
            success: true,
            result: doGetDetailPage

        })
    } catch (error) {
        throw new Error(error)

    }
}

//update blog
const UpdateBlog = async (req, res) => {
    const { params: { id } } = req
    console.log(id)
    try {
        const getBlogUpdate = await Blog.findById(id)
        await Blog.findByIdAndUpdate(id, {
            $inc: { numViews: 1 }
        }, { new: true })

        console.log(getBlogUpdate, "................")

        res.json({
            code: 200,
            message: "blog update successfuly",
            success: true,
            result: getBlogUpdate
        })
    } catch (error) {
        throw new Error(error)
    }

}

//like blog
// const LikeBlog = async (req, res) => {
//     const { blogId } = req.body
//     console.log(blogId, "bidddddddddddddddddddd")
  
//         const blog = await Blog.findById(blogId)
//         console.log(blog, '...............')
//         const loginUser_id = req.user._id

//         const isLiked = blog.isLiked
//         console.log(isLiked, ":...........:::::::::::::::::::::::::::::")

//         const alreadyDisliked = blog?.disliked?.find(
//             (userId = userId?.toString() === loginUser_id?.toString()))
//         if (alreadyDisliked) {
//             const blog = await Blog.findByIdAndUpdate(id, {
//                 $pull: { disliked: loginUser_id },
//                 isDisliked: false

//             }, { new: true })
//             res.json({
//                 code: 200,
//                 message: "successfully",
//                 success: true,
//                 result: blog
//             })
//         }
//         console.log(alreadyDisliked, ":::::::::::::::::::::::")
//         if (isLiked) {
//             const blog = await Blog.findByIdAndUpdate(id, {
//                 $pull: { likes: loginUser_id },
//                 isLiked: false

//             }, { new: true })
//             res.json({
//                 code: 200,
//                 message: "successfully",
//                 success: true,
//                 result: blog
//             })
//         } else {
//             const blog = await Blog.findByIdAndUpdate(id, {
//                 $pull: { likes: loginUser_id },
//                 isLiked: true

//             }, { new: true })
//             res.json({
//                 code: 200,
//                 message: "successfully",
//                 success: true,
//                 result: blog
//             })
//         }

// }



const LikeBlog = async (req, res) => {
    const { blogId } = req.body;

    try {
        const blog = await Blog.findById(blogId);
        const loginUser_id = req.user._id;
        
        const isLiked = blog.likes.includes(loginUser_id);
        const isDisliked = blog.disliked.includes(loginUser_id);

        if (isDisliked) {
            // Remove the user from the list of those who disliked the blog
            await Blog.findByIdAndUpdate(blogId, {
                $pull: { disliked: loginUser_id },
            });
        }

        if (isLiked) {
            // Remove the user from the list of those who liked the blog
            await Blog.findByIdAndUpdate(blogId, {
                $pull: { likes: loginUser_id },
            });
        } else {
            // Add the user to the list of those who liked the blog
            await Blog.findByIdAndUpdate(blogId, {
                $addToSet: { likes: loginUser_id },
            });
        }

        // Fetch the updated blog
        const updatedBlog = await Blog.findById(blogId);

        res.json({
            code: 200,
            message: "Successfully",
            success: true,
            result: updatedBlog,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "An error occurred",
            success: false,
        });
    }
};


//disliked blog

const dislikedBlog = async(req,res)=>{
    const { blogId } = req.body;
  const blog = await Blog.findById(blogId);
  const loginUserId = req?.user?._id;
  const isDisLiked = blog?.isDisliked;
  const alreadyLiked = blog?.likes?.find(
    (userId) => userId?.toString() === loginUserId?.toString()
  );
  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    res.json(blog);
  }
  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    res.json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    res.json(blog);
  }
}



//delete blog

const DeleteBlog = async(req,res)=>{
    const {params:{id}} = req
    try {
            const doDelete = await Blog.findByIdAndDelete(id)
            res.json({
                code:200,
                message:"Blog Delete Successfully",
                success:true,
                result:doDelete
            })        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "An error occurred",
            success: false,
        });
        
    }
}


module.exports = {
    getAllBlog,
    createBlog,
    blogDetailPage,
    UpdateBlog,
    LikeBlog,
    DeleteBlog,
    dislikedBlog
}


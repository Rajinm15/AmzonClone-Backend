const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    numViews: {
        type: Number,
        default: 0
    },
    isLiked: {
        type: Boolean,
        default: false,
    },
    isDisliked: {
        type: Boolean,
        default: false
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    disliked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    image: {
        type: String,
        default: "https://img.freepik.com/free-vector/organic-flat-blog-post-illustration-with-people_23-2148955260.jpg?w=740&t=st=1699422616~exp=1699423216~hmac=15fcec68e7d253c14a5741e38b5ca60f80943e1177722945b941d11a77f44af9"
    },
    author: {
        type: String,
        default: "Admin"
    },


}, { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true },

)


module.exports = mongoose.model("Blog", BlogSchema)
// 게시글 관련 데이터 Collection의 스키마를 정의할 파일

const mongoose = require("mongoose");

let PostSchema = new mongoose.Schema({
    content: String,
    time: Date,
    likes: Number,
    image: String,
    creator: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        firstName: String,
        lastName: String,
        profile: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

let Post = mongoose.model("Post", PostSchema);
module.exports = Post;
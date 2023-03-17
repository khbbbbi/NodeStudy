// 댓글 관련 데이터를 관리하는 Comment Collection을 생성하는 파일

const mongoose = require("mongoose");

let CommentSchema = new mongoose.Schema({
    content: String,
    likes: Number,
    creator: {
        _id: {
            type: mongoosse.Schema.Types.ObjectId,
            ref: "User"
        },
        firstName: String,
        lastNAme: String
    }
});

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
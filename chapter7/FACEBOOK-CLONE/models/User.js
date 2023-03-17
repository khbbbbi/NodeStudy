// 사용자의 데이터 스키마를 담고 있는 파일

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    profile: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    
    liked_posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],

    liked_comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    friendRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);   //사용자 인증을 위한 passport-local-mongoose모듈과 스키마를 연결해준다.
let User = mongoose.model("User", UserSchema);  //UserSchema 구조를 따르는 User라는 이름의 인스턴스를 생성해주고
module.exports = User;                          //이렇게되면 MongoDB저장소에 User라는 Document가 생성된 것.
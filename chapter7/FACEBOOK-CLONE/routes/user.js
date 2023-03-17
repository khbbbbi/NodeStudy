const express = require("express");
const User = require("../models/User");
const passport = require("passport");
const multer = require('multer');       /**urlencoded로 텍스트 데이터를 처리했는데, 텍스트가 아닌 
                                        이미지, 동영상 등의 파일 데이터는 urlencoded로 처리하지 못하므로 multer모듈을 사용해야함*/ 
const cloudinary = require("cloudinary");
const routher = express.Router();

/* Multer setup */
const storage = multer.diskStorage({
    filename: (req, file, callback) => {    // cloudaniary 모듈을 사용해 파일을 저장할거라 저장 경로는 따로 설정안하고 filename만 설정해주면됨.
        callback(null, Date.now() + file.originalname); /*diskStorage()의 인자로 객체를 보내주었는데 filename이라는 키 값은 함수이며 
                                                        이 함수의 인자인 callback을 통해 전송된 파일명을 설정함*/
    }
});

//파일의 확장자가 jpg,jpeg,png인지 확인하는 부분
const imageFilter = (req, file, callback) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/i)){
        return callback(new Error("Only image files are allowed!"), false);
    }
    callback(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter });

/* cloudinary setup */
// 이미지를 업로드하고 불러올 공간을 빌리기 위해 SaaS 서비스인 cloudinary를 사용했음.
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/* Middleware */
// 로그인하지 않은 사용자를 체크하는 미들웨어 부분
const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!"); // 로그인하지 않은 사용자면 flash로 오류메시지를 보내고
    res.redirect("/user/login");                                // /user/login로그인 화면으로 리다이렉트 해줌.
};

/* Routers */

/* User Routers */
Router.post("/user/register", upload.single("image"), (req, res) => {
    if(
        req.body.username &&
        req.body.firstname &&
        req.body.lastname &&
        req.body.password
    ){
        let newUser = new User({
            usrname: req.body.username,
            firstName: req.body.firstname,
            lastName: req.body.lastname
        });
        if(req.file){
            cloudinary.uploader.upload(req.file.path, reslt => {
                newUser.profile = result.secure_url;
                return createUser(newUser, req.body.password, req, res);
            });
        }else{
            newUser.profile = process.env.DEFAULT_PROFILE_PIC;
            return createUser(newUser, req.body.password, req, res);
        }
    }
});
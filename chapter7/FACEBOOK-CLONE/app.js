const express = require('express');
const mongoose = require('mongoose');           //MongoDB
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const Localstrategy = require('passport-local');
const socket = require('socket.io');
const dotenv = require('dotenv');               //환경 변수를 파일에 따로 저장
const flash = require('connect-flash');         //그닥 중요하지 않은 미들웨어. 일단 그냥 넘겨
const Post = require('./models/Post');          //Post 데이터를 만들 부분
const User = require('./models/User');          //User 데이터를 만들 부분

const port = process.env.PORT || 3000;
const onlineChatUsers = {};     // 채팅 기능을 위해 user의 정보를 담을 객체 변수 할당

dotenv.config();                //.env 파일의 변수를 process.env를 통해 사용할 수 있게 해주는 메서드

const postRoutes = require("./routes/posts");   // 게시글 관련한 라우터
const userRoutes = require("./routes/users");   // 사용자에 관한 라우터
const app = express();

app.set("view engine", "ejs");  // 이제부터 ejs를 사용해 view를 구성할 것이라고 알려줌.

/* 미들웨어 */
//cookie-parser, express-session, connect-flash 미들웨어 장착
//connect-flash 미들웨어는 내부적으로 cookie-parser, express-session를 사용하므로 이 둘 뒤에 작성.
app.use(cookieParser(process.env.SECRET));  
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
})
);
app.use(flash());

/* passport setup */
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    //body parse를 위한 express의 json, urlencoded 장착
app.use(express.static("public"));                  //정적 파일들을 서비스할 폴더를 public/으로 지정해줌.

/* MongoDB Connection */
mongoose    //mongoose를 사용해 MongoDB와 connection을 생성
    .connect("mongodb://127.0.0.1:27017/facebook_clone", {  //host는 local, 포트는 몽고디비 기본포트 27017로, 데베명은 facebook_clone으로 지정
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

/* Template 파일에 변수 전송 */
// 템플릿 파일에 user와 Authentication, flash와 관련한 변수를 전송해주는 부분
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.login = req.inAuthenticated();
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

/* Routers */
app.use('/', userRoutes);
app.use('/', postRoutes);

const server = app.listen(port, () => {
    console.log("App is running on port" + port);
});

/* WebSocket setup */
// socket.io를 이용해 websocket 통신을 구현하고 http 통신을 하는 express 서버와 연결해준다.
const io = socket(server);

const room = io.of('/chat');
room.on('connection', socket => {
    console.log("new user : ", socket.id);

    room.emit("newUser", { socketID: socket.id });      //모든 사용자에게 메시지를 보내는 부분

    socket.on("newUser", data => {                      // 특정 이벤트에만 메시지를 보냄 : 새로운 사용자가 등장했을 때
        if(!(data.name in onlineChatUsers)){
            onlineChatUsers[data.name] = data.socketID; //새로운 사용자가 들어오면 객체 변수에 해당 사용자를 넣어줌.
            socket.name = data.name;
            room.emit("updateUserList", Object.keys(onlineChatUsers));
            console.log("Online users : " + Object.keys(onlineChatUsers));
        }
    });

    socket.on("disconnect", () => {                     // 특정 이벤트에만 메시지를 보냄 : 사용자가 나갔을 때
        delete onlineChatUsers[socket.name];            // 사용자가 채팅방을 나가면 사용자 정보 삭제
        room.emit("updateUserList", Object.keys(onlineChatUsers));
        console.log(`user ${socket.name} disconnected`);
    });

    socket.on("chat", data => {                         // 특정 이벤트에만 메시지를 보냄 : 사용자들이 메시지를 보냈을 때
        console.log(data);
        if(data.to === "Global Chat"){
            room.emit("chat", data);
        }else if(data.to){
            room.to(onlineChatUsers[data.name]).emit("chat", data);
            room.to(onlineChatUsers[data.to]).emit("chat", data);
        }
    });
});
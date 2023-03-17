const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const Localstrategy = require('passport-local').strategy;

const app = express();

// 포트 설정
app.set('port', process.env.PORT || 8080);

// 가상 데이터
let fakeUser = {
    username: 'test@test.com',
    password: 'test@1234'
}

// 공통 미들웨어
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('passportExample'));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'passportExample',
    cookie: {
        httpOnly: true,
        secure: false
    }
}));

// passport 미들웨어
app.use(passport.initialize());     // passport 초기화
app.use(passport.session());        // passport session 연동

// 세션 처리 - 로그인에 성공했을 경우 딱 한번 호출되어 사용자의 식별자를 session에 저장
passport.serializeUser(function (user, done) {
    console.log('serializeUser', user);
    done(null, user.username);
});

//세션 처리 - 로그인 후 페이지 방문마다 사용자의 실제 데이터 주입
passport.deserializeUser(function (id, done) {
    console.log('deserializeUser', id);
    done(null, fakeUser);   // req.user에 전달
});

passport.use(new Localstrategy(
    function (username, password, done) { 
        if(username === fakeUser.username){     // username OK
            if(password === fakeUser.password){  // password OK
                return done(null, fakeUser);
            }else {
                return done(null, false, { message: "password incorrect" });
            }
        }else{
            return done(null, false, { message: "username incorrect" });
        }
    }
));

// 라우터 설정
app.get('/', (req, res) => {
    if(!req.user) {     //로그인ㅇ르 아직 하지 않았을 때
        res.sendFile(__dirname + '/index.html');
    }else{              //로그인 성공 시 세션에 req.user 저장
        const user = req.user.username;
        const html = `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0>
            <title>Document</title>
        </head>
        <body>
            <p>${user}님 안녕하세요!</p>
            <button type = "button" onclick="location.href='/logout'">
        </body>
        </html
        `
        res.send(html);
    }
});
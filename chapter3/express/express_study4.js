// 미들웨어 사용법(2)
//서버가 요청을 받을 때마다 'LOGGED'라는 메시지를 콘솔에 출력하는 것. -> 제대로 실행 O
//why? 미들웨어는 위에서 아래로 실행되기 때문에 순서가 중요!!

const express = require('express');
const app = express();

app.get('/', function(req, res, next){
    res.send('Hello World');
    next();
});

const myLogger = function(req, res, next){  
    console.log('LOGGED');
    next();
};

app.use(myLogger);  

app.listen(8080);
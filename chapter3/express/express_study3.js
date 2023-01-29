// 미들웨어 사용법(1)
//서버가 요청을 받을 때마다 'LOGGED'라는 메시지를 콘솔에 출력하는 것. -> 제대로 실행X

const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send('Hello World');
});

const myLogger = function(req, res){    //myLogger라는 미들웨어를 만들어 주었고
    console.log('LOGGED');
};

app.use(myLogger);  /*app.use를 사용해 미들웨어를 붙여주었다. -> 요청이 들어올 때마다 반드시 myLogger를 거치게됨. 
                    -> 여기서 요청은 '/'주소를 get했을 때 = 즉, localhost:8080/에 접속했을 때를 말함. */

app.listen(8080);
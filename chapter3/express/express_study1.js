//express 사용법 (1)
//가장 기본적인 express 사용법

const express = require('express');    //require을 통해 모듈을 불러오는 것까지 동일
const app = express()

app.get('/', (req, res) => {
    /* http 모듈의 res 객체의 메서드 write()대신,
    express의 res 객체의 send() 메서드를 통해 웹에 문자열 데이터를 전달 */
    /* send()함수 하나로 응답을 보내고, 종료하는 기능까지 가능 */
    res.send('Hello World!');
});

app.listen(8080, () => 
    console.log('8080포트에서 서버 실행중'));
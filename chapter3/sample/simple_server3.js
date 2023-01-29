//문자열을 보내는 응답 코드

const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<h1>Node.js로 서버 만들기</h1>');
    //res.end()함수는 요청에 대한 응답을 보내주는 함수인데 비슷한 것으로 res.sendFile, res.send, res.json이 있음.(하나의 요청에 한 개의 응답만!)
    res.end('<p>3장 http 모듈 공부 중입니다</p>')
})
    .listen(8080);

//Listening Event Listner
//listen() 메서드에 콜백을 넣는 대신 listening 이벤트 리스너를 붙여 사용할 수도 있음.
server.on('listening', () => {
    console.log('8080포트에서 서버 연결 중..');
});

//Error Event Listener
//오류를 핸들링해주는 이벤트 리스너를 붙여줄 수도 있음.
server.on('error', () => {
    console.error(error);
});
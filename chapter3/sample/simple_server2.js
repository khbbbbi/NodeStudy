//웹 페이지의 요청에 대한 응답
const http = require('http');

/*.createServer() - 서버를 만드는 함수, 함수 안에 인자로 콜백 함수를 넣고 
    이 콜백함수에는 요청에 대한 응답 작성이 콜백 함수의 파라미터에 두 가지 객체를 넣음. (req와 res)*/
http.createServer((req, res) => {

    /* res.writeHead() - 응답에 대한 정보를 기록하는 함수 파라미터로 요청 코드(여기선 성공을 알리는 200)와 콘텐츠의 타입을 넣어줌*/
    res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8' });    

    /* res.write() - 파라미터로 클라이언트에 보낼 데이터를 넣어줌 */
    res.write('<h1>Node.js로 서버 만들기</h1>');

    /* res.end() - 응답을 종료하는 메서드, 여기에 넣은 파라미터까지 전달 후 응답 종료 */
    res.end('<p>3장 http모듈 공부 중입니다.</p>')
})
    /* createServer()함수 뒤에 .listen()을 붙여 
    클라이언트와 연결할 포트번호와 서버가 연결되면 실행할 콜백 함수를 넣음. */
    .listen(8080, () => {
        console.log('8080포트에서 서버 연결 중 ..');
    });
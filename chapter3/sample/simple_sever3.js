//request와 response 확인
//실행하면 request와 response의 세부 내용 확인 가능
/*서버와 연결만 하고 response는 아직 만들지 않은 빈 코드인데 많은 양의 request가 들어온 것을 볼 수 있음.
많은 양의 request 중 확인할 것은 url과 method데이터이고 이 두가지의 데이터를 실제 사용할 수 있음.
console.log(req.url);이런 방법으로 확인 가능.*/

const http = require('http');

http.createServer((req, res) => {
    console.log(req);
    console.log(res);
})
    .listen(8080, () => {
        console.log('8080포트에서 서버 연결');
    });


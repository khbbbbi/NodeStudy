//REST를 통한 페이지 생성

const http = require('http');

http.createServer((req, res) => {
    // req.url이 /라는 뜻 - localhost:8080 뒤의 주소가 /라는 뜻.(기본 페이지라는 뜻)
    // 여러 url을 설정해주고 req.url이 기본페이지일때 무엇을 띄우고 회원페이지일때 무엇을 띄우는 식으로 여러 페이지 생성 가능.
    // REST - 이렇게 요청을 보낼 때 주소를 통해 내용을 표시하는 것
    if(req.url === '/') {
        res.write('Hello');
        res.end()
    }
})
    .listen(8080, () => {
        console.log('8080포트에서 서버 연결');
    });

    // + 뒤에 붙는 주소에 따라 요청을 정의할 수 있도록 주소체계를 구조화하여 만든 웹 서버를 'RESTful'하다라고 함. 
    // 이는 라우팅을 통해 구현할 수 있음. -> 4장에서 자세히
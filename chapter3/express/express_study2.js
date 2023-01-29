//express 사용법 (2)

// express를 require을 통해 불러오고(4행) app변수에 할당했음(6행).
const express = require('express');

const app = express();
// app.set('port', 포트번호)을 통해 서버가 실행될 포트 지정
// process.env.PORT는 process.env 객체에 기본 포트번호가 있다면 해당 포트를 사용한다는 뜻. 그렇지 않으면 8080사용하라고 지정
// app.set(키, 값)은 키, 값 파라미터를 이용해 키에 값을 저장하도록 설정할 수 있는 함수.
app.set('port', process.env.PORT || 8080);

//위 데이터를 app.get(키) 함수를 통해 가져옴
//app.get(주소, 라우터)은 주소에 대한 GET요청이 올 때 어떤 응답을 할지 적어줌.
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중..');
});


//html 파일을 보낼 때 fs 모듈에서의 .readFile() 대신 sendFile()을 사용할 수 있음.
    /*writeHeader를 통해 Content-Type과 Charset 정보까지 보내줘야 했지만 
    express의 res 객체의 sendFile 메서드를 사용하면 자동으로 정보를 클라이언트에 보내줌.*/

/*요청 주소를 여러개 더 추가할때 http모듈에서는 if else를 사용해 요청 주소를 분리해줘야 했지만
express를 사용하면 app.get 등의 메서드로 깔끔하게 줏를 분리할 수 있는 등의 장점이 있음.*/
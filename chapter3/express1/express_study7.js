const express = require('express');

const app = express();
app.set('port', process.env.PORT || 8080);

app.use(express.static(__dirname + '/public1'));

app.get('/', (req, res) => {
    const output = `
        <h2>exppress로 웹 만들기</h2><br>
        <p>메인 페이지 입니다.</p><br>
        <img src = "./sample.jpg" width="200px" height="100px"/>
        `
    res.send(output);
});

app.get('/user/:id', (req, res) => {
    res.send(req.params.id + "님의 개인 페이지 입니다.")
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중');
})
const morgan = require('morgan');
const axios = require('axios');
const express = require('express');
const app = express();

//포트 설정
app.set('port', process.env.PORT || 8080);

//공통 미들웨어
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//라우팅 설정
app.get('/airkorea', async (req, res) => {
    const serviceKey = "ORG%2FWSFYJ6ZPyS0yfXnpIk92qmEKmR6giuVOIm9rNhn4g8qopsfAPWcppXkzlGdkmfNxiGCGjJ4m6wXc5yllhQ%3D%3D";
    const airUrl = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?";
    
    let parmas = encodeURI('serviceKey') + '=' + serviceKey;
    parmas += '&' + encodeURI('numOfRows') + '=' + encodeURI('1');
    parmas += '&' + encodeURI('pageNo') + '=' + encodeURI('1');
    parmas += '&' + encodeURI('dataTerm') + '=' + encodeURI('DAILY');
    parmas += '&' + encodeURI('ver') + '=' + encodeURI('1.3');
    parmas += '&' + encodeURI('stationName') + '=' + encodeURI('마포구');
    parmas += '&' + encodeURI('returnType') + '=' + encodeURI('json');

    const url = airUrl + parmas;

    try {
        const result = await axios.get(url);    /*url과 serviceKey, 지역, 페이지 수 등의 옵션을 지정한 
                                                parameters를 연결해 하나의 url로 만들어 axios.get() 메서드를 통해 요청을 보낸다.*/
        res.json(result.data);  //.data         //axios로 받은 결과는 꼭 뒤에 .data를 붙여주어야함!!!!
    } catch (error) {
        console.log(error);
    }
});

//서버와 포트 연결
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중..');
});
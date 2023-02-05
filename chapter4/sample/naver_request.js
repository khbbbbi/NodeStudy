const morgan = require('morgan');
const request  = require('request');    //설치한 request모듈 임포트  
const express = require('express');
const app = express();

//포트 설정
app.set('port', process.env.PORT || 8080);

//공통 미들웨어
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//라우팅 설정
app.get('/naver/news', (req, res) => {  // /naver/news 라우터를 설정하여 해당 url로 뉴스 api에 대한 응답을 보내도록 설정.
    const client_id = 'Tkl2pNapEa5akSoW07Xw';   //발급받은 client id
    const client_secret = 'METJRJOYAF';         //발급받은 client secret key
    const api_url = 'https://openapi.naver.com/v1/search/news?query=' + encodeURI('코스피');     //encodeURI(req.query.query);  
                                                                                                //검색어를 통해 관련 뉴스 받아오기 위함.
    const option = {};
    const options = {   //우리가 지정하는 것이 아니고 네이버 API에서 제공하는 가이드에 맞게 작성해주어야함.
        url: api_url,   //api_url은 네이버에서 열어준 api 호출 url이다.
        qs: option,
        headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret },
    };

    request.get(options, (error, response, body) => {   //응답을 받기 위해 request 모듈의 get()함수 사용
        if(!error && response.statusCode == 200) {      //오류가 없고 statusCode가 200(정상)이라면 결과를 받아와라!
            let newsItem = JSON.parse(body).items;
            //items - title, link, description, pubDate

            const newsJson = {
                title: [],
                link: [],
                description: [],
                pubDate: []
            }

            for(let i = 0; i < newsItem.length; i++){
                newsJson.title.push(newsItem[i].title.replace(/(<([^>]+)>)|&quot;/ig, ""));
                newsJson.link.push(newsItem[i].link);
                newsJson.description.push(newsItem[i].description.replace(/(<([^>]+)>)|&quot;/ig, ""));
                newsJson.pubDate.push(newsItem[i].pubDate);
            }
            res.json(newsJson);
        }else{                                          //오류가 있다면 오류를 콘솔에 출력해라.
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});

//서버와 포트 연결
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중..');
});
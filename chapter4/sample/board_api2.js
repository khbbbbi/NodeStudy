// //게시판에 uuid-apikey 추가하기

// const morgan = require('morgan');
// const url = require('url');         //요청 주소 뒤에 ?key=value 형식으로 url 쿼리스트링을 보내줄 수 있는데 이런 url을 파싱하기 위해 url모듈불러옴
// const uuidAPIkey = require('uuid-apikey');

// /* express app generate */
// const express = require('express');
// const app = express();

// /* 포트 설정 */
// app.set('port', process.env.PORT || 8080);

// /* 공통 미들웨어 */
// app.use(morgan('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// /* 테스트를 위한 API키 */
// const key = {       
//     apiKey: 'AEBFX5V-4NQ4991-QNSVTHP-AYWAPGZ',
//     uuid: '5396fe97-256e-44a4-bd73-bd4657b8ab43'
// };

// /* 테스트를 위한 게시글 데이터 */
// let boardList = [];
// let numOfBoard = 0;

// /* 라우팅 설정 */
// app.get('/', (req, res) => {
//     res.send('This is api.js');
// });

// /* 게시글 API */
// app.get('/board', (req, res) => {   //GET 메서드로 '/board'요청이 들어요면
//     res.send(boardList);            //boardList에 저장된 값을 보여줌
// });

// app.post('/board', (req, res) => {  //POST 메서드로 '/board' 요청이 들어오면 게시글을 등록하는 API가 됨.
//     const board = {                 //'board'객체에 req.body로부터 받아온 id, date, title, content 값을 저장(32~38행)
//         "id": ++numOfBoard,
//         "user_id": req.body.user_id,
//         "date": new Date(),
//         "title": req.body.title,
//         "content": req.body.content 
//     };
//     boardList.push(board);          //이를 전역변수 boardList에 push해줌.

//     res.redirect('/board');
// });

// app.put('/board/:id', (req, res) => {       //PUT 메서드로 '/board/:id'요청이 들어오면
//     //req.params.id 값 찾아 리스트에서 삭제
//     const findItem = boardList.find((item) => {
//         return item.id == +req.params.id    //:id 값은 req.params.id에 저장됨.
//     });

//     const idx = boardList.indexOf(findItem);    //boardList 요소 중 id 값이 req.params.id와 같은 요소가 있다면 이를 findItem에 저장
//     boardList.splice(idx, 1);       //해당 요소를 splice() 함수로 제거해줌.(첫번째인자부터 두번째인자까지의 인덱스만 남기고 나머지 요소 없애는 함수임.)

//     //리스트에 새로운 요소 추가
//     const board = {                 //req.params.id를 id로 한 새로운 게시글 데이터를 생성하고 boardList에 넣어줌.
//         "id": +req.params.id,   
//         "user_id": req.params.user_id,
//         "date": new Date(),
//         "title": req.body.title,
//         "content": req.body.content
//     };
//     boardList.push(board);

//     res.redirect('/board');
// });

// app.delete('/board/:id', (req, res) => {            //delete메서드로 '/board/:id'요청이 들오면
//     //req.params.id 값 찾아 리스트에서 삭제     
//     const findItem = boardList.find((item) => {     //:id 값과 동일한 boardList의 요소를 삭제함
//         return item.id == + req.params.id
//     });
//     const idx = boardList.indexOf(findItem);
//     boardList.splice(idx, 1);

//     res.redirect('/board');
// });

// /* 게시글 검색 API using uuid-key */
// app.get('/board/:apikey:type', (req, res) => {              //:apikey/ 부분에 들어온 값으로 api key 검사.
//     let{ type, apiKey } = req.params;   
//     const queryData = url.parse(req.url, true).query;      //url 모듈의 parse()함수로 요청 쿼리스트링을 queryData, 변수에 넣어줌

//     if(uuidAPIkey.isAPIKey(apiKey) && uuidAPIkey.check(apikey, key.uuid)){      //isAPIKey()와 .check를 통해 url로 들어온 키가 유효한지 확인
//                                                                                 /* .isAPIKey(apikey) - 들어온 apikey가 서버에서 발급한 적이 있는 키인지 확인
//                                                                                     check(apikey, key.uuid) 함수는 key와 uuid 짝이 맞는지 확인*/
//         if(type === 'search'){      //키워드로 게시글 검색      //만약 :type부분에 search/가 들어왔다면 키워드로 게시글 검색
//             const keyword = queryData.keyword;
//             const result = boardList.filter((e) => {
//                 return e.title.includes(keyword)        //쿼리스트링 keyword의 값이 boardList의 title 값에 포함되어 있는지 includes() 함수로 확인
//             })
//             res.send(result);                           //포함되어 있다면 해당 오브제그를 result에 넣어 응답으로 보내줌.
//         }
//         else if(type === 'user'){   //닉네임으로 게시글 검색    //만약 :type부분에 user/가 들어왔다면 닉네임으로 게시글 검색
//             const user_id = queryData.user_id;
//             const result = boardList.filter((e) => {
//                 return e.user_id === user_id;
//             });
//             res.send(result);
//         }
//         else{
//             res.send('Wrong URL');      //둘 중 하나라도 false라면 
//         }
//     }else{
//         res.send('Wrong API Key');
//     }
// });

// /* 서버와 포트 연결.. */
// app.listen(app.get('port'), () => {
//     console.log(app.get('port'), '번 포트에서 서버 실행 중..');
// });

const morgan = require('morgan');
const url = require('url');
const uuidAPIkey = require('uuid-apikey');

/* express app generate */
const express = require('express');
const app = express();

/* 포트 설정 */
app.set('port', process.env.PORT || 8080);

/* 공통 미들웨어 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 테스트를 위한 API키 */
const key = {
    apiKey: '3HX6327-VR944G2-K5E5CTW-4CHFDSP',
    uuid: '1c7a6188-de12-4240-995c-566b2322f6e6'
};

/* 테스트를 위한 게시글 데이터 */
let boardList = [];
let numOfBoard = 0;

/* 라우팅 설정 */
app.get('/', (req, res) => {
    res.send('This is api.js');
});

/* 게시글 API */
app.get('/board', (req, res) => {
    res.send(boardList);
});

app.post('/board', (req, res) => {
    const board = {
        "id": ++numOfBoard,
        "user_id": req.body.user_id,
        "date": new Date(),
        "title": req.body.title,
        "content": req.body.content
    };
    boardList.push(board);

    res.redirect('/board');
});

app.put('/board/:id', (req, res) => {
    // req.params.id 값 찾아 리스트에서 삭제
    const findItem = boardList.find((item) => {
        return item.id == +req.params.id
    });

    const idx = boardList.indexOf(findItem);
    boardList.splice(idx, 1);

    // 리스트에 새로운 요소 추가
    const board = {
        "id": +req.params.id,
        "user_id": req.body.user_id,
        "date": new Date(),
        "title": req.body.title,
        "content": req.body.content
    };
    boardList.push(board);

    res.redirect('/board');
});

app.delete('/board/:id', (req, res) => {
    // req.params.id 값 찾아 리스트에서 삭제
    const findItem = boardList.find((item) => {
        return item.id == +req.params.id
    });
    const idx = boardList.indexOf(findItem);
    boardList.splice(idx, 1);

    res.redirect('/board');
});

/* 게시글 검색 API using uuid-key */
app.get('/board/:apikey/:type', (req, res) => {
    let { type, apikey } = req.params;
    const queryData = url.parse(req.url, true).query;

    if (uuidAPIkey.isAPIKey(apikey) && uuidAPIkey.check(apikey, key.uuid)) {
        if (type === 'search') { // 키워드로 게시글 검색  
            const keyword = queryData.keyword;
            const result = boardList.filter((e) => {
                return e.title.includes(keyword)
            })
            res.send(result);
        }
        else if (type === 'user') { // 닉네임으로 게시글 검색  
            const user_id = queryData.user_id;
            const result = boardList.filter((e) => {
                return e.user_id === user_id;
            });
            res.send(result);
        }
        else {
            res.send('Wrong URL')
        }
    } else {
        res.send('Wrong API Key');
    }
});

/* 서버와 포트 연결.. */
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..')
});
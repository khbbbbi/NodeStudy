//간단한 게시판 API 서버 만들기

const morgan = require('morgan');

/* express app generate */
const express = require('express');
const app = express();

/* 포트 설정 */
app.set('port', process.env.PORT || 8080);

/* 공통 미들웨어 */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 테스트를 위한 게시글 데이터 */
let boardList = [];     //테스트를 위한 게시글 데이터를 boardList라는 전역변수에 리스트 형태로 저장함.(데베에 있는 정보라 생각하기)
let numOfBoard = 0;     //numOfBoard 변수는 게시글이 하나씩 추가될 때마다 늘어날 index를 위한 변수임.

/* 라우팅 설정 */
app.get('/', (req, res) => {
    res.send('This is api.js');
});

/* 게시글 API */
app.get('/board', (req, res) => {   //GET 메서드로 '/board'요청이 들어요면
    res.send(boardList);            //boardList에 저장된 값을 보여줌
});

app.post('/board', (req, res) => {  //POST 메서드로 '/board' 요청이 들어오면 게시글을 등록하는 API가 됨.
    const board = {                 //'board'객체에 req.body로부터 받아온 id, date, title, content 값을 저장(32~38행)
        "id": ++numOfBoard,
        "user_id": req.body.user_id,
        "date": new Date(),
        "title": req.body.title,
        "content": req.body.content 
    };
    boardList.push(board);          //이를 전역변수 boardList에 push해줌.

    res.redirect('/board');
});

app.put('/board/:id', (req, res) => {       //PUT 메서드로 '/board/:id'요청이 들어오면
    //req.params.id 값 찾아 리스트에서 삭제
    const findItem = boardList.find((item) => {
        return item.id == +req.params.id    //:id 값은 req.params.id에 저장됨.
    });

    const idx = boardList.indexOf(findItem);    //boardList 요소 중 id 값이 req.params.id와 같은 요소가 있다면 이를 findItem에 저장
    boardList.splice(idx, 1);       //해당 요소를 splice() 함수로 제거해줌.(첫번째인자부터 두번째인자까지의 인덱스만 남기고 나머지 요소 없애는 함수임.)

    //리스트에 새로운 요소 추가
    const board = {                 //req.params.id를 id로 한 새로운 게시글 데이터를 생성하고 boardList에 넣어줌.
        "id": +req.params.id,   
        "user_id": req.params.user_id,
        "date": new Date(),
        "title": req.body.title,
        "content": req.body.content
    };
    boardList.push(board);

    res.redirect('/board');
});

app.delete('/board/:id', (req, res) => {            //delete메서드로 '/board/:id'요청이 들오면
    //req.params.id 값 찾아 리스트에서 삭제     
    const findItem = boardList.find((item) => {     //:id 값과 동일한 boardList의 요소를 삭제함
        return item.id == + req.params.id
    });
    const idx = boardList.indexOf(findItem);
    boardList.splice(idx, 1);

    res.redirect('/board');
});

/* 서버와 포트 연결.. */
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중..');
});
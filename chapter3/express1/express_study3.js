const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    res.send('Hello World');
    next();
});

const middleware = (req, res) => {
    console.log("미들웨어 테스트");
};

app.use(middleware);

app.listen(8080);
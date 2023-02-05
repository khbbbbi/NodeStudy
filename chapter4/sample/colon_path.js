//내 API 서버 만들기

const express = require('express');
const app = express();

app.get('/:type', (req,res) => {
    let { type } = req.params;
    res.send(type);
});

app.listen(8080);
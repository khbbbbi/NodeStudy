const express = require('express');
const app = express();

app.use(function(req, res, next){
    console.log('Time:', Date.now());
    next();
});

app.use('/user/:id', (req, res) => {
    res.send('user 접속');
});

app.listen(8080);
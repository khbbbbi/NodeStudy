const WebSocket = require('ws');

module.exports = (server) => {
    const wss = new WebSocket.Server({ server });       /*먼저 클라이언트가 요청을 보내면 new WebSocket으로 웹 소켓 객체의 인스턴스를 생성해서
                                                        wss 변수에 넣어준다.*/
    wss.on('connection', (ws, req) => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;      /*Connection이 생성되면 req.headers와 
                                                                                        res.connection.remoteAddress를 통해 사용자의 IP를 알아낸다.*/
        console.log('New Client : ', ip);
        ws.on('message', (message) => {                 //그 후 IP와 클라이언트가 보낸 메시지를 서버 콘솔에 띄움.
            console.log(message);
        });
        ws.on('error', (err) => {
            console.error(err);
        });
        ws.on('close', () => {                          //연결이 종료되었다면.
            console.log('클라이언트 접속 해제', ip);
            clearInterval(ws.interval);                 //해당 Interval은 clearInterval로 제거해주어야함.
        });
        ws.interval = setInterval(() => {               // setIntervar 함수로 서버도 클라이언트에게 3초마다 메시지를 보냄.
            if(ws.readyState === ws.OPEN){              /* 비동기 처리로 인해 혹시 연결이 되지 않은 상태에서 메시지를 보내는 것을 
                                                        막기 위해 ws.readyState를 한번 체크해줌.*/
                ws.send('Message From Server');
            }
        }, 3000);
    });
};
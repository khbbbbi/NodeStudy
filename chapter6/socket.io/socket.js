//SocketIO 인스턴스 생성
const SocketIO = require("socket.io");

module.exports = (server) => {
    const io = SocketIO(server, { path: "/socket.io" });    //SocketIO 객체의 인스턴스를 생성하고 변수 io에 넣어줌, 두번째 인자로 path 넣어줌
    //index.js의 path와 동일하게!!

    io.on("connection", (socket) => {                       //io.on()을 통해connection을 생성하고 socket.on()을 통해 이벤트를 감지
        const req = socket.request;
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;  /*io.on()으로 Connection을 생성한뒤 콜백으로 넘겨지는 
                                                                                    socket은 내부에 request를 가지고 있어 이를 이용해 IP를 알아냄*/
        console.log(`New Client : ${ip}, socket.id : ${socket.id}`);        /* socket.io - 각 소켓에 고유한 ID를 부여해주는 것 특정 사용자에게만
                                                                            메시지를 보낸다든가 하는 기능을 만들 수 있음*/
        socket.on("disconnect", () => {
            console.log(`Client Out : ${ip}, socket.id : ${socket.id}`);
            clearInterval(socket.interval);
        });

        socket.on("error", (error) => { });

        socket.on("from client", (data) => {
            console.log(data);
        });

        socket.interval = setInterval(() => {
            socket.emit("from server", "Message From server");
        }, 3000);
    });
};
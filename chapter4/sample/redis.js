const redis = require('redis');     //require을 통해 불러오고 client 변수에 redis 서버를 담아줌
const client = redis.createClient(6379, '127.0.0.1');   //createClient 인자는 Redis 서버를 연결할 포트와 도메인, 기본 값은 6379포트와 내 지역 서버 

client.get('myKey', (err, value) => {   //Redis client 값을 얻어 오기 위해 get 함수 사용. 첫번째 인자=얻고 싶은 값의 키, 두번째 인자=콜백 함수
    console.log(value);
});
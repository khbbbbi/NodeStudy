//콜백 함수의 비동기 처리
setTimeout(() => {  //내장 함수 setTimeout(callback, delayTime)
    console.log('todo: Fist work!');
}, 3000);

setTimeout(() => {
    console.log('todo: Second work!');
}, 2000);

//결과
//todo: Second work!
//todo: Fist work!
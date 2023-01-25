//클로저의 개념
//클로저란? - 내부 함수가 외부 함수의 스코프(범위)에 접근할 수 있는 것을 말함.
//자바스크립트에서 스코프는 함수 단위로 생성되는데
/*
이 예제에서 inner()함수의 스코프가 outer()함수의 스코프를 참조하고 있고 outer()의 
실행이 끝나고 소멸된 이후에도 inner()함수가 outer()함수의 스코프에 접근할 수 있는 것을 '클로저'라함.
*/

function outer(){
    var a = 'A';
    var b = 'B';

    function inner(){
        var a = 'AA';
        console.log(b);
    }
    return inner;
}

var outerFunc = outer();
outerFunc(); //B

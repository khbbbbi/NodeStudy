//화살표 함수의 선언
const add = (a, b) => {
    return a+b;
}

console.log(add(1,4));  //5


//function의 arguments와 this
const func1 = function(){
	console.log(arguments);
}
func(1, 2, 3, 4);  

//화살표 함수의 경우
const func2 = (...args) => {
    console.log(args);
}
func(1,2,3,4);
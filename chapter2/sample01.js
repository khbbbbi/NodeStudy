//변수 호이스팅 - var사용
//var대신 let,const를 사용해야 하는 이유 : 변수 호이스팅과 function-lever-scope 때문

console.log(puppy); //변수를 선언하지 않고 호출해도 오류가아닌 undefined결과가나옴 = 변수 호이스팅
var puppy = "cute";
console.log(puppy);
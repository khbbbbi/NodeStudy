//function-level-scope의 사용 -> 전역변수에 원하지 않는 값을 덮어쓸 수 있는 문제점이 있음!
//function-level-scope란? - 블록 범위 내에서 선언한 변수는 함수 내에서만 인저앟고 함수 외부에서 선언한 변수는 모두 전역변수가 된다는 뜻

var puppy = "cute";
console.log(puppy); //cute
{
    var puppy = "so cute";
}
console.log(puppy); //so cute
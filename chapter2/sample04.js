//function-level-scope의 사용(2)
//let과 const는 block-levet-scope임. 4행의 puppy와 8행의 puppy는 이름만 같을 뿐 다른 변수임!!! (1반의 수진이와 4반의 수진이가 전혀 다른사람인것처럼!)
//블록을 기준으로 위와 아래는 전혀 다른 세상인 것!

let puppy = "cute";
{
    let  puppy = "so cute";
}
console.log(puppy); //cute

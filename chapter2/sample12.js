//this의 사용
var people = {
    name: 'gildong',
    say: function(){
        console.log(this);
    }
}

people.say();

var sayPeople = people.say;
sayPeople();
const mongoose = require("mongoose");
/* connecting */

mongoose        
    .connect("mongodb://127.0.0.1:27017/roadbook", {        //mongoose를 불러온 후 connect() 함수를 통해 데베와 연결을 시도
        // useNewUrlParser: true,
        // useCreateIndex: true
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

/* Defining Schema */
const customerSchema = mongoose.Schema({                //customer 스키마 정의 
    name: 'string',         //customerSchema 변수에 키와 타입을 정의하고 컬렉션 이름을 지정.
    age: 'number',
    sex: 'string'
},
    {
        collection: 'newCustomer'   
    }
);

/* Schema -> Model */
const Customer = mongoose.model('Schema', customerSchema);      //이렇게 생성한 스키마를 mongoose.model()을 이용해 모델로 변환해주고, 

/* Generate Instance */
const customer1 = new Customer({ name: '홍길동', age: 30, sex: '남' });     //그 모델로 인스턴스를 생성함. 이 인스턴스가 document가 됨.

/* Save Data into MongoDB */
customer1.save()        //마지막으로 save()함수를 이용해 생성한 인스턴스를 데베에 저장한다.
    .then(() => {
        console.log(customer1);
    })
    .catch((err) => {
        console.log('Error : ' + err);
    });
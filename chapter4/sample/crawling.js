/* axios, cherrio 모듈 불러오기 */
const axios = require("axios");
const cheerio = require("cheerio"); 

const getHtml = async () => {           //cheerio로 데이터를 가공해야하기 때문에 async/await와(5~7행)
    try {
        return await axios.get("https://roadbook.co.kr/category/%EC%8B%A0%EA%B0%84%EC%86%8C%EA%B0%9C");     //axios 모듈의 get()함수를 이용해 로드북 홈페이지의 신간안내 페이지의 html을 가져옴.
    } catch (error) {
        console.error(error);
    }
};

getHtml()
    .then(html => {         //cheerio로 데이터를 가공해야하기 때문에 promise의 .then()을 사용
        let ulList = [];
        const $ = cheerio.load(html.data);      //받은 html 데이터를 cheerio 객체로 변환하고 $ 변수 안에 넣어줌
        const $bodyList = $("div#searchList ol").children("li");    //내가 원하는 부분을 $bodyList 변수 안에 담아줌.
                                                                    /*id가 searchList인 div 태그를 의미하고 그 밑에 <ol>태그까지 지정해준 뒤
                                                                    children()함수를 이용해 <ol> 태그 밑에 있는 <li> 태그까지 지정해줌.*/
        $bodyList.each(function(i, elem) {      //each()함수는 배열을 순회하며 콜백 함수를 실행하는 함수. 
                                                /* 위에서 만든 $bodyList의 각각의 요소를 돌며 ulList에 넣어주는 역할. */
            ulList[i] = {
                bookList: $(this).find('a').text(),     //find함수를 통해 <a> 태그까지 지정해준 뒤 text()함수를 이용해 <a> 태그 안에 텍스트만 뽑음.
                url: $(this).find('a').attr('href')
            };
        });

        const data = ulList.filter(n => n.bookList);
        return data;
    })
    .then(res => console.log(res));
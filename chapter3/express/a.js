console.log('a.js 진입...!');

const b = require('./b');

module.exports = {
    call: () => {
        console.log('a.js에서 b호출 : ', b);
    }
};
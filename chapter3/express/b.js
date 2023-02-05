console.log('b.js 진입...!');

const a = require('./a');

module.exports = {
    call: () => {
        console.log('b.js에서 a 호출: ', a);
    }
};

/**
 * a.js진입...!
 * a.js에서 b 호출 :
 * b.js 진입..!
 */
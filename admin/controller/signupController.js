const signupService = require('../services/signupService');
const promise = require('bluebird');
const md5 = require('md5');
const jwt = require('jsonwebtoken')

// Admin 1 Created At time of server start
exports.signup1 = () => {
        promise.coroutine(function* () {
                var opts = [];
                opts.push('1')
                opts.push("admin1");
                opts.push("admin1@gmail.com");
                opts.push(md5("admin@1"));
                opts.push(createToken("admin1@gmail.com"));
                 yield signupService.signupService(opts);
        })();
}

//Admin 2 Created At the time of server start
exports.signup2 = () => {
        promise.coroutine(function* () {
                var opts = [];
                opts.push('2')
                opts.push("admin2");
                opts.push("admin2@gmail.com");
                opts.push(md5("admin@2"));
                opts.push(createToken("admin2@gmail.com"));
                 yield signupService.signupService(opts);
        })()
}

/**
 * @param {string} email 
 */ 
function createToken(email) {
        let tooken = {
                email: email
        }
        var token = jwt.sign({ tooken: tooken }, "privateKey");
        return token;
}

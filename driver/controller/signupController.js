const signupService = require('../services/signupService');
const promise = require('bluebird');
const md5 = require('md5');
const jwt = require('jsonwebtoken')
const response = require('../../services/response')
const constants = require('../../properties/constants')
const _ = require('underscore');

exports.signup = async (req, res) => {
        promise.coroutine(function* () {
                var opts = [];
                opts.push(req.body.name);
                opts.push(req.body.email);
                opts.push(md5(req.body.password));
                opts.push(req.body.phone_no);
                opts.push(createToken(req.body.email));
                opts.push(req.body.carnumber);
                opts.push(req.body.carname)
                var emailMessage=yield emailExist(req.body.email);
                if (!emailMessage) {
                        return response.sendError(res, constants.responseMessage.EMAIL_EXIST);
                }
                var phoneMessages=yield phoneExist(req.body.phone_no);
                if (!phoneMessages) {
                        return response.sendError(res, constants.responseMessage.PHONE_EXIST);
                }
        
                var result = yield signupService.signupService(opts);
                return response.signupSuccessful(res, constants.responseMessage.SIGNUP_SUCCESSFULLY);
        })();
}

function createToken(email) {
        let tooken = {
                email: email
        }
        var token = jwt.sign({ tooken: tooken }, "privateKey");
        return token;
}

//check for duplicate email
function emailExist(email) {
        return new Promise((resolve, reject) => {
                promise.coroutine(function *(){
                var opts = [];
                opts.push(email);
                var result = yield signupService.emailExist(opts);
                if (_.isEmpty(result)) {
                        resolve(true);
                }
                else {
                        resolve(false);
                }
        })()
})
}
//check for duplicate phone
function phoneExist(phone) {
        return new Promise((resolve, reject) => {
                promise.coroutine(function *(){
                var opts = [];
                opts.push(phone);
                var result = yield signupService.phoneExist(opts);
                if (_.isEmpty(result)) {
                        resolve(true);
                }
                else {
                        resolve(false);
                }
        })()
})
}
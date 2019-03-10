const signupService          =  require('../services/signupService');
const promise                =  require('bluebird');
const md5                    =  require('md5');
const jwt                    =  require('jsonwebtoken')
const response               =  require('../../services/response')
const constants              =  require('../../properties/constants')
const _                      =  require('underscore');

/**
 * @params {string} name, email password phone_no
 */
exports.signup = async (req, res) => {
        promise.coroutine(function* () {
                var opts = [];
                opts.push(req.body.name);
                opts.push(req.body.email);
                opts.push(md5(req.body.password));
                opts.push(req.body.phone_no);
                opts.push(createToken(req.body.email));
                let emailMessage = yield emailExist(req.body.email);
                if (!emailMessage) {
                        return response.sendError(res, constants.responseMessage.EMAIL_EXIST);
                }
                let phoneMessages = yield phoneExist(req.body.phone_no);
                if (!phoneMessages) {
                        return response.sendError(res, constants.responseMessage.PHONE_EXIST);
                }
                 yield signupService.signupService(opts);
                return response.signupSuccessful(res, constants.responseMessage.SIGNUP_SUCCESSFULLY);
        })();
}

/**
 * 
 * @param {String} email 
 */
function createToken(email) {
        let tooken = {
                email: email
        }
        var token = jwt.sign({ tooken: tooken }, "privateKey");
        return token;
}

// check email in database for duplicate entry

function emailExist(email) {
        return new Promise((resolve, reject) => {
                promise.coroutine(function* () {
                        var opts = [];
                        opts.push(email);
                        var result = yield signupService.emailExist(opts);
                        if (_.isEmpty(result)) {
                                resolve(true);
                        }
                        else {
                                reject(false);
                        }
                })()
        })
}

function phoneExist(phone) {
        return new Promise((resolve, reject) => {
                promise.coroutine(function* () {
                        let opts = [];
                        opts.push(phone);
                        var result = yield signupService.phoneExist(opts);
                        if (_.isEmpty(result)) {
                                resolve(true);
                        }
                        else {
                                reject(false);
                        }
                })()
        })
}
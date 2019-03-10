
const loginService = require('../services/loginService');
const promise = require('bluebird');
const md5 = require('md5');
const jwt = require('jsonwebtoken')
const response = require('../../services/response')
const constants = require('../../properties/constants')
const _ = require('underscore');

exports.login = async (req, res) => {
    promise.coroutine(function* () {
            var opts = [];
            opts.push(req.body.email);
            opts.push(md5(req.body.password));
            var result = yield loginService.loginService(opts);
            if(_.isEmpty(result))
            {
                return response.sendError(res,constants.responseMessage.LOGIN_FAILED);
            }
            return response.loginSuccessful(res, constants.responseMessage.LOGIN_SUCCESSFUL);
    })();
}

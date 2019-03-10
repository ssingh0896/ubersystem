const dbHandler = require('../../services/dbHandler')
const promise = require('bluebird');

exports.signupService = (opts) => {
    return new promise((resolve, reject) => {
        promise.coroutine(function* () {
            const query = 'INSERT INTO driver(name,email,password,phone_no,access_token,carnumber,carname) VALUES(?,?,?,?,?,?,?)';
            var result = yield dbHandler.dbHandlerPromise(query, opts)
            resolve(result)
        })();
    })
}

exports.emailExist = (opts) => {
    return new promise((resolve, reject) => {
        promise.coroutine(function* () {
            const query = 'SELECT * FROM driver WHERE email=?';
            var result = yield dbHandler.dbHandlerPromise(query, opts)
            resolve(result)
        })();
    })
}

exports.phoneExist = (opts) => {
    return new promise((resolve, reject) => {
        promise.coroutine(function* () {
            const query = 'SELECT * FROM driver WHERE phone_no=?';
            var result = yield dbHandler.dbHandlerPromise(query, opts)
            resolve(result)
        })();
    })
}
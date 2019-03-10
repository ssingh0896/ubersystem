const dbHandler = require('../../services/dbHandler')
const promise = require('bluebird');

exports.loginService = (opts) => {
    
    return new Promise((resolve, reject) => {
        promise.coroutine(function* () {
            const query = 'SELECT * FROM driver where email=? AND password=?';
            var result = yield dbHandler.dbHandlerPromise(query, opts)
            resolve(result)
        })();
    })
}

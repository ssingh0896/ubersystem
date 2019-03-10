const dbHandler = require('../../services/dbHandler')
const Promise = require('bluebird');


exports.loginService = (opts) => {
    return new Promise((resolve, reject) => {
        Promise.coroutine(function* () {
            const query = 'SELECT * FROM admin where email=? AND password=?';
            var result = yield dbHandler.dbHandlerPromise(query, opts)
            resolve(result)
        })();
    })
}

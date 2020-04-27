const dbHandler = require('../../services/dbHandler')
const Promise = require('bluebird');

exports.loginService = (opts) => {
    console.log("fsafsa")
    return new Promise((resolve, reject) => {
        Promise.coroutine(function* () {
            const query = 'SELECT * FROM customer WHERE email=? AND password=?';
            var result = yield dbHandler.dbHandlerPromise(query, opts)
            console.log(result)
            resolve(result)
        })();
    })
}

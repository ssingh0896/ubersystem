const dbHandler = require('../../services/dbHandler')
const Promise = require('bluebird');

exports.loginService = (opts) => {
    console.log("fsafsa")
    return new Promise((resolve, reject) => {
        console.log("saffsa")
        Promise.coroutine(function* () {
            const query = 'SELECT * FROM customer where email=? AND password=?';
            var result = yield dbHandler.dbHandlerPromise(query, opts)
            console.log(result)
            resolve(result)
        })();
    })
}

const dbHandler = require('../../services/dbHandler')
const promise = require('bluebird');

// customer signup query
exports.signupService = (opts) => {
    return new promise((resolve, reject) => {
        promise.coroutine(function* () {
            const query = 'INSERT INTO admin(id,name,email,password,access_token) VALUES(?,?,?,?,?)';
            var result = yield dbHandler.dbHandlerPromise(query, opts)
            resolve(result)
        })();
    })
}


const dbHandler    = require('../../services/dbHandler')
const promise      = require('bluebird');

// function for taking user id from given access_token
/**
 * @params {string} access_token
 */
exports.userDetail = (opts) => {
    return new Promise((resolve, reject) => {
        promise.coroutine(function* () {
            var values=[];
            values.push(opts);
            const query = 'SELECT id FROM customer where access_token=?';
            var result = yield dbHandler.dbHandlerPromise(query, values)
            resolve(result)
        })();
    })
}


exports.insertBookingDetail = (opts) => {
    return new Promise((resolve, reject) => {
        promise.coroutine(function* () {
            const query = 'INSERT INTO booking(customerid,bookingstatus,tolat,tolon,fromlat,fromlon) VALUES(?,?,?,?,?,?)';
            let result = yield dbHandler.dbHandlerPromise(query, opts)
            resolve(result)
        })();
    })
}

exports.bookingExist=(opts)=>{
    return new Promise((resolve, reject)=>
    {
        promise.coroutine(function * (){
            const query="SELECT bookingstatus from booking where customerid=?";
            let result= yield dbHandler.dbHandlerPromise(query,opts)
            resolve(result);
        })()
    })
}
exports.ratings=(opts)=>
{
    return new Promise((resolve,reject)=>
    {
    promise.coroutine(function *()
    {
        const query='UPDATE booking, SET rating=? , feedback =? WHERE customerid= ? AND  bookingstatus=1'
        let result = yield dbHandler.dbHandlerPromise(query,opts)
        resolve(result); 
    })()
})
}
exports.customerDetails = (tokan)=>
{
    return new Promise((resolve,reject)=>{
    promise.coroutine(function *()
    {
        const query1="SELECT id FROM customer WHERE access_token=?"
        let result= yield dbHandler.dbHandlerPromise(query1,tokan)
        resolve(result[0].id); 
    //console.log(result[0].id)
    })()
})
}
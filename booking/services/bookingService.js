
const dbHandler = require('../../services/dbHandler')
const promise = require('bluebird');

// function for taking user id from given access_token
/**
 * @params {string} access_token
 */
exports.userDetail = (opts) => {
    return new Promise((resolve, reject) => {
        promise.coroutine(function* () {
            var values = [];
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
            const query = 'INSERT INTO booking(customerid,from_latitude,from_longitude,to_latitude,to_longitude) VALUES(?,?,?,?,?)';
            let result = yield dbHandler.dbHandlerPromise(query, opts)
            resolve(result)
        })();
    })
}

exports.bookingExist = (opts) => {
    return new Promise((resolve, reject) => {
        promise.coroutine(function* () {
            const query = "SELECT bookingstatus from booking where customerid=?";
            let result = yield dbHandler.dbHandlerPromise(query, opts)
            resolve(result);
        })()
    })
}
exports.ratings = (opts) => {
    return new Promise ((resolve, reject) => {
        promise.coroutine(function *(){
        const query = `UPDATE booking SET rating=? , feedback =? WHERE bookingid= ?`
        let result = yield dbHandler.dbHandlerPromise(query, opts)
        resolve(result);
    })()
    })
}
exports.customerDetails = (tokan) => {
    return new Promise((resolve, reject) => {
        promise.coroutine(function* () {
            const query1 = "SELECT id FROM customer WHERE access_token=?"
            let result = yield dbHandler.dbHandlerPromise(query1, tokan)
            resolve(result[0].id);
        })()
    })
}
exports.avgRatingUpdate = (booking_id,ratings) => {
    return new Promise(async (resolve, reject) => {
        promise.coroutine(function* (){
        const query1 = 'SELECT driverid,rating FROM booking WHERE bookingid=?';
        let id = yield dbHandler.dbHandlerPromise(query1, booking_id);
        const query2 = `SELECT no_of_trips, avg_rating FROM driver WHERE id=${id[0].driverid}`
        let rating = yield dbHandler.dbHandlerPromise(query2)
        const avgrating = (((rating[0].no_of_trips - 1) * rating[0].avg_rating)+ ratings) / rating[0].no_of_trips;
        const query = `UPDATE driver SET avg_rating=${avgrating} WHERE id=${id[0].driverid}`
        let result = yield dbHandler.dbHandlerPromise(query)
        resolve(result);
    })()
})
}
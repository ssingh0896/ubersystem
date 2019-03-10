 
// File to create connection of mongo db with node js 

const MongoClient = require('mongodb').MongoClient;
const Boom = require("boom")

// Use connect method to connect to the Server 
initialize = () => {
    return new Promise((resolve, reject) => {
        const url = 'mongodb://localhost:27017';
        const dbName = 'taxi';
        const client = new MongoClient(url, { useNewUrlParser: true });
        
        client.connect(async function (err, client) {
            if (err)
                return reject(err);
                console.log("mongo connected")
            return resolve(client.db(dbName));
            

        });
    })

}
//const dbo = require('./mongodb')
//const Boom = require('boom');

 exports.mongo =async ()=> {
     db = await initialize()
 }

 
// To store booking id,admin id,driverid and assign date 
 
exports.logData = (driverID, bookingID) => {
    return new Promise((resolve, reject) => {
        db.collection('log').insertOne({ "booking_id": bookingID, "driver_id": driverID, "date": Date() }, function (err, data) {
            if (err) {
                return reject(Boom.badImplementation("Implementation error").output.payload);
            }
            resolve(data);
        });
    })
} 

  
 //Add time when driver marked booking as complete 

exports.addCompletionTime = (driverID, bookingID) => {
    return new Promise((resolve, reject) => {
        db.collection('log').updateOne({ "booking_id": bookingID }, { $set: { "completion_time": Date() } }, { upsert: false }, function (err, data) {
            if (err) {
                return reject(Boom.badImplementation("Implementation error").output.payload);
            }
            resolve(data);
        })
    })
}


//All the services using by admin

const promise = require("bluebird")
const dbHandler = require("../../services/dbHandler")
const mongoHandler = require("../../services/mongoHandler")



exports.getAllCustomer = (req, res) => {
   promise.coroutine(function* () {
      const query = 'SELECT * FROM customer';
      let result = yield dbHandler.dbHandlerPromise(query)
      res.send(result[0].name)

   })()
}

exports.getNumber= (customerid)=>{
  query=`SELECT phone_no FROM customer WHERE id=${customerid}`
   let result=dbHandler.dbHandlerPromise(query)
   return result;
}
exports.getAllDrivers = (req, res) => {
   promise.coroutine(function* () {
     

      let query=`SELECT name, avg_rating FROM driver`
      var result = yield dbHandler.dbHandlerPromise(query)

      res.send(result)
   })()
}


// Get those driver Whose status = 0 
exports.getfreeDriver = (req, res) => {
   promise.coroutine(function* () {
      const query = 'SELECT id FROM driver where status=0';
      var result = yield dbHandler.dbHandlerPromise(query)
      res.send(result)
   })()
}


// Get those customer Whose bookingstatus = 0 
exports.getfreeCustomer = (req, res) => {
   promise.coroutine(function* () {
      const query = 'SELECT customerid FROM booking where bookingstatus=0';
      var result = yield dbHandler.dbHandlerPromise(query)
      res.send(result)
   })()
}


// Admin assign driver to customer
exports.assignBooking = (customerid,driverid) => {
   return new Promise((resolve, reject) => {
      promise.coroutine(function* () {

            const query = `UPDATE booking b,driver d SET b.bookingstatus=1, b.driverid=${driverid} ,d.status=1 WHERE d.id=${driverid} AND b.customerid=${customerid}`; 
            let result = yield dbHandler.dbHandlerPromise(query)
            const query1 = `SELECT bookingid FROM booking WHERE driverid=${driverid} AND bookingstatus=1`; 
            let id = yield dbHandler.dbHandlerPromise(query1)
            console.log(id)
            if(result.changedRows==0)
            reject({
               "msg":"error during driver assinging"
            })
            else
            resolve(id);
            //mongoHandler.logData(driverid, bookingid);
      })()
   })
}

exports.sendOtp=(no)=>
{
    let code=otp.generate(4, { digits:true,alphabate:false,upperCase: false, specialChars: false });
   
    const accountSid = 'AC7c62f9f023b6af8a5f71ba94acdd54ab';
const authToken = '39486e44e5cb96addefe1c6f8a8674b8';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: `Ur otp for booking ${code}`,
     from: '+19547906415',
     to: no
   })
}

// Get all booking details using cross join
exports.getAllBookingDetails = () => {
   return new Promise((resolve, reject) => {
      promise.coroutine(function* () {
         const query = "SELECT booking.bookingid,booking.customerid,booking.driverid,booking.bookingstatus,booking.from_latitude,booking.from_longitude,booking.to_latitude,booking.to_longitude,customer.name,driver.name,driver.carnumber, driver.carname FROM booking,customer,driver WHERE booking.customerid=customer.id AND booking.driverid=driver.id";
         let result = yield dbHandler.dbHandlerPromise(query);
         resolve(result)
      })()
   })
}
exports.getNearDriver=()=>
{
   return new Promise((resolve,reject)=>
   {
      const query=`SELECT d.id,d.name, 
      111.111 * 
      DEGREES(ACOS(LEAST(COS(RADIANS(d.latitude)) 
      * COS(RADIANS(b.to_latitude)) 
      * COS(RADIANS(d.Longitude - b.to_longitude)) 
      + SIN(RADIANS(d.latitude)) 
      * SIN(RADIANS(b.to_latitude)), 1.0))) AS distance_in_km 
      FROM driver AS d 
      JOIN booking AS b ON d.id = b.driverid`;
      let result= dbHandler.dbHandlerPromise(query);
      resolve(result);
   })
}
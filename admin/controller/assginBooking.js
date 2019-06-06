const jwt = require("jsonwebtoken");
const adminservices = require("../services/adminservice")
const response = require("../../services/response")
const constants = require("../../properties/constants")
const promise = require("bluebird")

/**
 * @function admin book driver to customer
 * @params {string} access_token
 * @return {objet}  DRIVER_ASSIGNED
 */
exports.assignBooking = (req, res) => {
    promise.coroutine(function* () {
        var access_token = req.body.access_token;
        try {
            jwt.verify(access_token, "privateKey")
        }
        catch (error) {
            return response.sendError(res, constants.responseMessage.INVALID_ACCESS_TOKEN);
        }
        let customerid = req.body.customerid;
        let driverid = req.body.driverid;
        
        //let no = yield adminservices.getNumber(customerid)
        let no='+919304319196'
        let result1 = adminservices.sendOtp(no)
        let result = yield adminservices.assignBooking(customerid, driverid);
        res.send({
            "Message": "DriverAssinged",
            "Status": "200",
            "Data": "your booking id " + result[0].bookingid
        })
        
    })()
    .catch(err => { 
        res.send(err)})
    
}


// get All Booking Details Along with customer and Driver
exports.getAllBookingDetails = (req, res) => {
    promise.coroutine(function* () {
        let result = yield adminservices.getAllBookingDetails();
        res.send(result);
    })()
}

exports.getNearDrivers = (req, res) => {
    promise.coroutine(function* () {
        let result = yield adminservices.getNearDriver();
        console.log(result)
        res.send(result)
    })()
}

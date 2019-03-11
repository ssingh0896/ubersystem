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
exports.assignBooking=(req, res)=>
{
    promise.coroutine(function * ()
    {
        var access_token = req.body.access_token;
        try 
        {
          jwt.verify(access_token,"privateKey")
        }
        catch (error) {
            return response.sendError(res, constants.responseMessage.INVALID_ACCESS_TOKEN);
        }
        let customerid= req.body.customerid;
        let driverid= req.body.driverid;
        
         yield adminservices.assignBooking(customerid,driverid);
         return response.actionCompleteResponse(res, constants.responseMessage.DRIVER_ASSINGED)
    })().catch(err=>res.send(err))
}


// get All Booking Details Along with customer and Driver
exports.getAllBookingDetails=(req,res)=>
{
    promise.coroutine(function * (){
       let result= yield adminservices.getAllBookingDetails();
       res.send(result);
    })()
}


const promise           = require("bluebird")
const bookingcomplete   = require("../services/bookingservices")
const response          = require("../../services/response")
const constants         = require("../../properties/constants")
const jwt               = require("jsonwebtoken")

exports.completeBooking=(req, res)=>
{
    promise.coroutine(function *()
    {
        const access_token = req.body.access_token;
        try {
            jwt.verify(access_token, "privateKey");
        }
        catch (error) {
            return response.sendError(res, constants.responseMessage.INVALID_ACCESS_TOKEN);
        }
        let driverid = yield bookingcomplete.driver_id(access_token);
        yield bookingcomplete.bookingComplete(driverid[0].id);
        return response.actionCompleteResponse(res,constants.responseMessage.BOOKING_DONE)
    })().catch(err=>res.send(err))
}

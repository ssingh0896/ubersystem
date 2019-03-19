const promise        =  require('bluebird')
const jwt            =  require('jsonwebtoken');
const response       =  require('../../services/response');
const bookingService =  require('../services/bookingService')
const constants      =  require('../../properties/constants')

/**
 * @params {string} access_token userDetails tolat, tolon, fromlat, fromlon
 * 
 */

exports.booking = (req, res) => {
    promise.coroutine(function* () {
        var opts = [];
        var access_token = req.body.access_token;
        try {
            jwt.verify(access_token, "privateKey");
        }
        catch (error) {
            return response.sendError(res, constants.responseMessage.INVALID_ACCESS_TOKEN);
        }
        let userDetail = yield bookingService.userDetail(access_token);
        opts.push(userDetail[0].id)
        opts.push(req.body.tolat);
        opts.push(req.body.tolon);
        opts.push(req.body.fromlat);
        opts.push(req.body.fromlon);
        if(!checkBookingHistory)
        {
            res.send({
                "Message":"Not Allow to Book Ride",
                "Status":"400"
            })
        }
        else{
        yield bookingService.insertBookingDetail(opts);
        return response.actionCompleteResponse(res, constants.responseMessage.BOOKING_DONE);
        }
    })()
}

function checkBookingHistory(id)
{
    return new Promise((resolve, reject)=>
    {
        promise.coroutine(function *(){
            let opts=[]
            opts.push(id)
            var result = yield bookingService.bookingExist(opts);
                        if (result[0].bookingstatus!=0) {
                                resolve(true);
                        }
                        else {
                                reject(false);
                        }
        })()
    })
}

exports.rating=(req,res)=>
{
    promise.coroutine(function* ()
    {
        let opts=[]
        let tokan= req.body.access_tokan;
        let booking_id=req.body.booking_id;
        let rating= req.body.rating;
        let feedback=req.body.feedback;
        let customerid= yield bookingService.customerDetails(tokan)
        console.log(customerid)
        if(rating>5)
        {
            res.send(
                {
                    "Message":"Please give rating between 1-5",
                    "status":"400"
                }
            )
        }
        opts.push(rating,feedback,booking_id,customerid);

        yield bookingService.ratings(opts)
        yield bookingService.avgRatingUpdate(booking_id,rating)


        res.send({
            "Message":"Thank you for your ratings",
            "status":"200"
        })
    })()
}




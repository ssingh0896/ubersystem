const constants=require('../properties/constants');


exports.actionCompleteResponse=(res,msg)=>{
    var data={
        data:msg,
        message:constants.responseMessage.ACTION_COMPLETE
    }
    res.status(constants.responseFlags.ACTION_COMPLETE).send(data);
}

exports.sendError=(res,msg)=>{
    var data={
        data:msg,
        message:constants.responseMessage.ERROR
    }
    res.status(constants.responseFlags.ERROR).send(data);
}

exports.loginSuccessful=(res,msg)=>{
    var data={
        data:msg,
        message:constants.responseMessage.ACTION_COMPLETE
    }
    res.status(constants.responseFlags.ACTION_COMPLETE).send(data);
}
exports.signupSuccessful=(res,msg)=>{
    var data={
        data:msg,
        message:constants.responseMessage.SIGNUP_SUCCESSFULLY
    }
    res.status(constants.responseFlags.SIGNUP_SUCCESSFULLY).send(data);
}
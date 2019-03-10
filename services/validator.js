const Joi=require('joi');
const response=require('./response')

// Schema validation function
exports.validate=(res,msg,schema)=>{
var validate=Joi.validate(msg, schema);
  if(validate.error){
    let errorReason=validate.error.details!=undefined?
    validate.error.details[0].message:"Parameter Missing or Parameter type is Problem";
    response.sendError(res,errorReason);
    return false;
  }
  return true;
}
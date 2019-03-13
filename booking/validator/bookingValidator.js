const Joi     =     require("joi");
const validation=require('../../services/validator');

// schema for booking validation
exports.validation= (req,res,next)=>
{
    const schema= Joi.object().keys({
        access_token: Joi.string().required(),
        tolat:Joi.number().required(),
        tolon:Joi.number().required(),
        fromlat:Joi.number().required(),
        fromlon:Joi.number().required()
    })
    var result=validation.validate(res,req.body,schema);
    if(result==true)
    {
      next();
    }
}
exports.rating = (req,res,next)=>
{
  const schema=Joi.object().keys({
    access_tokan:Joi.string().required(),
    booking_id:Joi.number().required(),
    rating:Joi.number().required(),
    feedback: Joi.string()
  })
  var result =validation.validate(res,req.body,schema);

  if(result==true)
  {
    next();
  }
} 
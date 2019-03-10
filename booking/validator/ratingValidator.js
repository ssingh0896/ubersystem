
const Joi     =     require("joi");
const validation=require('../../services/validator');

exports.rating = (req,res,next)=>
{
  const schema=Joi.object().keys({
      access_tokan:Joi.string().required(),
    rating:Joi.number().required(),
    feedback: Joi.string()
  })
  var result =validation.validate(res,req.body,schema);

  if(result==true)
  {
    next();
  }
} 
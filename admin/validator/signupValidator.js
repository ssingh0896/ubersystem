
const Joi     =     require("joi");
const validation=require('../../services/validator');

//schema for signup
exports.validation= (req,res,next)=>
{
  console.log(req.body);
    const schema= Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email({minDomainAtoms: 2}).required(),
        password:Joi.string().required()
    })
    var result=validation.validate(res,req.body,schema);
    if(result==true)
    {
      next();
    }
}


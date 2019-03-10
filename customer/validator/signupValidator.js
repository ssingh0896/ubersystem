
const Joi     =     require("joi");
const validation=require('../../services/validator');

exports.validation= (req,res,next)=>
{
    const schema= Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email({minDomainAtoms: 2}).required(),
        password:Joi.string().required(),
        phone_no:Joi.string().required()
    })
    var result=validation.validate(res,req.body,schema);
    if(result==true)
    {
      next();
    }
}


const Joi     =     require("joi");
const validation=require('../../services/validator');

// schema for login 
exports.validation= (req,res,next)=>
{
    const schema= Joi.object().keys({
        email: Joi.string().email({minDomainAtoms: 2}).required(),
        password:Joi.string().required()
    })
    var result=validation.validate(res,req.body,schema);
    if(result==true)
    {
      next();
    }
}


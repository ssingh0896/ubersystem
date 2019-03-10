const Joi     =     require("joi");
const validation=require('../../services/validator');
exports.validation= (req,res,next)=>
{
    const schema= Joi.object().keys({
        email: Joi.string().email({minDomainAtoms: 2}).required(),
        password:Joi.string().required()
    })
    var result=validation.validate(res,req.body,schema);
    console.log(result);
    if(result==true)
    {
      next();
    }
}


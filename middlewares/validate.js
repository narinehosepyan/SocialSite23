const Joi = require('@hapi/joi');

const validateRegister=(req,res,next)=>{
    try{
        let Schema=Joi.object({
            username:Joi.string().min(3).max(100).required(),
            email:Joi.string().min(3).max(100).required().email(),
            password:Joi.string().min(6).max(100).required(),
        })
          let {error}= Schema.validate(req.body);
           if(error){
               return res.json({error:error.details[0].message})
           }
           next()
       }catch(err){
           console.log(err);
           res.json({error:err.message})
       }
   }

   const validateLogin=(req,res,next)=>{
    try{
     let Schema=Joi.object({
         email:Joi.string().min(3).max(100).required().email(),
         password:Joi.string().min(6).max(100).required(),
     })
       let {error}= Schema.validate(req.body);
        if(error){
            return res.json({error:error.details[0].message})
        }
        next()
    }catch(err){
        console.log(err);
        res.json({error:err.message})
    }
}
    



module.exports={
    validateRegister,
    validateLogin
}
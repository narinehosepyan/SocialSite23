const jwt=require('jsonwebtoken');
require('dotenv').config();

const verifyToken=(req,res, next)=>{

    if(req.headers["authorization"]){
       try{ 
        let token=req.headers["authorization"].split(" ")[1];
   
        jwt.verify(token,process.env.jwtSecret,(err,decoded)=>{
            if(err){
              return  res.json({error:err.message})
            }
            req.user=decoded;
            next()
        })

     }catch(err){
        res.json({error:err.message})
     }


    }else{
        res.json({error:" token not provided"})
    }
    
}

module.exports={
    verifyToken
}
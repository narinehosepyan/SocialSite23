const{UserModel}=require("../models/UserModel");

const checkEmailUnique=async (req,res,next)=>{
    try{
        let user=await UserModel.findOne({email:req.body.email});
        if(user){
        return   res.json({error:`${user.email} is taken`})
        }
        next()

    }catch(err){
        console.log(err);
        res.json({error:err.message})
    }

}



module.exports={
    checkEmailUnique
}
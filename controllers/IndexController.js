const { UserModel } = require("../models/UserModel");
const {PostModel} = require("../models/PostModel")

class IndexController{
    indexView(req,res){
        res.render('index')

    }
    async  homeInfo(req,res){
        let user=await  UserModel.findOne({_id:req.user.id}).select("image username");
        let posts=await PostModel.find().populate('author');
        console.log(7,req.user);
        let userInfo={
            id:req.user.id,
            username:user.username,
            image:user.image
        }
        res.json({userInfo,posts})
    }

    async profileView(req,res){
        let id=req.params.id;
        let profileInfo=await UserModel.findById(id);

        // we are rendering profile.ejs and sent profileInfo as object
         res.render('profile',{profileInfo})
    }

    /*create changePhoto handler */

    async changePhoto(req,res){
        try{
         if(req.file){
            let user= await UserModel.findById(req.user.id).select('image'); 
            let oldImageName=user.image
            user.image=req.file.filename;
            
            await user.save();
            res.json({imageName:req.file.filename});
            if(oldImageName!=="default.png"){
                fs.unlinkSync(path.join(__dirname,"..","/public/images/",oldImageName))
            }
         
 
         }else{
             res.json({error:`file do not attached or do not match require type,please attach jpg,png`})
         }   
         
 
        }catch(err){
            console.log(err);
            res.json({error:err.message})
        }
     }  
}
module.exports=new IndexController();
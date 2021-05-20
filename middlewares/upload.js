const multer=require('multer');
const path=require('path');
const sharp=require('sharp');
const fs=require('fs')

let Storage=multer.diskStorage({
    /*where store the image*/
    destination:path.join(__dirname,"..","/public/images/uploads/"),
    filename:(req,file,cb)=>{
        cb(null, Date.now() +file.originalname)
    }
})

/*we decide what keep in multer*/
let upload=multer({
    storage:Storage,
    limits:2*1024*1024, /*2 Mbit*/
    fileFilter:(req,file,cb)=>{
       if(file.mimetype.startsWith('image')){
           cb(null,true)
       }else{
           cb(null,false)
       } 
 
    }

    /*if we want the multer become the middleware
     we will rename it single */
}).single('profileImg');//sent attached file name


const imageResizer=async (req,res,next)=>{
    try {
        if(req.file){
            let {path,filename}=req.file
            await sharp(path).
            resize(200,200,{
                fit:"cover",
                position:"center"
            }).jpeg({quality:100})
            .toFile(__dirname+"/../public/images/"+filename)
            .then(()=>{
                fs.unlinkSync(path)
                next()
            }).catch(err=>{
                next(err)
            })

        }else{
            next()
        }
        
    } catch (err) {
        next(err)
    }
}


module.exports={
    upload,
    imageResizer
}
const {Schema,model}=require(`mongoose`);

let PostSchema=new Schema({
    content:{
        type:String,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"user"       
    },
 
},{
    timestamps:true
})

let PostModel=model(`post`,PostSchema);

module.exports={
    PostModel
}
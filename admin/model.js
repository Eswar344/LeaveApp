var mongoose=require('mongoose')

var AdminSchema=mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
        minlength:8
    },
})


module.exports=mongoose.model("admin",AdminSchema)
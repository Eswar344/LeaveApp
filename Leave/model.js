var mongoose=require('mongoose')

var leaveSchema=mongoose.Schema({
    Address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees',
        required:true
    },
    Indate:{
        type:Number,
        required:true
    },
    Outdate:{
        type:Number,
        required:true
    },
    Reason:{
        type:String,
        required:true
    }
},{timestamps:true})
const LeaveModel=mongoose.model("Leave",leaveSchema)
module.exports=LeaveModel
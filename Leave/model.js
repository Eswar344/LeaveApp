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
    Holidays:{
        type:Number,
        default:0
    },
    Reason:{
        type:String,
        required:true
    },
    LeaveStatus:{
        type:String,
        default: 'NEW',
        enum: ['NEW', 'ACCEPTED', 'DECLINED']
    }
    
})
const LeaveModel=mongoose.model("Leave",leaveSchema)
module.exports=LeaveModel
var express=require('express')
var LeaveModule=require('./module')

var router=express.Router()

router.post('/apply',async(req,res,next)=>{
    try
    {
        const {Indate,Outdate,Reason}=req.body
        if (!Reason || !Indate || !Outdate) {
            throw new Error("please complete all the details")
        }
        if (!Reason){
            throw new Error("Please fill the Reason Field")
        }
        let createLeave= await LeaveModule.createLeave(req.body,req.employee.id)
        return res.status(200).send({createLeave})
    }
    catch(err)
    {
        next(err)
    }
})
module.exports=router
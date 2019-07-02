let adminModule=require('./module')
let express=require('express')
let adminAuth=require('./../adminAuth')
let router=express.Router()

router.use('/display',adminAuth,async(req,res,next)=>{
    let List = await adminModule.displayList();
    res.status(200).send(List)
})
router.use('/login',async(req,res,next)=>{
    console.log(req.body)
    let {email,password}=req.body
    let token=await adminModule.checkadmin(email,password)
    res.send(token)
})
module.exports=router
const adminModule=require('./module')
const express=require('express')
const adminAuth=require('./../adminAuth')
const router=express.Router()

router.post('/login',async(req,res,next)=>{
    const {email,password}=req.body
    const token=await adminModule.checkadmin(email,password)
    res.send({token})
})
router.get('/display',adminAuth,async(req,res,next)=>{
    const List = await adminModule.displayLeavesList(req.query);
    res.status(200).send(List)
})
router.post('/accept',adminAuth,async(req,res,next)=>{
    const {id}=req.query
    const Accept=await adminModule.AcceptOne(id)
    res.status(200).send(Accept)
})
router.post('/reject',adminAuth,async(req,res,next)=>{
    const {id}=req.query
    const Reject=await adminModule.RejectOne(id)
    res.status(200).send(Reject)
})
router.post('/acceptAll',adminAuth,async(req,res,next)=>{
    const {IdList}=req.body
    const AccptedAll = await adminModule.AcceptAll(IdList)
    res.status(200).send(AccptedAll)
})
router.post('/rejectAll',adminAuth,async(req,res,next)=>{
    const {IdList} = req.body
    const RejectedAll = await adminModule.RejectAll(IdList)
    res.status(200).send(RejectedAll)
})


module.exports=router
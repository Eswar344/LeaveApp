var express=require('express')
var employeeModule=require('./module')

var router=express.Router()

router.post('/register',async(req,res,next)=>{
    try
    {
        const {name,email,password,address,phone}=req.body
        if (!name || !password || !email ||!address ||!phone) {
            throw new Error("please complete all the details")
        }
        const existingName =await employeeModule.findByQuery({name})
        if (existingName.length) {
            throw new Error("Name already taken")
        }
        const existingUserEmail = await employeeModule.findByQuery({email})
        if (existingUserEmail.length) {
            throw new Error("Email already taken")
        }
        let createEmployee= await employeeModule.createAccount(req.body)
        return res.status(200).send({createEmployee})
    }
    catch(err)
    {
        next(err)
    }
})
router.post("/login",async(req,res,next)=>{
    try {
        const { email, password } = req.body
        const token = await employeeModule.login(email, password);
        return res.status(200).send({ token });
    } catch (error) {
        next(error)
    }
})
router.post("/forgot",async(req,res,next)=>{
    try{
        const {email,password,confirm}=req.body
        let setting=await employeeModule.setpassword(email,password,confirm)
        res.status(200).send(setting)
    }
    catch(error){
        next(error)
    }
})
module.exports=router
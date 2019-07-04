var express=require('express')
var employeeModule=require('./module')
var employeeAuth=require('./../auth')
var multer=require('multer')
var path=require('path')

var router=express.Router()

router.post('/register',async(req,res,next)=>{
    try
    {   let createEmployee= await employeeModule.createAccount(req.body)
        return res.status(200).send({createEmployee})
    }
    catch(err)
    { next(err)}
})
router.get("/login",async(req,res,next)=>{
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
router.get('/leavestatus',employeeAuth,async(req,res,next)=>{
    const {id}=req.employee
    const Status = await employeeModule.Leaveprofile(id)
    res.status(200).send(Status)
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/Images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'-'+file.originalname)
    }
  })
   


const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg'||file.mimetype === 'image/png')
    {cb(null,true)}
    else
    { cb(null,false) }
}
var upload = multer({ 
    storage: storage ,
    limits:{fileSize:1024*1024*5 },
    fileFilter:fileFilter
    })
// const upload=multer({
//     storage:storage,
//     limits:{
//         fileSize:1024*1024*5
//     },
//     fileFilter:fileFilter
// })

router.post('/upload',upload.single('profileImage'),(req,res,next)=>{
    res.status(200).send({message:"Successfully uploaded"})
})

module.exports=router
let employeesModel=require('./../employees/model')
let leaveModel=require('./../Leave/model')
let adminModel=require('./model')
var bcrypt = require('bcryptjs');
var jwt=require('jsonwebtoken')
const salt=10

async function default_setting(){
    const checkExisting_Admin = await adminModel.find({}).exec;
    if (checkExisting_Admin.length==0) {
        adminModel.create({
            email:"admin@gmail.com",
            password:bcrypt.hashSync("admin123",salt)
        })
    }
}
default_setting()

const displayList=async()=>{
    const list=await leaveModel.find({}).select("Address Indate Outdate Reason").populate("Address","address").exec()
    .then(docs=>{
         return {
         count:docs.length,
         LeaveStatus: docs.map(ele=>{
             return {
                _id:ele._id,
                Indate:ele.Indate,
                Outdate:ele.Outdate,
                Reason:ele.Reason,
                address:ele.Address.address
                }
            })
         }
     })
    return list
}
const checkadmin=async(email,password)=>{
   
    let data=await adminModel.find({}).exec()
   let [admin_data] =await adminModel.find({email}).exec()
   if(!admin_data)
   {
       throw new Error("Invalid email")
   }
   if(!(bcrypt.compareSync(password ,admin_data.password))){
       throw new Error("Invalid password")
   }
   return await encode(admin_data.id,email)
}
async function findByQuery(ele){
    return await adminModel.find({...ele}).exec()
}
const encode=async(id,email)=>{
    const token=jwt.sign({id,email},process.env.JWT_SECRET,{
        expiresIn:"10 days"
    })
    return token
}
const decode=async(token)=>{
    const payload=jwt.verify(token,process.env.JWT_SECRET)
    return payload
}

module.exports={displayList,checkadmin,decode,findByQuery}
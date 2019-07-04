let employeesModel=require('./../employees/model')
let leaveModel=require('./../Leave/model')
let adminModel=require('./model')
var bcrypt = require('bcryptjs');
var jwt=require('jsonwebtoken')
const salt=10

async function adminSetUp(){
    const checkExisting_Admin = await adminModel.find({}).exec;
    if (checkExisting_Admin.length==0) {
        adminModel.create({
            email:"admin@gmail.com",
            password:bcrypt.hashSync("admin123",salt)
        })
    }
}
adminSetUp()

const searched_query=async(search_query)=>{
    let search={}
    let {Holidays}=search_query
    if(Holidays){
        search['Holidays']=Holidays
    }
    return search
}
const displayLeavesList=async(search_query)=>{
    const search=await searched_query(search_query)
    const list=await leaveModel.find({...search,LeaveStatus:'NEW'}).select("Address Indate Outdate Reason Holidays").populate("Address").exec()
    return {TotalCount:list.length,
        LeaveStatus:list.map(ele=>{
             return {
                id:ele._id,
                Indate:new Date(Number(ele.Indate)).toString(),
                Outdate:new Date(Number(ele.Outdate)).toString(),
                Reason:ele.Reason,
                Holidays:ele.Holidays,
                Address:ele.Address.address
            }
        })
    }
}
const AcceptOne=async(id)=>{
    return await leaveModel.findByIdAndUpdate(id,{$set:{LeaveStatus:'ACCEPTED'}}).exec()
}
const RejectOne=async(id)=>{
    return await leaveModel.findByIdAndUpdate(id,{$set:{LeaveStatus:'DECLINED'}}).exec()
}
const AcceptAll=async(IdList)=>{
    IdList.forEach(async(ele)=> {
        await leaveModel.findByIdAndUpdate(ele,{$set:{LeaveStatus:'ACCEPTED'}}).exec()
    });
    return {message:"AcceptedAll"}
}
const RejectAll=async(IdList)=>{
    IdList.forEach(async(ele)=> {
        await leaveModel.findByIdAndUpdate(ele,{$set:{LeaveStatus:'DECLINED'}}).exec()
    });
    return {message:"RejectedAll"}
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
const deleted=async(count)=>{
    const del_success= await adminModel.deleteMany({Count:{$gte:count}})
    if(del_success){
        return {message:"Successfully deleted"}
    }
}


module.exports={displayLeavesList,checkadmin,decode,findByQuery,deleted,searched_query,AcceptOne,RejectOne,AcceptAll,RejectAll}
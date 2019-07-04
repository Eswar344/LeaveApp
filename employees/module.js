var employeeModel=require('./model')
var jwt=require('jsonwebtoken')
var bcrypt = require('bcryptjs');
var sendmail=require('./../Sentmail')
var LeaveModel=require('./../Leave/model')

const createAccount=async(data)=>{
    //var {name,email,password,address,phone}=data
    let {name,email,password,address,phone}=data
    if (!name || !password || !email ||!address ||!phone) {
        throw new Error("please complete all the details")
    }
    const existingName =await findByQuery({name})
    if (existingName.length) {
        throw new Error("Name already taken")
    }
    const existingUserEmail = await findByQuery({email})
    if (existingUserEmail.length) {
        throw new Error("Email already taken")
    }
    var salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);
    return await employeeModel.create({name,email,password,address,phone})
}
let login = async (email, password) => {
    if (!email || !password) {
        throw new Error(`Email and password are required for login`);
    }
    const [employee] =await findByQuery({email})
    if (!employee) {
        throw new Error("Invalid email");
    }
    if (!(bcrypt.compareSync(password,employee.password))) {
        throw new Error("Invalid password");
    }
    return encode(employee.id, employee.name, employee.email);
}
async function findByQuery(ele){
    return await employeeModel.find({...ele}).exec()
}
const encode=async(id,name,email)=>{
    const token=jwt.sign({id,name,email},process.env.JWT_SECRET,{
        expiresIn:"10 days"
    })
    return token
}
const decode=async(token)=>{
    const payload=jwt.verify(token,process.env.JWT_SECRET)
    return payload
}
const setpassword=async(email,password,confirm)=>{
    if (!email || !password) {
        throw new Error(`Email and password are required for Reset Password`);
    }
    if(password!=confirm){
        throw new Error("Mismatched password")
    }
    const [employee] =await findByQuery({email})
    if(!employee){
        throw new Error('Please Enter correct Email Addresss')
    }
    let updated=await employeeModel.findByIdAndUpdate(employee.id,{$set:{password:confirm}}).exec()
    const sendemail=await sendmail.sendtomail(email)
    return {message:"updated"}
}
const Leaveprofile=async(id)=>{
    const LeaveStatus= await LeaveModel.find({"Address":id}).exec()
    return {"LeaveCounts":LeaveStatus.length,LeaveStatus}
}

module.exports={createAccount,findByQuery,login,decode,setpassword,Leaveprofile}
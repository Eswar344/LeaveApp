var employeeModel=require('./model')
var jwt=require('jsonwebtoken')
var bcrypt = require('bcryptjs');
var sendmail=require('./../Sentmail')

const createAccount=async(data)=>{
    var {name,email,password,address,phone}=data
    var salt = bcrypt.genSaltSync(10);
    var password = bcrypt.hashSync(password, salt);
    return await employeeModel.create({name,email,password,address,phone})
}
let login = async (email, password) => {
    if (!email || !password) {
        throw new Error(`Email and password are required for login`);
    }
    const [employee] =await findByQuery({email})
    //console.log(employee.id)
    if (!employee) {
        throw new Error("Invalid email");
    }
    if (!(bcrypt.compareSync(password,employee.password))) {
        throw new Error("Invalid password");
    }
    console.log(employee.id)
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
let setpassword=async(email,password,confirm)=>{
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

module.exports={createAccount,findByQuery,login,decode,setpassword}
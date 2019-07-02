var LeaveModel=require('./model')

const createLeave=async(data,Address)=>{
    const {Indate,Outdate,Reason}=data
    return await LeaveModel.create({Address,Indate,Outdate,Reason})
}
module.exports={createLeave}
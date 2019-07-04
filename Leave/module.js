var LeaveModel=require('./model')

const createLeave=async(data,Address)=>{
    let LeaveStatus;
    const {Indate,Outdate,Reason}=data
    let Holidays=Math.round((Outdate - Indate)/(1000*24*60*60))
    return await LeaveModel.create({Address,Indate,Outdate,Holidays,Reason,LeaveStatus})
}
module.exports={createLeave}
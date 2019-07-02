var employeeModule=require('./employees/module')
const Authorize = async(req,res,next)=>{
    try
    {
        if (req.headers && req.headers.authorization) 
        {   let token;
            let parts = req.headers.authorization.split(" ");
            if (parts.length == 2 && parts[0] == "Leave") {
                token = parts[1];
            }
            let employee=await employeeModule.decode(token)
            const [employee_Data]=await employeeModule.findByQuery({"_id":employee.id})
            if (!employee_Data) {
                throw new Error("Not Authorized");
            }
            req.employee = employee;
            next()
        }
    }catch(err){
        next(err)
    }

}
module.exports=Authorize
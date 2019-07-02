var adminModule=require('./admin/module')
const Authorize = async(req,res,next)=>{
    try
    {
        if (req.headers && req.headers.authorization) 
        {   let token;
            let parts = req.headers.authorization.split(" ");
            if (parts.length == 2 && parts[0] == "admin") {
                token = parts[1];
            }
            let admin=await adminModule.decode(token)
            const [admin_Data]=await adminModule.findByQuery({"_id":admin.id})
            if (!admin_Data) {
                throw new Error("Not Authorized");
            }
            req.admin= admin;
            next()
        }
    }catch(err){
        next(err)
    }
}
module.exports=Authorize
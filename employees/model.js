var mongoose=require('mongoose')
var AddressSchema=mongoose.Schema({
    street:{
        type:String,
        require:true,},
    city:{
        type:String,
        require:true,},
    district:{
        type:String,
        require:true,},
    pincode:{
        type:String,
        require:true,
    },
    countryname:{
        type:String,
        require:true
    }
})
var EmployeeSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
        minlength: 5,
        maxlength: 50
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
        minlength:8
    },
    address:{ type:AddressSchema},
    phone:{
        type:String,
        require:true
    }
})


const employeeSchema=mongoose.model("employees",EmployeeSchema)
module.exports=employeeSchema
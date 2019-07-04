var bodyParser=require('body-parser')
var express=require('express')
var employeeRouter=require('./employees/router')
var LeaveRouter=require('./Leave/router')
var adminRouter=require('./admin/router')
var auth=require('./auth')
var cors=require('cors')

var router=express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cors())

router.use('/employees',employeeRouter)
router.use('/leave',auth,LeaveRouter)
router.use('/admin',adminRouter)

module.exports=router
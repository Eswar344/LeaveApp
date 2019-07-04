var express=require('express')
var morgan = require('morgan');
var mongoose = require('mongoose')
var apiRouter=require('./api')

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true})
.then(() => console.log('Now connected to MongoDB!'))
.catch(err => console.error('Something went wrong', err));

var app=express()
app.use(morgan('dev'));


app.use('/api',apiRouter)

app.use((error,req,res, next) => {
    if(error){
        res.status(500).send({message:error.message})
    }
})
module.exports=app
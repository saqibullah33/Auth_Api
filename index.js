const express=require('express')
const cookieParser = require('cookie-parser');
const auth= require('./Routes/auth') 

const server=express()

server.use(express.json())
server.use(cookieParser());
server.use(auth)
server.listen(8080,()=>{
    console.log("server started")
})
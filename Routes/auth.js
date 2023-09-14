const express=require('express')
const router=express.Router();
const {Signup,Login,getData,profile,logout,sendOtp,forgetPassword}=require('../Controller/controller')
// const isLoggedinUser=require('../middleware/isUser')
router.
post('/signup',Signup).
post('/login',Login).
get('/get',getData).
get('/profile',profile).
get('/logout',logout).
post('/otp',sendOtp).
post('/forget',forgetPassword)
module.exports=router
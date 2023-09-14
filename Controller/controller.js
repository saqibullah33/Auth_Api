const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const express = require('express')
const jwt = require('jsonwebtoken')
const server = express()
const User = require('../Model/model')
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const otp = require('../helper/otp')

server.use(cookieParser());

require('dotenv').config();


const Connect = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.nmf2pt2.mongodb.net/Nextjs?retryWrites=true&w=majority')
    console.log("connected")
  } catch (error) {
    console.log("error")
    
  }
}

Connect()






const Signup = async (req, res) => {
    console.log("signup called")

    try {
        const { username, email, password } = req.body

        //if email exist or not
        const isuserExisted = await User.findOne({ email: email })

        if (!isuserExisted) {
           
            const newUser = new User({
                username,
                email,
                password
            })

            await newUser.save();
            console.log("signup")
            res.send(newUser)

        }
        else {
            res.send("this email already exist")
        }
    } catch (error) {
        res.send(error)
    }
res.end()
}

const Login = async (req, res) => {


    //check if email exist

    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        console.log(user)
        if (!user) res.send("this email does not exist")

        //compare password
        let isTruepassword = await bcrypt.compare(password, user.password)
        if (!isTruepassword) res.send("password incorrect")

        const payload = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        if (user && isTruepassword) {
            const token = await jwt.sign(payload, process.env.SECRETE_KEY, {
                expiresIn: '1h'
            })
            res.cookie("token", token, {
                httpOnly: true,
                secure: true
            })
            res.send("you are logged in")
        }
    } catch (error) {
        res.send("error")

    }
}

const getData = async (req, res) => {

    //get saved data in cookie
    try {
        const token = req.cookies.token
        const jwtToken = jwt.verify(token, process.env.SECRETE_KEY)
        const { id, username, email } = jwtToken
        res.send({
            id,
            username,
            email
        })

    } catch (error) {
        res.send("error")
    }
}


//this check if user has jwt token he can access profile otherwise not

exports.profile = async (req, res) => {

    const token = req.cookies.token;
    try {
        const jwtToken = jwt.verify(token, process.env.SECRETE_KEY)
        if (jwtToken) res.send("goto profile")
    } catch (error) {

        res.send(error)
    }

    res.end()
}

exports.logout = async (req, res) => {

    const data = {
        succuss: true,
        message: "you are logout"
    }

    try {
        const logout = res.cookie("token", " ", {
            httpOnly: true,
            expiresIn: new Date(0)
        })

        res.send(data)

    } catch (error) {
        res.send(error)
    }

}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.app_password
    }
});
exports.sendOtp = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email })
    if (user){
        try {
            const OTP = otp();
    
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'OTP for verification',
                text: `Your OTP for verification is ${OTP}`
            }
            const info = await transporter.sendMail(mailOptions)
            console.log("Message sent: %s", info.messageId);
           
            user.otp=OTP;
            await user.save()
            res.send({
                message:"email send succuessfully",
                status:true
            })
        } catch (error) {
            res.send(error)
    
        }
    
        res.end()
    }
    else{
        res.send("this user does not exist")
    }
    res.end()
}

exports.forgetPassword=async(req,res)=>{
    console.log("foegte called")
    const {otp,email,newpassword}=req.body;

    const user= await User.findOne({email})
    console.log(user.otp)
    if(user.otp==otp){
        user.password=newpassword
        user.otp=null
        await user.save()
        res.send("password reset")

    }
    
    else{
        res.send("error")
    }
}
module.exports.Signup = Signup;
module.exports.Login = Login;
module.exports.getData = getData
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const user = new Schema({
   username: String,
   email: {"type": "string",
   "required": true,
   "unique": true},
   password: String,
   otp: Number,
  });

  user.pre('save' , async function(next){
    const user=this

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(user.password, salt)
    user.password=hashpassword
    console.log(user)
    next()
  }
);


  
const User=mongoose.model('users', user);
module.exports=User;

const User = require("../models/users")
const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Chatbot';
// const bcrypt=require("bcryptjs")
const CryptoJS=require("crypto-js")


const signup= async (req, res) => {
    const { username, password, email,mobile } = req.body;
   const secretPass="Clipherschool"
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(password, salt);
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(password),
      secretPass
    ).toString();
    // console.log(data);
    // const user1= await User.findOne({_id:"64454ca3707f5768496c8f6c"});
    
     const user1= await User.findOne({email:email})
    // console.log(user1);
    if(user1) res.status(400).json("Email already exists")
    else{
      const user = new User({ 
        username,
        password: data, 
        email,
        mobile,
        message:[],
        });
try {

await user.save();
// Create JWT token
const token = jwt.sign({ id: user._id }, JWT_SECRET);
res.json({ token,email,username });
} catch (err) {
console.log(err);
res.status(500).json('Error signing up');
}

    }
    
    
  };

  module.exports=signup;
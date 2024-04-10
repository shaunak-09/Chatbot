const User = require("../models/users")
// const express = require('express');
const jwt = require('jsonwebtoken');
// const app = express();
const JWT_SECRET = 'Chatbot';
// const bcrypt=require("bcryptjs")
const CryptoJS=require("crypto-js")



 const login= async (req,res) => {
    const { email, password } = req.body;
    const secretPass="Clipherschool"
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) return res.status(400).send('Invalid email or password');
    const bytes = CryptoJS.AES.decrypt(user.password, secretPass);
    // console.log(bytes);
    const data =JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    // console.log(data);
    if (data==password) {
     
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      res.json({ token,username:user.username,email});
    } else {
      res.status(400).send('Invalid email or password');
    }
  };

  module.exports=login
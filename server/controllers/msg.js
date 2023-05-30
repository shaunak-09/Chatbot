const User=require("../models/users")
const express=require("express")
// const router=express.Router();

 const save_msg=async(req,res)=>{
    try{
        // console.log(req.body.message);
        const user=await User.findById(req.id);
        if(!user) return res.status(403).json({error:"Invalid user"})
        user.message.push(req.body.message)

        const updatedUser=await user.save();
        res.json("Msg succesfully saved");
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}
module.exports=save_msg

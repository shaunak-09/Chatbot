const express=require("express")
const router=express.Router()
const login=require("./controllers/login")
const signup=require("./controllers/signup")
const save_msg=require("./controllers/msg.js")
const auth=require("./middleware/auth.js")

router.get("/",(req,res)=>{
    res.json("Hi");
})
router.post("/login/",login)
router.post("/signup/",signup)
router.post("/msg/",auth,save_msg)

module.exports=router
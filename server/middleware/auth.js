const jwt=require("jsonwebtoken")
const JWT_SECRET = 'Chatbot';

const auth=(req,res,next)=>{
    const authheader=req.header("x-access-token")
    
    if(!authheader)
    return res.status(401).json({error:"Unauthorized, Access denied"})
    
   jwt.verify(authheader,JWT_SECRET,(err,userinfo)=>{
    if(err)   return res.status(401).json({error:"Unauthorized, Access denied"})
    req.id=userinfo.id
    next();
   })
}
module.exports=auth
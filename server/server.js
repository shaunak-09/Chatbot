require("dotenv").config();
const { Server } = require("socket.io");
// const io =require("socket.io")(server);
const express=require("express");
const app=express();
const http=require("http")
const mongoose=require("mongoose");
const cors=require("cors");
const bodyParser=require("body-parser")
const routes=require("./routes")
const port=process.env.Port||8000;

app.use(bodyParser.json());
app.use(cors({
    origin:'*'
}))
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chatbot-git-main-shaunak-09.vercel.app",
    methods: ["GET", "POST"],
  },
});
// app.get("/",(req,res)=>{
//   res.send("Hi");
// })
const users=[];
io.on("connection",socket=>{
  console.log(`User Connected ${socket.id}`);
    socket.on("new-user-joined",name=>{
        users[socket.id]=name;
        // console.log("user-joined"+name);
        socket.broadcast.emit("user-joined",name);
    })
    socket.on("send_msg",data=>{
      // console.log(data.message);
        socket.broadcast.emit("receive_msg",data)
    });

})

// Connect to MongoDB database
mongoose.connect(`${process.env.Database_Url}`, 
{ useNewUrlParser: true, 
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
 
  app.use("/api",routes)

server.listen(port,()=>console.log(`Server running on port ${port}`))

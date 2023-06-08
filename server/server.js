;
const { Server } = require("socket.io");
// const io =require("socket.io")(server);
const express=require("express");
const app=express();
const http=require("http")
const mongoose=require("mongoose");
const cors=require("cors");
const bodyParser=require("body-parser")
const routes=require("./routes")

app.use(bodyParser.json());
app.use(cors({
    origin:'*'
}))
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const users=[];
io.on("connection",socket=>{
  console.log(`User Connected ${socket.id}`);
    socket.on("new-user-joined",name=>{
        users[socket.id]=name;
        console.log("user-joined"+name);
        socket.broadcast.emit("user-joined",name);
    })
    socket.on("send_msg",data=>{
      console.log(data.message);
        socket.broadcast.emit("receive_msg",data)
    });

})

// Connect to MongoDB database
mongoose.connect('mongodb+srv://shaunak:honda1805@cluster0.lz46p9j.mongodb.net/Chatbot?retryWrites=true&w=majority', 
{ useNewUrlParser: true, 
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
 
  app.use("/api",routes)

server.listen(port,()=>console.log(`Server running on port ${port}`))

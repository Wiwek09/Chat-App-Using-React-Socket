const express = require("express") //Creating server
const app = express() //app variable instance of expresss librabry
const cors = require('cors')

app.use(cors())

const http = require('http')
const {Server} = require('socket.io')
const server = http.createServer(app)


const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connection", (socket) =>{
   console.log(`Connected to the user having id:  ${socket.id}`)

   socket.on("join_room",(data) =>{
     socket.join(data)
     console.log(`User having id: ${socket.id} joined room of id: ${data}`)
   })

   socket.on("send_message", (data) =>{
    socket.to(data.room).emit("receive_message",data);
   } )
 
   socket.on("disconnect",() =>{
    console.log("User Disconnected",socket.id);
   });
});


server.listen(5000, () =>
    console.log("Server is Running")
    
)


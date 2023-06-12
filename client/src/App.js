import React, { useState } from 'react'
import css from './App.css'
import io from 'socket.io-client'
import Chat from './Chat'

const socket = io.connect("https://chat-app-using-react-socket-jugt.vercel.app/")

const App = () => {
 
   const [username,setUsername] = useState("")
   const [room,setRoom] = useState("")
   const [showChat,setShowChat] = useState(false)

   const joinRoom = () =>{
     if(username  && room){
      socket.emit("join_room",room)
      setShowChat(true)
     }
   }

  return (
    <div className='App' >
     { !showChat ? 
       (
         <div className='joinChatContainer' >
         <h1>Join A Chat</h1>
         <input type="text" placeholder="John..." onChange={(event) => {setUsername(event.target.value)}} />
         <input type="text" placeholder="Room Id.." onChange={(event) => {setRoom(event.target.value)}} />
         <button onClick={joinRoom} >Join</button>
         </div>
      ): (    
         <Chat socket={socket} username={username} room={room} />
         )
      }
    </div>
  )
}

export default App
import { useState } from 'react'
import { io } from 'socket.io-client'
import Chat from './Chat.jsx';
import './App.css'


const socket = io.connect("http://localhost:3000");

function App() {
  
  const [name,setName] = useState("");
  const [room,setRoom] = useState("");
  const [showChat ,setshowChat] = useState(false);

  const joinRoom = ()=>{
    if(name!=="" && room !== ""){
      socket.emit("join room",room);
      setshowChat(true);
    }
  }

  return (
    <>
    <div className='flex flex-col justify-center items-center'>

    {!showChat ? (
      <div className='h-auto w-[400px] bg-green-400 flex flex-col justify-center p-[20px] gap-[20px] rounded-[10px] mt-[60px]'>
        <h3 className='text-center font-bold text-[1.5rem]'>Join a chat</h3>
        <input type='text' placeholder='John' className='border-2 bg-white h-[40px] pl-[7px]'onChange={(event)=>{setName(event.target.value)}}/>
        <input type="text" placeholder='123' className='border-2 bg-white
        h-[40px] pl-[7px]' onChange={(event)=>{setRoom(event.target.value)}}/>
        <button onClick={joinRoom} className='cursor-pointer bg-black text-white h-[40px] w-[200px] ml-[23%] rounded-[10%]'>Join</button>
      </div>
    )
    :
    (
      <Chat socket={socket} name={name} room={room}/>
    )
    }
    </div>
    </>
  )
}

export default App

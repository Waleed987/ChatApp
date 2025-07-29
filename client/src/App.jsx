import { useState } from 'react'
import { io } from 'socket.io-client'
import Chat from './Chat.jsx';
import './App.css'

const socket = io.connect("http://localhost:3000");

function App() {

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("join room", room);
      setShowChat(true);
    }
  }

  const instructionButton = () => {
    setShowInstructions(true); // show instruction screen
  }

  const backToLogin = () => {
    setShowInstructions(false); // go back to login
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center'>

        <img
          src="/chatappbg2.png"
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        />

        {!showChat && !showInstructions && (
          <button
            type="button"
            onClick={instructionButton}
            className="cursor-pointer text-white absolute top-[15px] right-[10px] bg-gradient-to-r from-black to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            INSTRUCTIONS
          </button>
        )}

        {showInstructions && (
          <div className='h-auto w-[400px] bg-white rounded-[10px] p-5 mt-[10%] text-center z-10'>
            <h2 className='text-[1.5rem] font-bold mb-4'>Instructions</h2>
            <ul className="text-left list-disc ml-6 text-[1rem] mb-5">
            <li className='mb-[10px]'>To create a room, just enter any room id (random) what you want.</li>
              <li className='mb-[10px]'>Enter your name and a room ID to join.</li>
              <li className='mb-[10px]'>Same room ID = shared chat.</li>
              <li className='mb-[10px]'>Messages are not saved.</li>
              <li className='mb-[10px]'>You can chat in a secret room without anyone knowing the ROOM ID.</li>
              <li className='mb-[10px]'>Make sure the other person is active for him to see your messages.</li>
              <li className='mb-[10px]'>Click "Back" to return to the join screen.</li
              >
            </ul>
            <button
              onClick={backToLogin}
              className='cursor-pointer bg-blue-500 text-white px-4 py-2 rounded mt-3 hover:bg-blue-700'>
              Back
            </button>
          </div>
        )}

        {!showChat && !showInstructions && (
          <div className='h-auto w-[400px] bg-none flex flex-col justify-center p-[20px] gap-[20px] rounded-[10px] mt-[15%]'>
            <h3 className='text-center font-bold text-[1.5rem] text-white font-serif'>Join a chat</h3>
            <input
              type='text'
              placeholder='Enter Your Name'
              className='border-2 bg-white h-[40px] pl-[7px]'
              onChange={(event) => { setName(event.target.value) }} />
            <input
              type="text"
              placeholder='Enter Room ID (keep it same for common room)'
              className='border-2 bg-white h-[40px] pl-[7px]'
              onChange={(event) => { setRoom(event.target.value) }} />
            <button
              onClick={joinRoom}
              className='animate-bounce cursor-pointer bg-gradient-to-b from-black to-red-500 bg-black text-white h-[40px] w-[200px] ml-[23%] rounded-[10%]'>
              Join
            </button>
          </div>
        )}

        {showChat && !showInstructions && (
          <Chat socket={socket} name={name} room={room} setshowChat={setShowChat} />
        )}

      </div>
    </>
  )
}

export default App;

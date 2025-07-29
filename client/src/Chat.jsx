import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { X,Send, MessageCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';

function Chat({socket,name,room,setshowChat}){
    const [message,setMessage] = useState("");
    const [msgList ,setmsgList] = useState([]);

    const sendMessage = async ()=>{
        if(message!=="" && socket){
            const messageData = {
                room: room,
                author: name,
                message: message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

           await socket.emit("send message",messageData);
           setmsgList((list)=>[...list,messageData]);
           setMessage("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    useEffect(() => {
        if (socket) {
            socket.off("rec_message").on("rec_message", (data) => {
                setmsgList((list)=>[...list,data]);
            });
        }
    }, [socket]);
    
    const closeButton = ()=>{
        console.log("close button clicked");
        setshowChat(false);
    }

    return(
        <>
            <div className="flex flex-col mt-12 bg-gradient-to-br from-slate-50 to-slate-100 h-[600px] w-[400px] border border-slate-200 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
                <div className="chat-header h-16 w-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center relative">
                    <X color="white" className="z-20 absolute top-[10px] left-[10px]" onClick={closeButton}/>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="flex items-center gap-2 relative z-10">
                        <MessageCircle className="text-white" size={20} />
                        <p className="text-white font-semibold text-lg tracking-wide">Live Chat</p>
                    </div>
                    <div className="absolute top-2 right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                
                <div className="chat-body flex-1 w-full bg-white/80 backdrop-blur-sm p-4 overflow-y-auto space-y-3">
                    {msgList.length === 0 && (
                        <div className="text-center text-slate-400 mt-8">
                            <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Start a conversation...</p>
                        </div>
                    )}
                    {msgList.map((msg, index) => {
                        return (
                            <div key={index} className={`flex ${msg.author === name ? "justify-end" : "justify-start"}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
                                    msg.author === name 
                                        ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md" 
                                        : "bg-white border border-slate-200 text-slate-800 rounded-bl-md"
                                }`}>
                                    <p className="text-sm leading-relaxed">{msg.message}</p>
                                    <div className={`text-xs mt-1 ${
                                        msg.author === name ? "text-blue-100" : "text-slate-500"
                                    }`}>
                                        {msg.time}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                <div className="chat-footer h-16 bg-white/90 backdrop-blur-sm border-t border-slate-200 flex items-center gap-2 px-4">
                    <input 
                        type="text" 
                        value={message}
                        placeholder="Type your message..."
                        className="flex-1 pl-4 pr-4 py-2 border border-slate-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm" 
                        onChange={(event)=>{setMessage(event.target.value)}}
                        onKeyPress={handleKeyPress}
                    />
                    <button 
                        onClick={sendMessage}  
                        className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!message.trim()}
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </>
    );
}

export default Chat;
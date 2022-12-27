import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { FiSend } from "react-icons/fi";
import { useLoaderData } from "react-router-dom";
const socket = io.connect("http://localhost:5009/");
const Chat = () => {
  const bookingId = useLoaderData();
  const [message, setMessage] = useState("");
  const [getMessage, setGetMessage] = useState("");
  const [room, setRoom] = useState("");
  socket.emit("joinRoom", bookingId);
  const handleSend = () => {
    socket.emit("reactEvent", { message, room: bookingId });
  };

  useEffect(() => {
    socket.on("showMessage", (data) => {
      console.log(data);
      setGetMessage(data.message);
    });
  }, [socket]);

  //   const hanldeRoom = () => {
  //    // socket.emit("joinRoom", bookingId);
  //   };
  //   const bookingId = useLoaderData();
  //   console.log(bookingId);
  //   const socket = io.connect("http://localhost:5009/");
  //   console.log(socket);
  //   const [message, setMessage] = useState();
  //   const [getMessage, setgetMessage] = useState();
  //   const handleChat = () => {
  //     const mes=[{
  //         mess:message,
  //         bookId:'10'
  //     }]
  //     socket.emit("reactEvent", message);
  //     socket.emit("chatId");
  //     console.log("mmmm", message);
  //     document.getElementById("chat-input").value = "";
  //   };
  //   useEffect(() => {
  //     socket.on("showMessage", (data) => {
  //       setgetMessage(data);
  //     });
  //   }, [socket]);
  return (
    <div className="App">
      <div className="container">
        <h1 className="h1">sender:{message}</h1>
        <h1 className="h1">Receiver: {getMessage}</h1>
      </div>
      {/* <input
        onBlur={(e) => setRoom(e.target.value)}
        type="text"
        placeholder="ROom...."
      />
      <button onClick={hanldeRoom}>Join room</button>
      <br /> */}
      <input
        onBlur={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="message...."
      />
      <br />
      <button onClick={handleSend}>send</button>
    </div>
    // <body class="flex flex-col items-center justify-center min-h-screen bg-blue-300 text-gray-800 p-10">
    //   <div class="flex flex-col flex-grow w-full max-w-xl bg-blue-100 shadow-xl rounded-lg overflow-hidden">
    //     <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
    //       <div class="flex w-full mt-2 space-x-3 max-w-xs">
    //         <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    //         <div>
    //           <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
    //             <p class="text-sm">{getMessage}</p>
    //           </div>
    //           <span class="text-xs text-gray-500 leading-none">2 min ago</span>
    //         </div>
    //       </div>
    //       <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
    //         <div>
    //           <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
    //             <p class="text-sm">{message}</p>
    //           </div>
    //           <span class="text-xs text-gray-500 leading-none">2 min ago</span>
    //         </div>
    //         <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    //       </div>
    //     </div>

    //     <div class="bg-gray-300 p-4 flex ">
    //       <input
    //         class="flex items-center h-10 w-full rounded px-3 text-sm"
    //         type="text"
    //         placeholder="Type your message…"
    //         id="chat-input"
    //         onBlur={(e) => setMessage(e.target.value)}
    //       />
    //       <button onClick={handleChat} className="mx-2 btn btn-outline">
    //         <FiSend></FiSend>
    //       </button>
    //     </div>
    //   </div>
    // </body>
  );
};

export default Chat;

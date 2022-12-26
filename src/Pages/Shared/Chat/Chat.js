import React, { useState } from "react";
import io from "socket.io-client";
import { FiSend } from "react-icons/fi";
const Chat = () => {
  const socket = io.connect("http://localhost:5009/");
  console.log(socket);
  const [message, setMessage] = useState("");
  const handleChat = () => {
    socket.emit("reactEvent",message);
    console.log("mmmm", message);
    document.getElementById("chat-input").value = "";
  };
  return (
    <body class="flex flex-col items-center justify-center min-h-screen bg-blue-300 text-gray-800 p-10">
      <div class="flex flex-col flex-grow w-full max-w-xl bg-blue-100 shadow-xl rounded-lg overflow-hidden">
        <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
          <div class="flex w-full mt-2 space-x-3 max-w-xs">
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
              <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                <p class="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </p>
              </div>
              <span class="text-xs text-gray-500 leading-none">2 min ago</span>
            </div>
          </div>
          <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
              <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                <p class="text-sm">Lorem ipsum dolor sit.</p>
              </div>
              <span class="text-xs text-gray-500 leading-none">2 min ago</span>
            </div>
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          </div>
        </div>

        <div class="bg-gray-300 p-4 flex ">
          <input
            class="flex items-center h-10 w-full rounded px-3 text-sm"
            type="text"
            placeholder="Type your message…"
            id="chat-input"
            onBlur={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleChat} className="mx-2 btn btn-outline">
            <FiSend></FiSend>
          </button>
        </div>
      </div>
    </body>
  );
};

export default Chat;
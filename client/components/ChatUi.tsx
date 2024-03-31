import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface Message {
  text: string;
  sender: string;
}

interface ChatWindowProps {
  selectedUser: any | null;
  messages: Message[];
  onMessageSubmit: () => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onBackButtonClick: () => void; // New prop for handling back button click
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  selectedUser,
  messages,
  onMessageSubmit,
  inputValue,
  setInputValue,
  onBackButtonClick,
}) => {
  const receiverMessages: Message[] = [
    { text: "Hi there!", sender: selectedUser?.name || "" },
    { text: "How are you?", sender: selectedUser?.name || "" },
    { text: "What's up?", sender: selectedUser?.name || "" },
  ];

  return (
    <div
      className={`flex-1 bg-white p-6 md:w-2/3 ${
        selectedUser
          ? "md:fixed md:right-0 md:top-0 md:h-full md:overflow-y-auto"
          : "hidden md:flex"
      }`}
    >
      {selectedUser ? (
        <>
          <div
            className={`md:flex md:flex-col md:w-2/3 md:h-full ${
              window.innerWidth <= 640
                ? "fixed right-0 top-0 w-full"
                : ""
            } md:right-0 md:w-full md:overflow-y-auto`}
          >
            <div className="w-full bg-white shadow-md p-4 flex items-center justify-between">
              <div className="flex items-center">
              <button className="md:hidden" onClick={onBackButtonClick}>
               <ArrowBackIosIcon  />
              </button>
                <Avatar alt={selectedUser.name} src={selectedUser.profilePicture} />
                <h2 className="text-lg font-semibold ml-3">{selectedUser.name}</h2>
              </div>
              <button className="border border-gray-300 rounded-lg p-2">
                <MoreVertIcon  />
              </button>
           
            </div>
            <div
              className="flex-1 overflow-y-auto mt-5 pb-16"
              style={{ maxHeight: "calc(100vh - 200px)" }}
            >
              {[...messages, ...receiverMessages].map((message, index) => (
                <div
                  key={index}
                  className={
                    message.sender === "user"
                      ? "text-right mb-2"
                      : "text-left mb-2 "
                  }
                >
                  <div
                    className={
                      message.sender === "user"
                        ? "bg-pink-100 text-black rounded-lg py-2 px-4 inline-block"
                        : "bg-red-100 text-black rounded-lg py-2 px-4 inline-block"
                    }
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:ml-1/3 md:overflow-y-auto sm:ml-0 md:w-full">
            <div className="fixed bottom-0 md:right-0 md:w-2/3 bg-white  md:mb-[50px] border-gray-300 p-4 flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Your Message"
                  className="w-full p-2 pl-12 border border-gray-200 rounded-lg focus:outline-none" 
                />
                <MicIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 cursor-pointer" />
                
              </div>
              <button
                onClick={onMessageSubmit}
                className="px-4 py-2 border-red-500 border text-white rounded-lg ml-2"
              >
                <SendIcon className="text-red-500" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center">Select a user to start chatting</div>
      )}
    </div>
  );
};

export default ChatWindow;

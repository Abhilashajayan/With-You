import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import VideocamIcon from "@mui/icons-material/Videocam";
import PhoneIcon from "@mui/icons-material/Phone";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

interface Message {
  text: string;
  sender: string;
  timestamp: string; 
}

interface ChatWindowProps {
  selectedUser: any | null;
  messages: Message[];
  onMessageSubmit: () => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onBackButtonClick: () => void;
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
    {
      text: "Hi there!",
      sender: selectedUser?.name || "",
      timestamp: "10:00 AM",
    },
    {
      text: "How are you?",
      sender: selectedUser?.name || "",
      timestamp: "10:05 AM",
    },
    {
      text: "What's up?",
      sender: selectedUser?.name || "",
      timestamp: "10:10 AM",
    },
    {
      text: "What'fgsdfgsdfs up?",
      sender: selectedUser?.name || "",
      timestamp: "09:10 AM",
    },
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
              window.innerWidth <= 640 ? "fixed right-0 top-0 w-full" : ""
            } md:right-0 md:w-full md:overflow-y-auto`}
          >
            <div className="w-full bg-white shadow-md p-4 flex items-center justify-between">
              <div className="flex items-center">
                <button className="md:hidden" onClick={onBackButtonClick}>
                  <ArrowBackIosIcon className="text-red-500" />
                </button>
                <Avatar
                  alt={selectedUser.name}
                  src={selectedUser.profilePicture}
                />
                <h2 className="text-lg font-semibold ml-3">
                  {selectedUser.name}{" "}
                  <VerifiedRoundedIcon className="text-blue-800 ml-1" />
                </h2>
              </div>
              <div className="flex items-center">
                <IconButton>
                  <VideocamIcon className="text-red-500" />
                </IconButton>
                <IconButton>
                  <PhoneIcon className="text-red-500" />
                </IconButton>
                <IconButton>
                  <MoreVertIcon className="text-red-500" />
                </IconButton>
              </div>
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
                    <span className="block">{message.text}</span>
                    <span className="text-xs text-gray-400">
                      {message.timestamp}
                    </span>
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
        <div className="flex items-center"></div>
      )}
    </div>
  );
};

export default ChatWindow;

import React, { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import VideocamIcon from "@mui/icons-material/Videocam";
import PhoneIcon from "@mui/icons-material/Phone";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { useAppSelector } from "@/features/hooks";
import { EmojiStyle } from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react";
import Picker from "emoji-picker-react";
import { useRouter } from "next/navigation";

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
  isTyping: boolean;
  onTypingChange: (typing: boolean) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  selectedUser,
  messages,
  onMessageSubmit,
  inputValue,
  setInputValue,
  onBackButtonClick,
  isTyping,
  onTypingChange,
}) => {
  const user: any = useAppSelector((state) => state.auth.user);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  console.log(isTyping, "the typing value");
  const router = useRouter();
  const videoCall = async () => {
    try {
      const queryString = `?User=${selectedUser?._id}`;
      router.push(`/Message/videoCall/${queryString}`);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const voiceCall: any = async () => {
    try {
      const queryString = `?User=${selectedUser?._id}`;
      router.push(`/Message/voiceCall/${queryString}`);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value) {
      onTypingChange(true);
    } else {
      onTypingChange(false);
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    console.log(emojiData);

    let newMessages = inputValue + emojiData.emoji;
    setInputValue(newMessages);
  };

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
                  alt={selectedUser.username}
                  src={selectedUser.profilePicture}
                />
                <h2 className="text-lg font-semibold ml-3">
                  {selectedUser.username}{" "}
                  <VerifiedRoundedIcon className="text-blue-800 ml-1" />
                  {isTyping === true && (
                    <div className="text-[10px]">
                      <span className="block">Typing...</span>
                    </div>
                  )}
                </h2>
              </div>
              <div className="flex items-center">
                <IconButton onClick={videoCall}>
                  <VideocamIcon className="text-red-500" />
                </IconButton>
                <IconButton onClick={voiceCall}>
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
              {[...messages].map((message: any, index) => (
                <div
                  key={index}
                  className={
                    message.sender === user?._id
                      ? "text-right mb-2"
                      : "text-left mb-2 "
                  }
                >
                  <div
                    className={
                      message.sender === user?._id
                        ? "bg-pink-100 text-black rounded-lg py-2 px-4 inline-block"
                        : "bg-red-100 text-black rounded-lg py-2 px-4 inline-block"
                    }
                  >
                    <span className="block">{message?.content}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
              {showEmojiPicker && (
                <Picker className="mb-5 z-55" onEmojiClick={handleEmojiClick} />
              )}
            </div>
          </div>

          <div className="flex flex-col md:ml-1/3 md:overflow-y-auto sm:ml-0 md:w-full">
            <div className="fixed bottom-0 md:right-0 md:w-2/3 bg-white  md:mb-[50px] border-gray-300 p-4 flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleTyping}
                  placeholder="Your Message"
                  className="w-full p-2 pl-12 border border-gray-200 rounded-lg focus:outline-none"
                />
                <button
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowEmojiPicker(!showEmojiPicker);
                  }}
                >
                  <MicIcon />
                </button>
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

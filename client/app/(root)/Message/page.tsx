"use client";
import React, { useState, useEffect } from "react";
import TabLayouts from "@/components/TabLayout";
import UserList from "@/components/ChatLIst";
import ChatWindow from "@/components/ChatUi";
import { getChat } from "@/axios/axiosConfig";
import { useAppSelector } from "@/features/hooks";
import { getMessage } from "@/axios/axiosConfig";
import { sendMessage } from "@/axios/axiosConfig";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import ChatWindowSkeleton from "@/components/skeltons/MessageSkelton";
import MLoading from "@/components/icons/messageLoad";
const ENDPOINT = "http://localhost:3005";
import authNoti from "@/features/auth/authNoti";
import { useAppDispatch } from "@/features/hooks";
import { setNotification } from "@/features/auth/authNoti";
var socket: any, selectedChatCompare: any;

interface Message {
  text: string;
  sender: string;
  timestamp: any;
}

interface ID {
  $oid: string;
}

interface LatestMessage {
  _id: ID;
  sender: Sender;
  content: string;
  chat: ID;
  readBy: any[];
  createdAt: Date;
  updatedAt: Date;
}

interface Sender {
  _id: ID;
  username: string;
  email: string;
  profilePicture: string;
}

interface User {
  _id: ID;
  username: string;
  phone: number;
  email: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
}

function Page() {
  const dispatch = useAppDispatch();
  const notification = useAppSelector((state: any) => state.auth.notifications);
  const user: any = useAppSelector((state) => state.auth.user);
  const [users, setUsers] = useState<any>();
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [chatIds, setChatIds] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    console.log("Attempting to connect to socket.io server...");
    socket = io(ENDPOINT);

    socket.on("connect", () => {
      console.log("Connected to socket.io server.");
      socket.emit("setup", user);
    });

    socket.on("typing", () => {
      console.log("Someone is typing...");
      setIsTyping(true);
    });

    socket.on("stop typing", () => {
      console.log("No one is typing.");
      setIsTyping(false);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket.io server.");
    });

    return () => {
      console.log("Disconnecting from socket.io server...");
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved: any) => {
      console.log("new Message recieved is : ", newMessageRecieved);
      setMessages([...messages, newMessageRecieved]);
    });
  });

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const fetchUserData = async () => {
        try {
          const userId: string = user._id;
          console.log(userId);
          const usersData: LatestMessage = await getChat(userId);
          console.log(usersData, "the user data is here");
          setUsers(usersData);
          setIsLoading(false);
          selectedChatCompare = chatIds;
        } catch (error) {
          setIsLoading(false);
          console.error("Error fetching users data:", error);
        }
      };
      fetchUserData();
    }, 1000);

    const handleResize = () => {
      if (window.innerWidth > 768 && !selectedUser) {
        setSelectedUser(null);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedUser]);

  const handleChatSelect = async (user: any, chatId: string) => {
    console.log(chatId, "the chat is selected");
    try {
      console.log(chatIds);
      setChatIds(chatId);
      const messagesData: any = await getMessage(chatId);
      setMessages(messagesData);
      socket.emit("join chat", chatId);
      console.log(messagesData);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
    selectedChatCompare = chatIds;
    setSelectedUser(user);
  };

  const handleMessageSubmit = async () => {
    socket.emit("stop typing", selectedUser?._id);
    if (inputValue.trim() === "") return;
    console.log(inputValue, " the input value is this ");
    try {
      console.log(chatIds);
      const messagesData: any = await sendMessage(
        user._id,
        chatIds,
        inputValue
      );
      console.log(messagesData);
      setMessages([...messages, messagesData]);
      socket.emit("new message", messagesData);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
    setInputValue("");
  };
  console.log(selectedUser?._id, "selected user");
  const handleBackButtonClick = () => {
    setSelectedUser(null);
  };

  const handleTypingChange = (typing: boolean) => {
    if (typing) {
      console.log(typing, "the typing");
      socket.emit("typing", selectedUser?._id);
    } else {
      socket.emit("stop typing", selectedUser?._id);
    }
  };

  return (
    <>
      {window.innerWidth <= 768 ? (
        <div className="flex flex-col h-full w-screen ">
          <TabLayouts>
            {selectedUser ? null : (
              <UserList users={users} onUserSelect={handleChatSelect} />
            )}
          </TabLayouts>

          {isLoading ? (
            <MLoading />
          ) : (
            <>
              <ChatWindow
                selectedUser={selectedUser}
                messages={messages}
                onMessageSubmit={handleMessageSubmit}
                inputValue={inputValue}
                setInputValue={setInputValue}
                onBackButtonClick={handleBackButtonClick}
                isTyping={isTyping}
                onTypingChange={handleTypingChange}
              />
            </>
          )}
        </div>
      ) : (
        <TabLayouts>
          <div className="flex flex-col h-full w-screen">
            <div className="flex md:flex-row h-full">
              {selectedUser && window.innerWidth > 768 && (
                <div className="w-full top-0  md:w-full  md:block ">
                  <UserList users={users} onUserSelect={handleChatSelect} />
                </div>
              )}
              {!selectedUser && (
                <div className="w-full md:w-full top-0 md:block">
                  <UserList users={users} onUserSelect={handleChatSelect} />
                </div>
              )}
              {(selectedUser || window.innerWidth > 768) && (
                <div className="flex-1">
                  {isLoading ? (
                    <MLoading />
                  ) : (
                    <>
                      <ChatWindow
                        selectedUser={selectedUser}
                        messages={messages}
                        onMessageSubmit={handleMessageSubmit}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        onBackButtonClick={handleBackButtonClick}
                        isTyping={isTyping}
                        onTypingChange={handleTypingChange}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </TabLayouts>
      )}
    </>
  );
}

export default Page;

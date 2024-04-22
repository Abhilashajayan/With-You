"use client"
import React, { useState, useEffect } from 'react';
import TabLayouts from '@/components/TabLayout'
import UserList from '@/components/ChatLIst';
import ChatWindow from '@/components/ChatUi'
import { getChat } from '@/axios/axiosConfig';
import { useAppSelector } from "@/features/hooks";
import { getMessage } from '@/axios/axiosConfig';
import { sendMessage } from '@/axios/axiosConfig';


interface User {
  username: string;
  profilePicture: string;
  userId ? : string;
}

interface Message {
  text: string;
  sender: string;
  timestamp: any ;
}

function Page() {
  const user: any = useAppSelector((state) => state.auth.user);
  const [users, setUsers] = useState<any>();
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [chatIds , setChatIds] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId : string = user._id;
        console.log(userId);
        const usersData: any = await getChat(userId); 
        console.log(usersData, "the user data is here");
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users data:', error);
      }
    };

   
  
    fetchUserData();
  
    const handleResize = () => {
      if (window.innerWidth > 768 && !selectedUser) {
        setSelectedUser(null);
      }
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedUser]);

  const handleChatSelect = (user: any, chatId : string) => {
    console.log(chatId, "the chat is selected");
    setChatIds(chatId);
    setSelectedUser(user);
  };
  console.log(chatIds , "the chat id is here");
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log(chatIds);
        const messagesData: any = await getMessage(chatIds);
        setMessages(messagesData);
        console.log(messagesData);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [selectedUser]);

  const handleMessageSubmit = async() => {
    if (inputValue.trim() === '') return;
    console.log(inputValue, " the input value is this ");
    try {
      console.log(chatIds);
      const messagesData: any = await sendMessage(user._id, chatIds, inputValue );
      console.log(messagesData);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
    setInputValue('');
  };

 

  const handleBackButtonClick = () => {
    setSelectedUser(null);
  };

  return (
    <>
      {window.innerWidth <= 768 ? (
        <div className="flex flex-col h-full w-screen ">
          <TabLayouts>
          {selectedUser ? null : <UserList users={users} onUserSelect={handleChatSelect} />}
          </TabLayouts>
          <ChatWindow 
            selectedUser={selectedUser} 
            messages={messages} 
            onMessageSubmit={handleMessageSubmit} 
            inputValue={inputValue} 
            setInputValue={setInputValue} 
            onBackButtonClick={handleBackButtonClick}
          />
        </div>
      ) : (
        <TabLayouts>
          <div className="flex flex-col h-full w-screen ">
            <div className="flex md:flex-row h-full">
              {(selectedUser && window.innerWidth > 768) && (
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
                  <ChatWindow 
                    selectedUser={selectedUser} 
                    messages={messages} 
                    onMessageSubmit={handleMessageSubmit} 
                    inputValue={inputValue} 
                    setInputValue={setInputValue} 
                    onBackButtonClick={handleBackButtonClick}
                  />
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

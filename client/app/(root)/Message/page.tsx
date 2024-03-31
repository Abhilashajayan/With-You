"use client"
import React, { useState, useEffect } from 'react';
import TabLayouts from '@/components/TabLayout'
import UserList from '@/components/ChatLIst';
import ChatWindow from '@/components/ChatUi'


interface User {
  name: string;
  status: string;
}

interface Message {
  text: string;
  sender: string;
}

function Page() {
  const [users, setUsers] = useState<User[]>([
    { name: "John", status: "Online" },
    { name: "Alice", status: "Offline" },
    { name: "Bob", status: "Online" },
    { name: "Eve", status: "Away" },
    { name: "John", status: "Online" },
    { name: "Alice", status: "Offline" },
    { name: "Bob", status: "Online" },
    { name: "Eve", status: "Away" },
  ]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
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

  const handleMessageSubmit = () => {
    if (inputValue.trim() === '') return;
    setMessages([...messages, { text: inputValue, sender: 'user' }]);
    setInputValue('');
  };

  const handleChatSelect = (user: User) => {
    setSelectedUser(user);
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

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

  return (
    <TabLayouts>
      <div className="flex flex-col h-full w-screen bg-gray-100">
        <div className="flex md:flex-row h-full">
          {(selectedUser && window.innerWidth > 768) && (
            <div className="w-full md:w-full md:block md:overflow-y-auto">
              <UserList users={users} onUserSelect={handleChatSelect} />
            </div>
          )}
          {!selectedUser && (
            <div className="w-full md:w-full md:block md:overflow-y-auto">
              <UserList users={users} onUserSelect={handleChatSelect} />
            </div>
            
          )}
          {(selectedUser || window.innerWidth > 768) && (
            <div className="flex-1">
              <ChatWindow selectedUser={selectedUser} messages={messages} onMessageSubmit={handleMessageSubmit} inputValue={inputValue} setInputValue={setInputValue} />
            </div>
          )}
        </div>
      </div>
    </TabLayouts>
  );
}

export default Page;

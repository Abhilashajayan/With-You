
// interface Message {
//   text: string;
//   sender: string;
// }

// interface ChatWindowProps {
//   selectedUser: any | null;
//   messages: Message[];
//   onMessageSubmit: () => void;
//   inputValue: string;
//   setInputValue: React.Dispatch<React.SetStateAction<string>>;
// }

// const ChatWindow: React.FC<ChatWindowProps> = ({ selectedUser, messages, onMessageSubmit, inputValue, setInputValue }) => (
//   <div className={`flex-1 bg-white p-6 md:w-2/3 ${selectedUser ? 'md:fixed md:right-0 md:top-0 md:h-full md:overflow-y-auto' : 'hidden md:flex'}`}>
//     {selectedUser ? (
//       <>
//         <div className="flex flex-col h-full overflow-y-auto">
//           <h2 className="text-lg font-semibold mb-2">{selectedUser.name}</h2>
//           <div className="mb-auto">
//             {messages.map((message, index) => (
//               <div key={index} className={message.sender === 'user' ? 'text-right mb-2' : 'mb-2'}>
//                 {message.text}
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="border-t border-gray-300"></div>
//         <div className="mt-4">
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             placeholder="Type a message..."
//             className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
//           />
//           <button onClick={onMessageSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-2">Send</button>
//         </div>
//       </>
//     ) : (
//       <div className="text-center">Select a user to start chatting</div>
//     )}
//   </div>
// );

// export default ChatWindow;

import React from 'react';

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
}

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedUser, messages, onMessageSubmit, inputValue, setInputValue }) => (
  <div className={`flex-1 bg-white p-6 md:w-2/3 ${selectedUser ? 'md:fixed md:right-0 md:top-0 md:h-full md:overflow-y-auto' : 'hidden md:flex'}`}>
    {selectedUser ? (
      <>
        <div className="flex flex-col h-full overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2">{selectedUser.name}</h2>
          <div className="flex-1 mb-4">
            {messages.map((message, index) => (
              <div key={index} className={message.sender === 'user' ? 'text-right mb-2' : 'mb-2'}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="border-t border-gray-300"></div>
          <div className="mt-4 flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <button onClick={onMessageSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2">Send</button>
          </div>
        </div>
      </>
    ) : (
      <div className="flex items-center">Select a user to start chatting</div>
    )}
  </div>
);

export default ChatWindow;


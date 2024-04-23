import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useAppSelector } from '@/features/hooks';

interface UserListProps {
  users: { users: any[] }[] | null | undefined;
  onUserSelect: (user: any, chatId : string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onUserSelect }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const user: any = useAppSelector((state) => state.auth.user);

  if (!users) {
    return null;
  }

  return (
    <div className="md:w-1/3 h-screen border-r  top-0">
      <div className="sticky top-0 bg-white rounded-b border-b p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Messages</h2>
          <div>
            <button >
              <FilterListIcon className='text-red-500' />
            </button>
          </div>
        </div>
        <div className="relative mt-4 ">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg p-2  w-full pl-10 focus:outline-none"
          />
          <SearchIcon className="absolute top-3 left-3 text-red-400" />
        </div>
      </div>
    
      <div className="overflow-y-auto h-full mt-5">
      {users?.map((chat: any, index) => {
  const chatId = chat._id;

  let otherUser;
  if (searchQuery) {
    const regex = new RegExp(searchQuery, 'i'); 
    otherUser = chat.users.find((u: any) => regex.test(u.username));
  } else {
    otherUser = chat.users.find((u: any) => u._id !== user._id);
  }
  if (!otherUser) return null; 

  return (
    <div key={index} className="p-4 cursor-pointer border-b border-gray-200 hover:bg-gray-100" onClick={() => onUserSelect(otherUser, chatId)}>
      <div className="flex items-center">
        <img src={otherUser.profilePicture} alt={otherUser.username} className="w-12 h-12 rounded-full mr-3" />
        <div>
          <div className="text-base font-semibold">{otherUser.username}</div>
          <div className="text-sm text-gray-500">{otherUser.username}</div>
        </div>
      </div>
    </div>
  );
})}

      </div>
    </div>
  );
};

export default UserList;

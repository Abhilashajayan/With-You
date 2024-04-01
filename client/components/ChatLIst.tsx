import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

interface User {
  name: string;
  status: string;
}

interface UserListProps {
  users: User[];
  onUserSelect: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onUserSelect }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        {filteredUsers.map((user, index) => (
          <div key={index} className="p-4 cursor-pointer border-b border-gray-200 hover:bg-gray-100" onClick={() => onUserSelect(user)}>
            <div className="flex items-center">
              <img src={`https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80`} alt={user.name} className="w-12 h-12 rounded-full mr-3" />
              <div>
                <div className="text-base font-semibold">{user.name}</div>
                <div className="text-sm text-gray-500">{user.status}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;

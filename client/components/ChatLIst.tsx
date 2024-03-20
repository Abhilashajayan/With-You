import React from 'react';

interface User {
  name: string;
  status: string;
}

interface UserListProps {
  users: User[];
  onUserSelect: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onUserSelect }) => (
  <div className="md:w-1/3 h-full bg-white md:overflow-y-auto">
    <h2 className="text-lg font-semibold mb-4 p-4 border-b border-gray-300">Users</h2>
    {users.map((user, index) => (
      <div key={index} className="p-4 cursor-pointer border-b border-gray-300" onClick={() => onUserSelect(user)}>
        <div className="flex items-center">
          <img src={`https://via.placeholder.com/50?text=${user.name}`} alt={user.name} className="w-12 h-12 rounded-full mr-3" />
          <div>
            <div className="text-base font-semibold">{user.name}</div>
            <div className="text-sm text-gray-500">{user.status}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default UserList;

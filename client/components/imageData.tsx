import React, { useState, useEffect } from 'react';
import MatchingField from './MatchingField';
interface User {
  id: string;
  profilePicture: string;
  username: string;
  location: string;
}



const ImageCarousel: React.FC = () => {
  const apiUrl = 'http://localhost:3003/match/getRandomUsers'; // Make sure your API endpoint returns an array of users
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log(data);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, [apiUrl]);
  

  return (
    <div>
      <MatchingField users={users} />
    </div>
  );
};

export default ImageCarousel;

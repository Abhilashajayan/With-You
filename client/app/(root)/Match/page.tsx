"use client"
import React, { useState, useEffect } from 'react';
import TabLayouts from '@/components/TabLayout';
import MatchingField from '@/components/MatchingField';
import CloseIcon from '@mui/icons-material/Close';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import MatchIcon from '@/components/icons/MatchIcon';
import HomeNavbar from '@/components/HomNav';
import { useAppSelector } from '@/features/hooks';
import AddDetails from '@/components/AddDetails';
import { updateProfile } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/features/hooks';

interface User {
  id: string;
  profilePicture: string;
  username: string;
  location: string;
}

const Page: React.FC = () => {
  const user: any = useAppSelector((state) => state.auth.user);
  console.log(user,"the user");
  const [userDatas, setuserDatas] = useState<any | null>(null);
  const apiUrl = 'http://localhost:3003/match/getRandomUser';
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    fetchRandomUser();
  }, []);


 const fetchRandomUser = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const userDat = data.users.filter((users: any) => users._id === user.id);
      setuserDatas(userDat[0]);
      console.log(userDat[0],"myr");
      const filteredUsers = data.users.filter((users: any) => users._id !== user._id);
      console.log(filteredUsers,"ds");
      const randomUser = filteredUsers[Math.floor(Math.random() * filteredUsers.length)];
      setCurrentUser(randomUser);
    } catch (error) {
      console.error('Error fetching random user:', error);
    }
  };

  const handleNextUser = () => {
    fetchRandomUser();
  };

  return (
    <>
      
        {user?.phone ? (
          <TabLayouts>
          <>
            <HomeNavbar />
            <MatchingField users={currentUser ? [currentUser] : []} />
            <div className="flex items-center justify-center mt-4">
              <button className="rounded-full border-2 p-2 m-2" onClick={handleNextUser}>
                <CloseIcon style={{ color: '#FF5733' }} />
              </button>
              <button className="rounded-full p-2 m-2">
                <MatchIcon />
              </button>
              <button className="rounded-full border-2 p-2 m-2">
                <StarBorderIcon style={{ color: '#8A2387' }} />
              </button>
            </div>
          </>
          </TabLayouts>
        ) : (
          <AddDetails />
        )}
      
    </>
  );
};

export default Page;

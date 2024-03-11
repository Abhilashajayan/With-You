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


interface User {
  id: string;
  profilePicture: string;
  username: string;
  location: string;
}

const Page: React.FC = () => {
  const user: any = useAppSelector((state) => state.auth.user);
  const [userDatas, setuserDatas] = useState<any | null>(null);
  const apiUrl = 'http://localhost:3003/match/getRandomUser';
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showMessage, setShowMessage] = useState(false);

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
      const filteredUsers = data.users.filter((users: any) => users._id !== user._id);
      const randomUser = filteredUsers[Math.floor(Math.random() * filteredUsers.length)];
      setCurrentUser(randomUser);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false); 
      },200);
    } catch (error) {
      console.error('Error fetching random user:', error);
    }
  };

  return (
    <>
      {user?.phone ? (
        <TabLayouts>
          <>
            <HomeNavbar />
            <MatchingField users={currentUser ? [currentUser] : []} />
            <div className="flex items-center justify-center mt-4">
              <button
                className="rounded-full border-2 p-2 m-2"
                onClick={fetchRandomUser}
              >
                <CloseIcon style={{ color: '#FF5733' }} />
              </button>
              <button className="rounded-full p-2 m-2">
                <MatchIcon />
              </button>
              <button className="rounded-full border-2 p-2 m-2">
                <StarBorderIcon style={{ color: '#8A2387' }} />
              </button>
            </div>
            {showMessage && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-red-500 p-2 rounded border border-red-500">
            Nope<CloseIcon style={{ fontSize: '2.5rem' }} />
          </div>
            )}
          </>
        </TabLayouts>
      ) : (
        <AddDetails />
      )}
    </>
  );
};

export default Page;

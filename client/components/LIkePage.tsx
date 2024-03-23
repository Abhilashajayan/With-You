import React from 'react';
import { motion } from 'framer-motion';
import LikeBar from './Navabar';

interface User {
  _id: string;
  username: string;
  profilePicture: string;
  age: number;
}

interface Props {
  likedUsers: User[];
}

const DummyImagesPage:React.FC<Props> = ({likedUsers}) => {
 
  return (
    <>
    <LikeBar />
    <div className="container mt-5 mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {likedUsers?.map((user, index) => (
          <div key={index} className="relative aspect-w-1 aspect-h-1">
            <img
              src={user?.profilePicture}
              alt={`Image ${index + 1}`}
              className="object-cover w-full h-full rounded-lg"
            />

            <div className="absolute bottom-0 left-0 right-0 backdrop-blur-lg bg-opacity-50 text-white p-2">
              <p className="text-md font-bold">{user?.username}</p>
              <p className="text-sm">{user?.age} years old</p>
            </div>
            <motion.div
              className="absolute top-2 right-2"
              whileHover={{ scale: 2.2 }}
              whileTap={{ scale: 0.8 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-white hover:text-red-500"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </motion.div>
            <motion.div
              className="absolute bottom-2 right-2"
              whileHover={{ scale: 1.6 }}
              whileTap={{ scale: 0.8 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-red-400"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  </>
  );
};

export default DummyImagesPage;

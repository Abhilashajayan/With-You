import React from 'react';
import { motion } from 'framer-motion';
import LikeBar from './Navabar';

const DummyImagesPage = () => {
  // Dummy image URLs from Unsplash
  const dummyImages = [
    "https://source.unsplash.com/featured/?nature",
    "https://source.unsplash.com/featured/?landscape",
    "https://source.unsplash.com/featured/?water",
    "https://source.unsplash.com/featured/?mountains",
    "https://source.unsplash.com/featured/?forest",
    "https://source.unsplash.com/featured/?beach",
    "https://source.unsplash.com/featured/?nature",
    "https://source.unsplash.com/featured/?landscape",
    "https://source.unsplash.com/featured/?water",
    "https://source.unsplash.com/featured/?mountains",
    "https://source.unsplash.com/featured/?forest",
    "https://source.unsplash.com/featured/?beach",
    "https://source.unsplash.com/featured/?nature",
    "https://source.unsplash.com/featured/?landscape",
    "https://source.unsplash.com/featured/?water",
    "https://source.unsplash.com/featured/?mountains",
    "https://source.unsplash.com/featured/?forest",
    "https://source.unsplash.com/featured/?beach",
  ];

  // Dummy data for names and ages
  const dummyData = [
    { name: "John", age: 25 },
    { name: "Alice", age: 30 },
    { name: "Bob", age: 22 },
    { name: "Eve", age: 28 },
    { name: "Alex", age: 35 },
    { name: "Grace", age: 27 },
    { name: "David", age: 29 },
    { name: "Emily", age: 31 },
    { name: "Michael", age: 26 },
    { name: "Olivia", age: 24 },
    { name: "Sophia", age: 32 },
    { name: "William", age: 23 },
    { name: "Charlotte", age: 33 },
    { name: "Daniel", age: 29 },
    { name: "Emma", age: 27 },
    { name: "James", age: 28 },
    { name: "Ava", age: 26 },
    { name: "Benjamin", age: 30 },
    { name: "Mia", age: 25 },
  ];

  return (
    <>
    <LikeBar />
    <div className="container mt-5  mx-auto px-4 py-8">
      <div className="grid  grid-cols-2 sm:grid-cols-3 gap-4">
        {dummyImages.map((imageUrl, index) => (
          <div key={index} className="relative  aspect-w-1 aspect-h-1">
            <img
              src={imageUrl}
              alt={`Image ${index + 1}`}
              className="object-cover w-full h-full rounded-lg"
            />
      
            <div className="absolute bottom-0 left-0 right-0 backdrop-blur-lg bg-opacity-50 text-white p-2">
              <p className="text-md font-bold">{dummyData[index].name}</p>
              <p className="text-sm">{dummyData[index].age} years old</p>
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
            {/* Cancel icon overlay with animation */}
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

import React from 'react';
import { motion } from 'framer-motion';
import MatchIcon from './icons/MatchIcon';
import MyComponentWithLottie from './icons/heartAnimation';

const MatchingPage: React.FC = () => {
  return (
    <div className="overflow-hidden fixed bg-cover top-0 right-0 left-0 w-full h-full flex flex-col justify-center items-center">
      <div className="relative mb-8 overflow-y flex flex-col items-center justify-center sm:flex-row sm:justify-center space-x-8">
        <img
          className="object-cover w-32 h-32 max-w-xs transform rotate-45 rounded-lg mb-4 sm:mr-4"
          src="https://source.unsplash.com/featured/?person"
          alt="Member 1"
        />
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5, repeat: Infinity } }}
        >
          <MyComponentWithLottie />
        </motion.div>
        <img
          className="object-cover w-32 h-32 transform rotate-45 rounded-lg mb-4 sm:ml-4"
          src="https://source.unsplash.com/featured/?people"
          alt="Member 2"
        />
      </div>
      <div className="text-red-500 font-bold text-2xl text-center">It's a match</div>
      <p className='text-gray-600 text-sm text-center'>Start conversation now with each other</p>
      <div className="flex flex-col gap-3 mt-2 sm:flex-row sm:justify-center">
        <motion.button 
          className="px-6 py-3 w-[300px] sm:w-auto bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Say Hello
        </motion.button>
        <motion.button 
          className="px-6 py-3 w-[300px] sm:w-auto bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Keep Swiping
        </motion.button>
      </div>
    </div>
  );
};

export default MatchingPage;

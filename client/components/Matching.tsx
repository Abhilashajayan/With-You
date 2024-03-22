import React from "react";
import { motion } from "framer-motion";
import MyComponentWithLottie from "./icons/heartAnimation";

interface MatchingPageProps {
  dataArray: Array<{
    username: string;
    image1: string;
    image2: string;
  }>;
}

const MatchingPage: React.FC<MatchingPageProps> = ({ dataArray }) => {
  return (
    <div className="overflow-hidden fixed bg-cover top-0 right-0 left-0 w-full h-full flex flex-col justify-center items-center">
      {dataArray.map((item, index) => (
        <div
          key={index}
          className="relative mb-8 overflow-y flex flex-col items-center justify-center sm:flex-row sm:justify-center space-x-8"
        >
          <img
            className="object-cover w-32 h-32 max-w-xs transform rotate-45 rounded-lg mb-4 sm:mr-4"
            src={item.image1}
            alt={`Member ${index + 1}`}
          />
          <motion.div
            animate={{
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5, repeat: Infinity },
            }}
          >
            <MyComponentWithLottie />
          </motion.div>
          <img
            className="object-cover w-32 h-32 transform rotate-45 rounded-lg mb-4 sm:ml-4"
            src={item.image2}
            alt={`Member ${index + 2}`}
          />
        </div>
      ))}
      <div className="text-red-500 font-bold text-2xl text-center">
        It's a match, {dataArray[0]?.username}
      </div>
      <p className="text-gray-600 text-sm text-center">
        Start conversation now with each other
      </p>
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

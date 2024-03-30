import React from "react";
import { motion } from "framer-motion";
import GenderIcon from "@mui/icons-material/MaleOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InterestsIcon from "@mui/icons-material/Interests";
import ReportIcon from "@mui/icons-material/Report";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

interface UserProfileProps {
  userData: {
    username: string;
    profilePicture: string;
    gender: string;
    interest: string | string[];
    job: string;
    location: string;
    dob: string;
  };
}

const calculateAge = (dob: string): number => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
  const age = calculateAge(userData?.dob);

  return (
    <div className="max-w-4xl flex flex-col lg:flex-row items-center h-full lg:h-screen mx-auto my-20 lg:my-0">
      <div
        id="profile"
        className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg inset-0 -z-10 bg-black bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] lg:rounded-r-none lg:shadow-2xl bg-white opacity-90 mx-6 lg:mx-0 mb-8 lg:mb-0"
      >
        <div className="p-8 lg:p-12 text-center lg:text-left">
          <div
            className="block lg:hidden rounded-b-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
            style={{ backgroundImage: `url(${userData?.profilePicture})` }}
          ></div>
          <div className="block lg:hidden flex justify-center items-center mt-4">
            <button className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg focus:outline-none mr-4">
              <CloseIcon style={{ color: "#FF0000", fontSize: "1.5rem" }} />
            </button>

            <button className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-red-500"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </button>
          </div>

          <h1 className="text-3xl font-bold pt-8 lg:pt-0">
            {userData?.username},{" "}
            <span className="p-2 text-gray-600">{age}</span>
            <VerifiedRoundedIcon className="text-blue-800 ml-1" />
          </h1>
          <h2 className="text-md font-bold text-gray-600 pt-1">
            {userData?.job}
          </h2>

          <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-red-500 opacity-25"></div>

          <div className="mt-8 space-y-4">
            <ProfileDetail
              Icon={GenderIcon}
              title="Gender:"
              text={userData?.gender}
            />
            <ProfileDetail
              Icon={LocationOnIcon}
              title="Location:"
              text={userData?.location}
            />
            <ProfileDetail
              Icon={InterestsIcon}
              title="Interests:"
              text={userData?.interest}
            />
          </div>

          <p className="pt-8 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor mauris sit amet nunc fermentum, sit amet vestibulum ligula
            fermentum. Duis maximus,
          </p>

          <button className=" mt-5 justify-center sm:item-center bg-red-600   text-white rounded-lg py-2 px-4 hover:bg-red-600 focus:outline-none">
            <ReportIcon className="w-5 h-5 mr-2" />
            <p className="text-xs lg:text-sm">Report User</p>
          </button>
        </div>
      </div>
      <div className="w-full lg:w-2/5 relative">
        <img
          src={userData?.profilePicture}
          className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
          alt="Profile"
        />
        {userData?.profilePicture && (
          <motion.div
            className="absolute bottom-6 left-0 right-0 flex items-center justify-center lg:flex hidden"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-12 h-12 hover:h-10 text-red-500"
              whileHover={{ y: -20, rotate: 360 }}
              whileTap={{ scale: 0.7 }}
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </motion.svg>
            <motion.div
              className="rounded-full bg-white p-2 ml-4"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <CloseIcon style={{ color: "#FF0000", fontSize: "2rem" }} />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

interface ProfileDetailProps {
  Icon: React.ElementType;
  title: string;
  text: string | string[];
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ Icon, title, text }) => {
  return (
    <div>
      <div className="flex items-center justify-center lg:justify-start">
        <Icon className="w-5 h-5 mr-2 text-red-500" />
        <p className="text-gray-600 font-semibold">{title}</p>
      </div>
      <div className="pl-7">
        {Array.isArray(text) ? (
          text.map((item: string, index: number) => (
            <p key={index} className="text-gray-600 text-xs lg:text-sm">
              {item.trim()}
            </p>
          ))
        ) : (
          <p className="text-gray-600 text-xs lg:text-sm">{text}</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

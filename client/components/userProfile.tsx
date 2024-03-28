import React from 'react';
import { motion } from 'framer-motion';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import GenderIcon from '@mui/icons-material/MaleOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InterestsIcon from '@mui/icons-material/Interests';
import ReportIcon from '@mui/icons-material/Report';
import LikeIcon from "@/components/icons/LikeIcon";
import CloseIcon from '@mui/icons-material/Close';

interface UserProfileProps {
    userData: {
        username: string;
        profilePicture: string;
        gender: string;
        interest: string;
        job: string;
        location: string;
    }
}

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
    return (
        <div className="max-w-4xl flex flex-col lg:flex-row items-center h-auto lg:h-screen mx-auto my-32 lg:my-0">
            <div id="profile" className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none lg:shadow-2xl bg-white opacity-90 mx-6 lg:mx-0 mb-8 lg:mb-0">
                <div className="p-8 lg:p-12 text-center lg:text-left">
                    <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                        style={{ backgroundImage: `url(${userData?.profilePicture})` }}></div>
                    <h1 className="text-3xl font-bold pt-8 lg:pt-0">{userData?.username}</h1>
                    <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-red-500 opacity-25"></div>
                    <div className="mt-8">
                        <ProfileDetail Icon={WorkOutlineIcon} text={userData?.job} />
                        <ProfileDetail Icon={GenderIcon} text={userData?.gender} />
                        <ProfileDetail Icon={LocationOnIcon} text={userData?.location} />
                        <ProfileDetail Icon={InterestsIcon} text={userData?.interest} />
                        <ProfileDetail Icon={ReportIcon} text="Report User" />
                    </div>
                    <p className="pt-8 text-sm">Totally optional short description about yourself, what you do and so on.</p>
                </div>
            </div>
            <div className="w-full lg:w-2/5 relative">
                <img src={userData?.profilePicture} className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" alt="Profile"/>
                {userData?.profilePicture && (
                    <motion.div className="absolute bottom-6 left-0 right-0 flex items-center justify-center lg:flex hidden"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}>
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
                        <motion.div className="rounded-full bg-white p-2 ml-4"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}>
                            <CloseIcon style={{ color: '#FF0000', fontSize: '2rem' }} />
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

interface ProfileDetailProps {
    Icon: React.ElementType;
    text: string;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ Icon, text }) => {
    return (
        <div className="flex items-center justify-center lg:justify-start py-1">
            <Icon className="w-5 h-5 mr-2 text-red-500" />
            <p className="text-gray-600 text-xs lg:text-sm">{text}</p>
        </div>
    );
};

export default UserProfile;

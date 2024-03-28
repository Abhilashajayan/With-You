"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { usersProfiles } from '@/axios/axiosConfig';
import UserProfile from '@/components/userProfile';

function Page() {
    const { userId } = useParams<{ userId: string }>();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await usersProfiles(userId);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData(); 
    }, [userId]); 

    return (
        <>
            {userData ? (
                <UserProfile userData={userData} />
            ) : (
                <p>Loading user profile...</p>
            )}
        </>
    );
}

export default Page;

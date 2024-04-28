"use client";
import React, { useState, useEffect } from "react";
import TabLayouts from "@/components/TabLayout";
import DummyImagesPage from "@/components/LIkePage";
import { likedUsers } from "@/axios/axiosConfig";
import { useAppSelector } from "@/features/hooks";

interface User {
  _id: string;
  username: string;
  profilePicture: string;
  age: number;
  matched: boolean;
}

const Page: React.FC = () => {
  const [likedUser, setLikedUsers] = useState<User[]>([]);
  const user: any = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    const fetchLikedUsers = async () => {
      const userId: string = user._id;
      try {
        const response = await likedUsers(userId);
        console.log(response, "the liked response is here");
        setLikedUsers(response.data);
      } catch (error) {
        console.error("Error fetching liked users:", error);
      }
    };

    fetchLikedUsers();
  }, []);
  return (
    <TabLayouts>
      <div>
        <DummyImagesPage likedUsers={likedUser} />
      </div>
    </TabLayouts>
  );
};

export default Page;

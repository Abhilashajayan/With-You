"use client";
import React, { useState, useEffect,Suspense } from "react";
import TabLayouts from "@/components/TabLayout";
const DummyImagesPage = React.lazy(() => import("@/components/LIkePage"));
import { likedUsers } from "@/axios/axiosConfig";
import { useAppSelector } from "@/features/hooks";
import Loading from "@/components/icons/loading";

interface User {
  _id: string;
  username: string;
  profilePicture: string;
  age: number;
  matched: boolean;
}

const Page: React.FC = () => {
  const [likedUser, setLikedUsers] = useState<User[]>([]);
  const [loading , setLoading] = useState<boolean>(false);
  const user: any = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    setLoading(true);
    const fetchLikedUsers = async () => {
      const userId: string = user._id;
      try {
        const response = await likedUsers(userId);
        console.log(response, "the liked response is here");
        setLikedUsers(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching liked users:", error);
      }
    };

    fetchLikedUsers();
  }, []);
  return (
    <TabLayouts>
      {loading  ? (
          <Loading />
        ) : (
          <Suspense fallback={<Loading />}>
            <DummyImagesPage likedUsers={likedUser}  />
          </Suspense>
        )}
    </TabLayouts>
  );
};

export default Page;

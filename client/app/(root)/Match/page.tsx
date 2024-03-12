"use client";
import React, { useState, useEffect } from "react";
import TabLayouts from "@/components/TabLayout";
import MatchingField from "@/components/MatchingField";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MatchIcon from "@/components/icons/MatchIcon";
import HomeNavbar from "@/components/HomNav";
import { useAppSelector } from "@/features/hooks";
import AddDetails from "@/components/AddDetails";
import { useSpring, animated } from "react-spring";
import LikeICon from "@/components/icons/LikeIcon";

interface User {
  id: string;
  profilePicture: string;
  username: string;
  location: string;
}

const Page: React.FC = () => {
  const user: any = useAppSelector((state) => state.auth.user);
  const apiUrl = "http://localhost:3003/match/getRandomUser";
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [match, setMatch] = useState<boolean>(false);
  const [springProps, setSpringProps] = useSpring(() => ({
    opacity: 0,
    transform: "translateY(0)",
  }));

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
      const filteredUsers = data.users.filter(
        (users: any) => users._id !== user._id
      );
      const randomUser =
        filteredUsers[Math.floor(Math.random() * filteredUsers.length)];
      setCurrentUser(randomUser);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 200);
    } catch (error) {
      console.error("Error fetching random user:", error);
    }
  };

  const matchButton = async () => {
    console.log("matched");
    setSpringProps({
      opacity: 1,
      transform: "translateY(-50%)",
      onRest: () => {
        setSpringProps({ opacity: 0, transform: "translateY(0)" });
        setMatch(false);
      },
    });
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
                <CloseIcon style={{ color: "#FF5733" }} />
              </button>
              <button className="rounded-full p-2 m-2" onClick={matchButton}>
                <MatchIcon />
              </button>
              <button className="rounded-full border-2 p-2 m-2">
                <StarBorderIcon style={{ color: "#8A2387" }} />
              </button>
            </div>
            {showMessage && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-red-500 p-2 rounded border border-red-500">
                Nope!
              </div>
            )}

            <animated.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                ...springProps,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: springProps.transform.interpolate(
                  (x: any) => `translate(-50%, ${x})`
                ),
              }}
            >
              <LikeICon />
            </animated.div>
          </>
        </TabLayouts>
      ) : (
        <AddDetails />
      )}
    </>
  );
};

export default Page;

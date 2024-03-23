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
import { randomUserFetch, matchUserButton } from "@/axios/axiosConfig";
import MatchingPage from "@/components/Matching";
import { reduxData } from "@/types/formData";

interface User {
  _id: string;
  profilePicture: string;
  username: string;
  location: string;
}
// interface DataArrayItem {
//   username: string;
//   image1: string | undefined;
//   image2: string | undefined;
// }

const Page: React.FC = () => {
  const user: any = useAppSelector((state) => state.auth.user);
  const [currentUser, setCurrentUser] = useState<User>();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [isMatch, setisMatch] = useState<boolean>(false);
  const [matchData, setmatchData] = useState<User | null>(null);
  const [springProps, setSpringProps] = useSpring(() => ({
    opacity: 0,
    transform: "translateY(0)",
  }));

  useEffect(() => {
    fetchRandomUser();
  }, []);

  const fetchRandomUser = async () => {
    const userId: string = user?._id;
    try {
      const response: any = await randomUserFetch(userId);
      const data = response.data;
      console.log(data.users.length, "the length");
      let randomUser;

      if (data.users && data.users.length > 1) {
        const filteredUsers = data.users.filter(
          (users: reduxData) => users._id !== user._id
        );
        randomUser =
          filteredUsers[Math.floor(Math.random() * filteredUsers.length)];
      } else if (data.users && data.users.length == 0) {
        randomUser = data.users;
      }
      console.log(randomUser);
      setCurrentUser(randomUser);
    } catch (error) {
      console.error("Error fetching random user:", error);
    }
  };

  const cancetButton = async () => {
    await fetchRandomUser();
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 200);
  };

  const dataArray: any = [
    {
      username: user.username,
      image1: currentUser?.profilePicture,
      image2: user?.profilePicture,
    },
  ];

  const matchButton = async () => {
    const likedUserId: string | undefined = currentUser?._id;
    const userId: string = user._id;

    try {
      const response = await matchUserButton(userId, likedUserId);
      if (response) {
        console.log(response?.data?.isLke, "the math collection");
        if (response.data?.isLke) {
          setisMatch(true);
          console.log("the is match is ture");
        }
        setSpringProps({
          opacity: 1,
          transform: "translateY(-50%)",
          onRest: () => {
            setSpringProps({ opacity: 0, transform: "translateY(0)" });
            fetchRandomUser();
          },
        });
      } else {
        console.error("Failed to like user. HTTP error!", response);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <>
      {user?.phone ? (
        <TabLayouts>
          {isMatch == true ? (
            <MatchingPage dataArray={dataArray} />
          ) : (
            <>
              <HomeNavbar />
              <MatchingField users={currentUser ? [currentUser] : []} />
              <div className="flex items-center justify-center mt-4">
                <button
                  className="rounded-full border-2 p-2 m-2"
                  onClick={cancetButton}
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
          )}
        </TabLayouts>
      ) : (
        <AddDetails />
      )}
    </>
  );
};

export default Page;

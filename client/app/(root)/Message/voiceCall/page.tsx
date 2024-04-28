"use client";

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Peer, { SignalData } from "simple-peer";
import { useAppSelector } from "@/features/hooks";
import { useSearchParams, useRouter } from "next/navigation";
import { getUserMedia } from "@/lib/utils";
import { motion } from "framer-motion";

const ENDPOINT = "http://localhost:3005";
let socket: any;

function VoiceCallPage() {
  const user: any = useAppSelector((state) => state.auth.user);
  console.log(user._id);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isCallAccepted, setIsCallAccepted] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [outgoingCall, setOutgoingCall] = useState<boolean>(false);
  const [incomingCall, setIncomingCall] = useState<boolean>(false);
  const [callStartTime, setCallStartTime] = useState<any>(null);
  const [callDuration, setCallDuration] = useState<any>(0);
  const [name, setName] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const otherUserId = searchParams.get("User");
  console.log(otherUserId);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("connect", () => {
      console.log("Connected to socket.io server.");
      socket.emit("setup", user);
      setIsConnected(true);
    });

    socket.on("call received", async (callerId: string, username: string) => {
      console.log("Call received from remote user:", callerId, username);
      console.log("Setting incoming call to true...");
      setIncomingCall(true);
      setName(username);
      setSelectedUser(callerId);
    });

    socket.on("cancel call", () => {
      console.log("Call cancelled by caller.");
      handleEndCall();
    });

    socket.on("call accepted", () => {
      console.log("Call accepted by remote user");
    });

    socket.on("call cancelled", () => {
      console.log("Call cancelled by caller.");
      setLocalStream(null);
      setRemoteStream(null);
      setIsCalling(false);
      setIsCallAccepted(false);
      setOutgoingCall(false);
      setIncomingCall(false);
    });

    socket.on("rejected call", () => {
      console.log("Call cancelled by caller.");
      setLocalStream(null);
      setRemoteStream(null);
      setIsCalling(false);
      setIsCallAccepted(false);
      setOutgoingCall(false);
      setIncomingCall(false);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket.io server.");
      setIsConnected(false);
      setIsCalling(false);
      setLocalStream(null);
      setRemoteStream(null);
      setIsCallAccepted(false);
      setSelectedUser(null);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const startLocalStream = async () => {
    try {
      const stream = await getUserMedia({ audio: true });
      setLocalStream(stream);
      return stream;
    } catch (error) {
      console.error("Error accessing local media:", error);
    }
  };

  const handleStartCall = async () => {
    try {
      const stream = await startLocalStream();
      setOutgoingCall(true);
      setIsCalling(true);
      setSelectedUser(otherUserId);
      setCallStartTime(new Date());
      socket.emit("call", {
        callerId: user._id,
        recipientId: otherUserId,
        username: user.username,
      });
      return stream;
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  const handleAcceptCall = async () => {
    setIsCallAccepted(true);
    setIncomingCall(false);
    try {
      handleStartCall();
      const stream = await startLocalStream();
      socket.emit("accept call", {
        callerId: user._id,
        recipientId: selectedUser,
      });
      setIsCallAccepted(true);
      const peer = new Peer({ initiator: true, stream });
      peer.on("signal", (data: SignalData) => {
        if (!peer.destroyed) {
          socket.emit("signal", { userId: selectedUser, signalData: data });
        }
      });
      peer.on("stream", (stream: MediaStream) => {
        setRemoteStream(stream);
      });

      socket.on("signal", (signal: SignalData) => {
        if (!peer.destroyed) {
          peer.signal(signal);
        }
      });
      return stream;
    } catch (error) {
      console.error("Error accepting call:", error);
    }
  };

  const handleRejectCall = () => {
    setIncomingCall(false);
    socket.emit("reject call", {
      callerId: user._id,
      recipientId: otherUserId,
    });
  };
  const handleEndCall = () => {
    setLocalStream(null);
    setRemoteStream(null);
    setIsCalling(false);
    setIsCallAccepted(false);
    setOutgoingCall(false);
    setIncomingCall(false);
    setSelectedUser(null);
    setCallStartTime(null);
    setCallDuration(0);
    socket.emit("cancel call", {
      callerId: user._id,
      recipientId: otherUserId,
    });
  };

  useEffect(() => {
    let interval: any = null;
    if (isCallAccepted && callStartTime) {
      interval = setInterval(() => {
        const duration = Math.floor(
          (new Date().getTime() - callStartTime.getTime()) / 1000
        );
        setCallDuration(duration);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isCallAccepted, callStartTime]);

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white shadow-md  shadow-red-100 text-white p-1 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <button className="text-black" onClick={goBack}>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-red-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
          </button>
          <h1 className="text-xl text-black font-bold">Voice Call</h1>
          <div>
            <span className="mr-2 ">Likes</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.99 4.5 2.49C13.09 3.99 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="h-screen flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
        </div>

        {incomingCall && !isCallAccepted && (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center absolute top-20"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg font-semibold mb-4 text-gray-800">
              Incoming Call...
            </p>
            <div className="flex items-center space-x-4 mb-4">
              <p className="text-lg font-semibold text-gray-800">{name}</p>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <motion.button
                onClick={handleAcceptCall}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Accept
              </motion.button>
              <motion.button
                onClick={handleRejectCall}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reject
              </motion.button>
            </div>
            <p className="text-md text-gray-600 mt-4">{callDuration}</p>
          </motion.div>
        )}
        {isCalling && (
          <motion.div
            className=" p-6 rounded-lg shadow-lg flex flex-col items-center w-full h-full "
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg font-semibold mb-4 text-gray-800">
              Calling...
            </p>
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center space-y-2 mb-4">
                <img
                  src="https://source.unsplash.com/random/200x200"
                  alt="Dummy"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <p className="text-xl font-semibold text-gray-800">{name}</p>
              </div>
            </div>

            <motion.button
              onClick={handleEndCall}
              className="bg-red-500 text-white absolute bottom-10 w-96 px-4 py-2 rounded-lg hover:bg-red-600 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              End Call
            </motion.button>
            <p className="text-md text-gray-600 mt-4">Call: {callDuration}</p>
          </motion.div>
        )}
        {!isCalling && !incomingCall ? (
          <motion.button
            onClick={handleStartCall}
            className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 shadow-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Start Call
          </motion.button>
        ) : null}
        {remoteStream && (
          <audio
            autoPlay
            className="mt-8"
            ref={(ref) => ref && (ref.srcObject = remoteStream)}
          />
        )}
      </div>
    </>
  );
}

export default VoiceCallPage;

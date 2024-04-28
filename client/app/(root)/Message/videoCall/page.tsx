"use client";
import React, { useState, useEffect } from "react";
import VideoCall from "@/components/VideoCalls";
import { useAppSelector } from "@/features/hooks";
import { getUserMedia } from "@/lib/utils";
import io from "socket.io-client";
import { useSearchParams, useRouter } from "next/navigation";
import Peer, { SignalData } from "simple-peer";
import CallIcon from "@mui/icons-material/Call";

const ENDPOINT = "http://localhost:3005";
let socket: any;

function VideoCallPage() {
  const user: any = useAppSelector((state) => state.auth.user);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isCalling, setIsCalling] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isCallAccepted, setIsCallAccepted] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [outgoingCall, setOutgoingCall] = useState<boolean>(false);
  const [incomingCall, setIncomingCall] = useState<boolean>(false);
  const [name, setName] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const otherUserId = searchParams.get("User");

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
      setSelectedUser(callerId);
      setName(username);
    });

    socket.on("cancel call", () => {
      console.log("Call cancelled by caller.");
      handleEndCall();
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
    
    

    socket.on("call accepted", () => {
      console.log("Call accepted by caller.");
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
      console.log("Disconnecting from socket.io server...");
      socket.disconnect();
    };
  }, []);

  const startLocalStream = async () => {
    try {
      const stream = await getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      return stream;
    } catch (error) {
      console.error("Error accessing local media:", error);
      throw error;
    }
  };

  const handleStartCall = async () => {
    try {
      const stream = await startLocalStream();
      setOutgoingCall(true);
      setIsCalling(true);
      setSelectedUser(otherUserId);
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

  const handleEndCall = () => {
    setLocalStream(null);
    setRemoteStream(null);
    setIsCalling(false);
    setIsCallAccepted(false);
    setOutgoingCall(false);
    setIsCallAccepted(false);
    setIncomingCall(false);
    setSelectedUser(null);
    socket.emit("cancel call", {
      callerId: user._id,
      recipientId: otherUserId,
    });
  };

  const handleAcceptCall = async () => {
    setIsCallAccepted(true);
    setIncomingCall(false);
    try {
      const stream = await startLocalStream();
      socket.emit("accept call", { callerId: user._id, recipientId: otherUserId});
      const peer = new Peer({ initiator: true, stream });
      peer.on("signal", (data: SignalData) => {
        if (!peer.destroyed) {
          socket.emit("signal", { userId: selectedUser, signalData: data });
        }
      });
      peer.on("stream", (remoteStream) => {
        setRemoteStream(remoteStream);
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
    handleEndCall();
    setIncomingCall(false);
    socket.emit("reject call", { callerId: user._id });
  };

  const handleCallAccepted: any = (stream: MediaStream) => {
    setRemoteStream(stream);
    setIsCallAccepted(true);
  };

  return (
    <div className="h-full  inset-0 -z-10 bg-black bg-[radial-gradient(#ff0000_1px,transparent_1px)] [background-size:20px_20px] lg:rounded-r-none lg:shadow-2xl bg-white opacity-90 mx-6 lg:mx-0 mb-8 lg:mb-0 flex flex-col justify-center ">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <h1 className="py-6 text-3xl font-bold text-gray-800 text-center ">
        {name}
      </h1>
      <div className="container relative w-full max-w-md mx-auto   rounded-lg overflow-hidden">
        {isConnected ? (
          <>
            {!isCalling && !incomingCall ? (
              <button
                className="btn start-call bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full mb-4 mx-auto block"
                onClick={handleStartCall}
              >
                <CallIcon className="mr-2" />
                Start Call
              </button>
            ) : (
              <>
                {isCallAccepted ? (
                  <VideoCall
                    localStream={localStream}
                    remoteStream={remoteStream}
                    onCallAccepted={handleCallAccepted}
                  />
                ) : null}
              </>
            )}
          </>
        ) : (
          <p className="text-lg text-gray-800 text-center">Connecting...</p>
        )}
      </div>
      {incomingCall && !isCallAccepted ? (
        <div className="call-options flex items-center justify-center">
          <p className="text-lg font-semibold text-gray-800 mr-4">
            Incoming Call...
          </p>
          <button
            className="btn accept bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full transition duration-300 ease-in-out"
            onClick={handleAcceptCall}
          >
            Accept
          </button>
          <button
            className="btn reject bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-full ml-2 transition duration-300 ease-in-out"
            onClick={handleRejectCall}
          >
            Reject
          </button>
        </div>
      ) : null}
      {isCallAccepted || isCalling ? (
        <div className="call-options flex items-center justify-center">
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-full ml-2 transition duration-300 ease-in-out"
            onClick={handleEndCall}
          >
            End Call
          </button>
        </div>
      ) : null}

      {isCalling && !isCallAccepted ? (
        <div className="call-options flex items-center justify-center">
          <p className="text-lg font-semibold text-gray-800 mr-4">Ringing</p>
        </div>
      ) : null}
    </div>
  );
}

export default VideoCallPage;

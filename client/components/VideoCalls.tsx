import React, { useRef, useEffect, useState } from "react";

interface VideoCallProps {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  onCallAccepted: (stream: MediaStream) => void;
}

const VideoCall: React.FC<VideoCallProps> = ({
  localStream,
  remoteStream,
  onCallAccepted,
}) => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const [callAccepted, setCallAccepted] = useState<boolean>(false);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  // const acceptCall = () => {
  //   setCallAccepted(true);
  //   // onCallAccepted(remoteStream); // Pass the remote stream to the parent component when call is accepted
  // };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="w-full h-full flex justify-center items-center">
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="remote-video w-screen h-[500px] object-cover"
        />
      </div>
      <div className="local-video-container absolute bottom-4 sm:bottom-10 left-4 sm:left-10 right-4 sm:right-auto w-20 max-w-120 h-auto z-2">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className="local-video w-full h-auto border-2 border-white rounded-md"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </div>
    </div>
  );
};

export default VideoCall;

import React, { useRef } from "react";

interface VideoPlayerProps {
  videoFile: string;
  isControls: boolean;
  videoType: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoFile,
  videoType,
  isControls,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      // Request fullscreen on various browsers
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).mozRequestFullScreen) {
        (videoRef.current as any).mozRequestFullScreen(); // Firefox
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen(); // Chrome, Safari, Opera
      } else if ((videoRef.current as any).msRequestFullscreen) {
        (videoRef.current as any).msRequestFullscreen(); // IE/Edge
      }
      videoRef.current.play(); // Start playback
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        onClick={handleVideoClick}
        autoPlay={false}
        controls={isControls}
        style={{ cursor: "pointer", width: "100%", height: "auto" }}
      >
        <source src={videoFile} type={videoType} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;

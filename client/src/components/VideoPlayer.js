import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import YouTubePlayer from "youtube-player";

const VideoPlayer = ({ videoId, src, title, author }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(videoId);
  const playerRef = useRef(null);

  useEffect(() => {
    if (currentVideoId) {
      if (!playerRef.current) {
        // Initialize the player only once
        playerRef.current = YouTubePlayer(`youtube-player-${currentVideoId}`, {
          videoId: currentVideoId,
          playerVars: {
            autoplay: 1,
            controls: 1,
            modestbranding: 1,
          },
        });

        playerRef.current.on("stateChange", (event) => {
          if (event.data === 0) {
            // Video ended
            playNextVideoInQueue();
          }
        });
      } else {
        playerRef.current.loadVideoById(currentVideoId);
      }

      setIsPlaying(true);
    }
  }, [currentVideoId]);

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNextVideoInQueue = () => {
    const queue = JSON.parse(localStorage.getItem("queue")) || [];
    if (queue.length > 0) {
      const nextVideo = queue.shift();
      const { id: nextVideoId } = nextVideo;

      localStorage.setItem("queue", JSON.stringify(queue));
      setCurrentVideoId(nextVideoId);
    } else {
      setIsPlaying(false);
      setCurrentVideoId(null);
    }
  };

  return (
    <div className="relative items-center flex justify-center h-64 w-52 bg-gray-50/5 rounded-xl ml-20">
      <div className="absolute flex-col top-0 left-0 w-full h-full backdrop-filter backdrop-blur-xl bg-gray-800/60 z-50 rounded-xl flex items-center justify-center text-white">
        <img
          src={src}
          alt="Video Thumbnail"
          className="w-36 h-36 border-2 rounded-md -mt-12"
        />
        <p className="font-semibold text-xl">{title}</p>
        <p className="font-light text-sm italic">{author}</p>
      </div>
      <div id={`youtube-player-${currentVideoId}`} className="hidden z-10" />
      <div className="absolute bottom-4 flex space-x-4 z-50">
        <button
          onClick={handlePlayPause}
          className={`pause-play-button ${isPlaying ? "play" : ""}`}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full text-white">
            {isPlaying ? (
              <FaPause style={{ fontSize: "24px" }} />
            ) : (
              <FaPlay style={{ fontSize: "24px" }} />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;

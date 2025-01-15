import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import YoutubePlayer from "youtube-player";

const YouTubeEmbed = ({ videoId, src, title, author }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(videoId);
  const playerRef = useRef(null);

  useEffect(() => {
    const ytPlayer = YoutubePlayer(playerRef.current, {
      videoId: currentVideoId,
      width: "1",
      height: "1",
      playerVars: {
        autoplay: 1,
        controls: 1,
        modestbranding: 1,
      },
    });

    playerRef.current = ytPlayer;

    // Add event listeners
    ytPlayer.on("stateChange", (event) => {
      if (event.data === 0) {
        // Video ended, play next video
        playNextVideoInQueue();
      }
    });

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
      setIsPlaying(true); // Auto-play the next video
    } else {
      setIsPlaying(false);
      setCurrentVideoId(null);
    }
  };

  return (
    <div className="relative items-center flex justify-center h-64 w-52 bg-gray-50/5 rounded-xl ml-20">
      <div className="absolute flex-col top-0 left-0 w-full h-full backdrop-filter backdrop-blur-xl bg-gray-800/60 z-10 rounded-xl flex items-center justify-center text-white">
        <img
          src={src}
          alt="Video Thumbnail"
          className="w-36 h-36 border-2 rounded-md -mt-12"
        />
        <p className="font-semibold text-xl">{title}</p>
        <p className="font-light text-sm italic">{author}</p>
      </div>
      {/* Hidden YouTube Player */}
      <div
        ref={playerRef}
        style={{ width: "1px", height: "1px", overflow: "hidden" }}
      ></div>
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

export default YouTubeEmbed;

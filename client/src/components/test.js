import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import YoutubePlayer from "youtube-player";

const nginig = ({ videoId, src, title, author }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(videoId);
  const [player, setPlayer] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const ytPlayer = YoutubePlayer(playerRef.current, {
      videoId,
      width: '1',
      height: '1',
    });
    setPlayer(ytPlayer);

    return () => {
      ytPlayer.destroy();
    };
  }, [videoId]);

  const handlePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const onReady = (event) => {
    // Store the player instance in the ref
    playerRef.current = event.target;
    event.target.playVideo(); // Autoplay the video
    setIsPlaying(true);
  };

  const onStateChange = (event) => {
    if (event.data === 0) {
      playNextVideoInQueue();
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
      <div className="absolute flex-col top-0 left-0 w-full h-full backdrop-filter backdrop-blur-xl bg-gray-800/60 z-10 rounded-xl flex items-center justify-center text-white">
        <img
          src={src}
          alt="Video Thumbnail"
          className="w-36 h-36 border-2 rounded-md -mt-12"
        />
        <p className="font-semibold text-xl">{title}</p>
        <p className="font-light text-sm italic">{author}</p>
      </div>
      <Youtube
        videoId={currentVideoId}
        className="z-50"
        opts={{
          playerVars: {
            autoplay: 1,
            controls: 1,
            modestbranding: 1,
          },
        }}
        onStateChange={onStateChange}
      />
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

export default nginig;
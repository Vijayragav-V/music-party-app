import React, { useEffect, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

const Video = ({ id, src, title, author}) => {
  const handleAddToQueue = () => {
    const videoMeta = {
      thumbnail: src,
      title: title,
      author: author
    };
    
    const currentQueue = JSON.parse(localStorage.getItem('queue')) || [];
    if (!currentQueue.includes(id)) {
      const updatedQueue = [...currentQueue, [{id:id, ...videoMeta }]];
      localStorage.setItem('queue', JSON.stringify(updatedQueue));
      console.log(`Added ${id} to queue:`, updatedQueue);
    } else {
      console.log(`${id} is already in the queue.`);
    }
  };
  
  return (
    <div className="flex flex-row items-center w-80 h-16 rounded-xl backdrop-blur-xl bg-gray-800/60 hover:scale-95 hover:bg-gray-500/60 text-white overflow-visible" onClick={handleAddToQueue}>
      <img
        src={src}
        alt="Video Thumbnail"
        className="w-12 h-12 rounded-md object-cover ml-3"
      />
      <div className='flex-col ml-3'>
        <p className="text-xs font-bold mr-1.5 overflow-hidden text-ellipsis whitespace-normal max-h-[3rem]">{title}</p>
        <p className="text-xs italic font-light">{author}</p>
      </div>
    </div>
  );
};

export default Video;
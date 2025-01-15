import React from "react";
import YouTubeEmbed from "./components/test";
import VideoSearch from "./components/VideoSearch";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div>
      <div className="flex items-center justify-start h-screen w-screen bg-gradient-to-b from-green-500 to-blue-500">
        <YouTubeEmbed videoId={'cOGGQT4vPRs'} src={'https://i.ytimg.com/vi/cOGGQT4vPRs/default.jpg'} title={'Evil Jordan'} author={'Playboi Carti'}/>
        <div className="flex h-64 w-full justify-center">
          <div className="w-96">
            <VideoSearch/>
          </div>
          
        </div>
        
      </div>
    </div>
  );
}

export default App;
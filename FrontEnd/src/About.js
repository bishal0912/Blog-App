import React from 'react';
import ReactPlayer from 'react-player';
import "./css/about.css"
import { useNavigate} from "react-router-dom";
const VIDEO_PATH = 'https://www.youtube.com/watch?v=XG0ozyTh7X0';

export default function () {
  const navigate = useNavigate();

  const go_back = () => {
    navigate('/posts');
}


  return (
    <div>
      <button className="about-back-button" onClick={go_back}>Go Back</button>
        <h1 className='about-heading'>About</h1>
        <ReactPlayer className="about-video-player" url={VIDEO_PATH} controls={true} autoplay={true}/>
        <p class="made-with">Made with ❤️ by Bishal Sarkar</p>
    </div>
  )
}

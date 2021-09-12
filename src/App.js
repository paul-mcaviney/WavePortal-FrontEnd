import * as React from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  const wave = () => {
    
  }
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Welcome To The Wave Factory! 👋
        </div>

        <div className="bio">
        The name's Paul and this is a space online that you can <span class="blue-word">send me waves</span>. It might not seem like much but each wave adds one point to my self-esteem. Wow! So be sure to hit that wave button and help me feel good about myself!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
      </div>
    </div>
  );
}

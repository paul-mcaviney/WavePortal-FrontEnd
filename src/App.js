import * as React from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/WavePortal.json";

export default function App() {
  
  // A state variable we use to store the user's public wallet address
  const [currAccount, setCurrentAccount] = React.useState("");
  const contractAddress = "0xe30FFC5a91301F28650b19F9275EDAF492F26a05";
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = () => {

    //First make sure we have access to window.Ethereum
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return
    } else {
      console.log("We have the ethereum object", ethereum)
    }

    // Check if we're authorized to access user's account 
    ethereum.request({ method: 'eth_accounts' })
    .then(accounts => {
      // We could have multiple accounts. Check for one
      if(accounts.length !== 0) {
        // Grab the first account we have access to
        const account = accounts[0];
        console.log("Found an authorized account: ", account);

        // Store the user's public wallet address for later
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    })
  }

  const connectWallet = () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Get metamask!");
    }

    ethereum.request({ method: 'eth_requestAccounts' })
    .then(accounts => {
      console.log("Connected Wallet ", accounts[0]);
      setCurrentAccount(accounts[0]);
    })
    .catch(err => console.log(err));
  }

  // const displayWaves = async () => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner;
  //   const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

  //   let numberOfWaves = await wavePortalContract.getTotalWaves();
  //   console.log("NUMBER: ", numberOfWaves);
  //   return numberOfWaves;

  // }

  const wave = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

    let count = await wavePortalContract.getTotalWaves();
    console.log("Total wave count retrieved: ", count.toNumber());

    const waveTxn = await wavePortalContract.wave();
    console.log("Mining... ", waveTxn.hash);
    await waveTxn.wait();
    console.log("Mined -- ", waveTxn.hash);

    count = await wavePortalContract.getTotalWaves();
    console.log("(updated) Total wave count retrieved: ", count.toNumber());
  }

  // This runs our function when the page loads
  React.useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
  

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Welcome To The Wave Factory! 👋
        </div>

        <div className="bio">
        The name's Paul and this is a space online that you can <span class="blue-word">send me waves</span> and store it on the Ethereum blockchain. It might not seem like much but each wave adds one point to my self-esteem. Wow! So be sure to <span class="blue-word">hit that wave button</span> and help me feel good about myself!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>

        {currAccount ? null : (
          <button className="waveButton walletButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

      </div>
    </div>
  );
}

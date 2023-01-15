import React, { useState } from "react";

import WheelComponent from "./weel";
import "react-wheel-of-prizes/dist/index.css";
import "./styles.css";
import IMAGES from "./assets";
import { useSubstrateState } from '../../../substrate-lib'
import TrPortal from "./portal";
import Confetti from "react-confetti";


// Import the API, Keyring and some utility functions
import { ApiPromise, WsProvider } from '@polkadot/api';

export default function App() {

  const [appState, setAppState] = useState({
    portal: false,
    show: false,
  })

  console.log("hi")

  const { currentAccount } = useSubstrateState()
  const accountAddr = currentAccount.address;
  console.log(accountAddr, currentAccount)

  console.log(appState.show);

  let objIndex = {
    "NFT 1": 1,
    "NFT 2": 2,
    "NFT 3": 3,
    "NFT 4": 4,
    "NFT 5": 5,
    "NFT 6": 6,
    "NFT 7": 7,
    "NFT 8": 8,
    "NFT 9": 9,
  }
  const segments = [
    "NFT 1",
    "NFT 2",
    "NFT 3",
    "NFT 4",
    "NFT 5",
    "NFT 6",
    "NFT 7",
    "NFT 8",
    "NFT 9",
  ];

  const weelColors = () => {
    let arr = [];
    let colors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
    segments.forEach((el) => {
      let color = colors.shift();
      arr.push(color);
      colors.push(color);
    });

    return arr;
  };
  const segColors = weelColors();

  // const rand = () => {
  //   return setTimeout(() => {
  //     return segments[Math.floor(Math.random() * segments.length)];
  //   }, 5000);
  // };
  async function onFinished(winner) {
    // Construct
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');

    const api = await ApiPromise.create({ provider: wsProvider });

    try {
      const submitExtrinsic = api.tx.kittiesModule.createKitty();
      submitExtrinsic.signAndSend(currentAccount);
    }
    catch (error) {
      console.log(error);
    }

    // console.log(winner.split(" ")[1]);
    setAppState({ portal: false, show: winner });
  };


  return (
    <div
      // id="pankaj"
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "150px",
        paddingBottom: "150px",
        backgroundColor: "#f5f2fa",
      }}
    >
      {appState.show && <Confetti width={1600} height={1019} />}
      <WheelComponent
        segments={segments}
        segColors={segColors}
        winningSegment={"8"}
        onFinished={(winner) => onFinished(winner)}
        primaryColor="gray"
        contrastColor="white"
        buttonText="Spin"
        isOnlyOnce={true}
      />
      {appState.portal ? <TrPortal /> : null}
      {appState.show && (
        // modal
        <div className="box">
          <div className="imageBox">
            <img src={IMAGES[`image${objIndex[appState.show]}`]} alt="" />
          </div>
          <h2 className="titleWin">
            CONGRATULATIONS!!! YOU HAVE WON {appState.show} !!!
          </h2>
          <div className="closeContainer">
            <button
              className="closepankaj"
              onClick={() => setAppState({ show: false })}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

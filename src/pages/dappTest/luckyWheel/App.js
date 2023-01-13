import React, { Component } from "react";

import WheelComponent from "./weel";
import "react-wheel-of-prizes/dist/index.css";
import "./styles.css";
import IMAGES from "./assets";

import TrPortal from "./portal";
import Confetti from "react-confetti";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portal: false,
      show: false,
    };
  }

  render() {
    console.log(this.state.show);
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
      "NFT 10": 10
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
      "NFT 10",
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
    const onFinished = (winner) => {
      this.setState({ portal: false, show: winner });
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
        {this.state.show && <Confetti width={1600} height={1019} />}
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
        {this.state.portal ? <TrPortal /> : null}
        {this.state.show && (
          // modal
          <div className="box">
            <div className="imageBox">
              <img src={IMAGES[`image${objIndex[this.state.show]}`]} alt="" />
            </div>
            <h2 className="titleWin">
              CONGRATULATIONS!!! YOU HAVE WON {this.state.show} !!!
            </h2>
            <div className="closeContainer">
              <button
                className="closepankaj"
                onClick={() => this.setState({ show: false })}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

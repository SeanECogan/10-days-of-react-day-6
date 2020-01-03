import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import ScotchInfoBar from "./ScotchInfoBar";

import "./styles.css";

function App() {
  const MOVEMENT_AMOUNT = 50;

  const [boxIsFollowingMouse, setBoxIsFollowingMouse] = useState(false);
  const [boxXOffset, setBoxXOffset] = useState(window.innerWidth / 2 - 75);
  const [boxYOffset, setBoxYOffset] = useState(window.innerHeight / 2 - 75);

  useEffect(() => {
    const onMouseMove = e => {
      if (boxIsFollowingMouse) {
        setBoxXOffset(e.clientX + 5);
        setBoxYOffset(e.clientY + 5);
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  });

  return (
    <div className="App">
      <h1>Move the Box!</h1>

      <div>
        <label>
          <input
            type="checkbox"
            checked={boxIsFollowingMouse}
            onChange={e => setBoxIsFollowingMouse(e.target.checked)}
          />
          Box Follows Mouse
        </label>
      </div>

      <div>
        <button onClick={e => setBoxYOffset(boxYOffset + MOVEMENT_AMOUNT)}>
          Move Down
        </button>
        <button onClick={e => setBoxYOffset(boxYOffset - MOVEMENT_AMOUNT)}>
          Move Up
        </button>
        <button onClick={e => setBoxXOffset(boxXOffset - MOVEMENT_AMOUNT)}>
          Move Left
        </button>
        <button onClick={e => setBoxXOffset(boxXOffset + MOVEMENT_AMOUNT)}>
          Move Right
        </button>
      </div>

      <div
        className="box"
        style={{
          left: boxXOffset,
          top: boxYOffset,
          transition: boxIsFollowingMouse
            ? "none"
            : "0.3s cubic-bezier(0.56, 0.2, 0.46, 1.27) all"
        }}
      />

      <ScotchInfoBar day="6" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

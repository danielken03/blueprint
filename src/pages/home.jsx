import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// which pips light up for each value (order matches the CSS grid-areas)
const PIP_LAYOUTS = {
  1: [3],
  2: [1, 5],
  3: [1, 3, 5],
  4: [1, 2, 4, 5],
  5: [1, 2, 3, 4, 5],
  6: [1, 2, 4, 5, 6, 7],
};

function Home() {
  const [value, setValue] = useState(6);
  const [rolling, setRolling] = useState(false);
  const intervalRef = useRef(null);

  function rollDie() {
    if (rolling) return;
    setRolling(true);

    // flicker through random faces while "rolling"
    intervalRef.current = setInterval(() => {
      setValue(Math.floor(Math.random() * 6) + 1);
    }, 80);

    // settle on a final value after 600ms
    setTimeout(() => {
      clearInterval(intervalRef.current);
      setValue(Math.floor(Math.random() * 6) + 1);
      setRolling(false);
    }, 600);
  }

  return (
    <main className="blueprint">
      <h1>
        BLUEPRINT
        <br />
        - WORK IN PROGRESS -
      </h1>

      <Link to="/about">
        <button className="blueprint-button">ENTER</button>
      </Link>

      <div className="dice-area">
        <div
          className={`die ${rolling ? "rolling" : ""}`}
          onClick={rollDie}
          role="button"
          aria-label="Roll the die"
        >
          {[1, 2, 3, 4, 5, 6, 7].map((pos) => (
            <span
              key={pos}
              className="pip"
              style={{
                visibility: PIP_LAYOUTS[value].includes(pos)
                  ? "visible"
                  : "hidden",
              }}
            />
          ))}
        </div>
        <span className="dice-label">CLICK TO ROLL</span>
      </div>
    </main>
  );
}

export default Home;

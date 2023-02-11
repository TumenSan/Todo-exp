import "./styles.css";
import React, { useState, useEffect, useRef } from "react";
import TaskPanel from "./components/TaskPanel/TaskPanel";

export default function App() {
  /*
  const [seconds, setSeconds] = useState(0);
  const [isStarted, setStarted] = useState(false);
  const ref = useRef(0);
  useEffect(() => {
    if (isStarted) {
      ref.current = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(ref.current);
      setSeconds(0);
    }
  }, [isStarted]);
  */
  /*
  const [seconds, setSeconds] = useState(0);
  const [isStarted, setStarted] = useState(false);

  useEffect(() => {
    let timeoutObj;
    if (isStarted) {
      timeoutObj = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (isStarted) {
        clearInterval(timeoutObj);
      }
    };
  }, [isStarted]);
*/
  const [seconds, setSeconds] = useState(0);
  const [isStarted, setStarted] = useState(false);

  useEffect(() => {
    if (!isStarted) {
      return;
    }
    let timeoutObj = window.setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(timeoutObj);
    };
  }, [isStarted]);

  return (
    <div className="App">
      <p>{seconds}</p>
      <button onClick={() => setStarted(true)} className="btn toggle-btn">
        Start
      </button>
      <button onClick={() => setStarted(false)} className="btn toggle-btn">
        Stop
      </button>
      <TaskPanel />
    </div>
  );
}

'use client'
import React, { useState, useEffect } from "react";

const Timer = () => {
  const [time, setTime] = useState(5 * 60); // 5 minutes in seconds
  let interval: any;

  useEffect(() => {
    if (time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (time === 0) {
      setTime(5 * 60); // Restart the timer after reaching 0
    }

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const formatTime = (seconds : any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}.${formattedSeconds}`;
  };

  return (
    <div>
      <span>{formatTime(time)}</span>
    </div>
  );
};

export default Timer;

import React, { useState, useEffect } from 'react';

const Stopwatch = ({ isActive }) => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    let interval = null
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1)
      }, 1000)
    } else if (!isActive) {
      clearInterval(interval)
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (totalSeconds) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
    const secs = String(totalSeconds % 60).padStart(2, '0')
    return `${minutes}:${secs}`
  };

  return (
    <span>
      Time: {formatTime(seconds)}
    </span>
  );
};

export default Stopwatch

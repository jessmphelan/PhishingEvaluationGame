import React, { useState, useEffect } from 'react';

// const Timer = ({ initialMinute = 1, size = 80, strokeWidth = 4 }) => {
const Timer = ({ initialMinute = 1, width = 300, height = 20, strokeWidth = 4, onTimerEnd}) => {
  const [seconds, setSeconds] = useState(initialMinute * 60);
  // const radius = (size - strokeWidth) / 2;
  // const circumference = radius * 2 * Math.PI;
  // const offset = circumference - (seconds / (initialMinute * 60)) * circumference;
  const fullWidth = width - strokeWidth * 2; // Adjust the width for the stroke
  const progressWidth = (seconds / (initialMinute * 60)) * fullWidth;

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timerId);
    }
    else {
    if (onTimerEnd) {
      onTimerEnd(); // Call the callback function if it is defined
      }
    }
  }, [seconds, onTimerEnd]);

  return (
    // <div style={{ position: 'relative', width: size, height: size }}>
    //   <svg width={size} height={size}>
    //     <circle
    //       stroke="gray"
    //       fill="transparent"
    //       strokeWidth={strokeWidth}
    //       strokeDasharray={circumference + ' ' + circumference}
    //       style={{ strokeDashoffset: offset }}
    //       r={radius}
    //       cx={size / 2}
    //       cy={size / 2}
    //     />
    //   </svg>
    <div style={{
      position: 'relative',
      width: width,
      height: height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f0f0f0',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }}>
      <div style={{
        height: '100%',
        width: `${progressWidth}px`,
        background: '#6699CC',
        transition: 'width 1s linear',
        willChange: 'width',
        position: 'absolute', // Make the div positioned absolutely
        right: 0, // Align the progress bar to the right
      }}></div>
      <span style={{
        zIndex: 2,
        color: 'black',
        fontSize: '1em',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        position: 'relative', // Ensure text is positioned above the progress bar
      }}>
        {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
        </span>
      </div>
  );
};

export default Timer;

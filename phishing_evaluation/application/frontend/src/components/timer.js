import React, { useState, useEffect } from 'react';

const Timer = ({ initialMinute = 1, width = 300, height = 40, strokeWidth = 4, onTimerEnd}) => {
  const [seconds, setSeconds] = useState(initialMinute * 60);
 
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

  let backgroundColor = '#6699CC';
  if (seconds <= 10){
    if (seconds % 2 == 0){
      backgroundColor = '#ff6865'
    }
  }

  return (
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
        background: backgroundColor,
        transition: 'width 1s linear',
        willChange: 'width',
        position: 'absolute', // Make the div positioned absolutely
        right: 0, // Align the progress bar to the right
      }}>
       <img src="/images/fish1.png" alt="Fish" style={{
          height: '100%',
          position: 'absolute',
          right: `${progressWidth-40}px`, 
          transition: 'right 1s linear', // Make the fish move smoothly
        }} />  
       <img src="/images/shark.png" alt="Fish" style={{
          height: '100%',
          position: 'absolute',
          right: 0, 
          transition: 'right 1s linear', // Make the fish move smoothly
        }} />
      </div>
      
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

import React, { useState, useEffect } from 'react';

const Timer = ({ initialMinute = 1, width = 300, height = 40, strokeWidth = 4, onTimerEnd}) => {
  const [seconds, setSeconds] = useState(initialMinute * 60); 
  const progressWidth = (seconds / (initialMinute * 60)) * 100;

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
        if (seconds % 2 === 0){
          backgroundColor = '#ff6865'
        }
      }

    const Parentdiv = {
        display: 'flex',
        height: 20,
        width: '80%',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        margin: '20px auto',
        overflow: 'hidden', // Ensure the child div rounded corners are visible
    };

    const Childdiv = {
        height: '100%',
        width: `${progressWidth}%`,
        backgroundColor: backgroundColor,
        borderRadius: 40,
        textAlign: 'right',
        transition: 'width 0.3s ease-in-out', // Smooth transition for width change
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 10, // Padding to avoid text overflow
    };

    const progresstext = {
        position: 'absolute',
        marginTop: '30px',
        // top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#1c4072',
        fontWeight: 400, // Increased font weight for better readability
        zIndex: 2,
    };

    return (
      
        <div style={Parentdiv}>
            <div style={Childdiv}>
            <img src="/images/fish1.png" alt="Fish" style={{
              height: '30px',
              position: 'relative',
              left: `5px`, 
              transition: 'right 1s linear', // Make the fish move smoothly
            }} />  
          <img src="/images/shark.png" alt="Fish" style={{
              height: '40px',
              position: 'absolute',
              left: '9%', 
              transition: 'right 1s linear', // Make the fish move smoothly
            }} />


                
            </div>
            <span style={progresstext}>
              {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
            </span>
        </div>
    )
};

export default Timer;
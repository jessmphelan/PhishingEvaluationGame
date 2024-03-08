import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Timer from './timer.js';
import axios from 'axios';

const EmailEvaluation = () => {
  const [currentEmail, setCurrentEmail] = useState(null);
  const [userResponse, setUserResponse] = useState({ type: '' });
  const [emailCount, setEmailCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (emailCount < 10) {
      fetchNextEmail();
    } else {
      navigate('/untimed_section');
    }
  }, [emailCount, navigate]);

  const handleTimerEnd = () => {
    setEmailCount(count => count + 1);
  };

  const fetchNextEmail = () => {
    axios.get('http://127.0.0.1:5000/api/next_email')
      .then(response => {
        console.log("Received email data:", response.data);
        setCurrentEmail(response.data);
        setStartTime(Date.now());
      })
      .catch(error => {
        console.error('Error fetching email:', error);
      });
  };

  const handleResponse = (value, BtnID) => {
    const endTime = Date.now(); // End time- when selection is made
    const elapsedTime = (endTime - startTime) / 1000; // Elapsed time in seconds
    setUserResponse({ type: value, elapsedTime: elapsedTime });
    document.getElementById(BtnID).style.backgroundColor = '#2a5a9e'; // Change the color of the button when clicked

    // Automatically navigate or fetch the next email after a delay
    setTimeout(() => {
      if (emailCount < 9) {
        setEmailCount(current => current + 1); // Proceed to the next email
      } else {
        navigate('/untimed_section'); // Navigate away after the last email
      }
    }, 500); // Adjust delay as needed
  };

  return (
    <div style={{ position: 'relative' }} className="email-evaluation-container">
      <h1>Phishing Email Evaluation</h1>
      <p>Please click the appropriate button below to classify the email. You have one minute to make your selection.</p>
      <Timer key={emailCount} initialMinute={1} onTimerEnd={handleTimerEnd} width={300} height={40} strokeWidth={4}/>
      <div className="email-container">
        {currentEmail ?
          currentEmail.content.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))
          : 'Loading email...'}
      </div>
      <h3>Email Type</h3>
      <div className="evaluation-section">
        <div className="column">
          <button id="PhishBtn" onClick={() => handleResponse('Phishing Email', 'PhishBtn')}>Phishing Email</button>
          <button id="RealBtn" onClick={() => handleResponse('Real Email', 'RealBtn')}>Real Email</button>
        </div>
      </div>
    </div>
  );
};

export default EmailEvaluation;

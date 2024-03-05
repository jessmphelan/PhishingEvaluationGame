import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Timer from './timer.js';
import axios from 'axios';

const EmailEvaluation = () => {
  const [currentEmail, setCurrentEmail] = useState(null);
  const [userResponse, setUserResponse] = useState({ source: '', type: '' });
  const [emailCount, setEmailCount] = useState(0); 
  const [startTime, setStartTime] = useState(null);
  const navigate = useNavigate();


  const resetButtonColors = () => {
    document.getElementById('PhishBtn').style.backgroundColor = ''; 
    document.getElementById('RealBtn').style.backgroundColor = '';
  };

  useEffect(() => {
    if (emailCount < 10) {
      fetchNextEmail();
    } else {
      // After 10 emails have been evaluated, navigate to the untimed_section
      navigate('/untimed_section');
    }
  }, [emailCount, navigate]); // Depend on emailCount to trigger the effect

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

  const handleResponse = (field, value, BtnID) => {
    const endTime = Date.now();
    const elapsedTime = (endTime - startTime) / 1000;
    setUserResponse({ ...userResponse, [field]: value, elapsedTime: elapsedTime });
    document.getElementById(BtnID).style.backgroundColor = '#2a5a9e';

    // Save the response
    axios.post('http://127.0.0.1:5000/api/save_response', {
      emailId: currentEmail.email_id,
      response: userResponse
    })
    .then(() => {
      setUserResponse({ source: '', type: '', elapsedTime: null });
      resetButtonColors();
      if (emailCount < 9) {
        setEmailCount(current => current + 1);
      } else {
        navigate('/untimed_section');
      }
    })
    .catch(error => {
      console.error('Error saving response:', error);
    });
  };

  return (
    <div style={{ position: 'relative' }} className="email-evaluation-container">
      <h1>Phishing Email Evaluation</h1>
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <Timer key={emailCount} initialMinute={1} onTimerEnd={handleTimerEnd} width={300} height={20} strokeWidth={4} />
      </div>
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
      <div className="evaluation-section">
          <button className="emailTypeButton" id="PhishBtn" onClick={() => handleResponse('type', 'Phishing Email', 'PhishBtn')}>Phishing</button>
          <button className="emailTypeButton" id="RealBtn" onClick={() => handleResponse('type', 'Real Email', 'RealBtn')}>Real</button>
      </div>
    </div>
  );
};

export default EmailEvaluation;

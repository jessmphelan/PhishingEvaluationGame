import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Timer from './timer.js';
import axios from 'axios';

const EmailEvaluation = () => {
  const [currentEmail, setCurrentEmail] = useState(null);
  const [userResponse, setUserResponse] = useState({ evaluatorType: '', emailType: '' });
  const navigate = useNavigate();


  const handleTimerEnd = () => {
    navigate('/untimed_section'); 
  };

  useEffect(() => {
    fetchNextEmail();
  }, []);

  const fetchNextEmail = () => {
    axios.get('http://127.0.0.1:5000/api/next_email')
    .then(response => {
      console.log("Received email data:", response.data);
      setCurrentEmail(response.data);
    })
    .catch(error => {
      console.error('Error fetching email:', error);
    });
  };

  const handleResponse = (field, value, BtnID) => {
    setUserResponse({ ...userResponse, [field]: value });
    document.getElementById(BtnID).style.backgroundColor = '#2a5a9e'; // Change the color of the button when clicked
  };


  const handleNextEmail = () => {
    if (!userResponse.evaluatorType || !userResponse.emailType) {
      alert("Please make a selection for both evaluator type and email type.");
      return; // Stop the function if either response is missing
    }
    
    // Save the current response to the database
    axios.post('http://127.0.0.1:5000/api/save_response', {
      emailId: currentEmail.email_id,
      response: userResponse
    })
      .then(() => {
        fetchNextEmail();
        setUserResponse({ evaluatorType: '', emailType: '' }); // Resetting the user response for the next evaluation
      })
      .catch(error => {
        console.error('Error saving response:', error);
      });
  };
  
  return (
    <div style={{ position: 'relative' }} className="email-evaluation-container">
      <h1>Phishing Email Evaluation</h1>
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        {/* <Timer /> */}
        <Timer initialMinute={1} onTimerEnd={handleTimerEnd} width={300} height={20} strokeWidth={4} />
      </div>
      {/* <div className="email-container">
        {currentEmail ? currentEmail.content : 'Loading email...'}
      </div> */}
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
        <div className="column">
          <h3>Evaluator Type</h3>
          <button id="LLMBtn" onClick={() => handleResponse('evaluatorType', 'LLM', 'LLMBtn')}>LLM</button>
          <button id="HumanBtn" onClick={() => handleResponse('evaluatorType', 'Human', 'HumanBtn')}>Human</button>
        </div>
        <div className="column">
          <h3>Email Type</h3>
          <button id="PhishBtn" onClick={() => handleResponse('emailType', 'Phishing Email', 'PhishBtn')}>Phishing Email</button>
          <button id="RealBtn" onClick={() => handleResponse('emailType', 'Real Email', 'RealBtn')}>Real Email</button>
        </div>
      </div>
      <button onClick={handleNextEmail}>Next Email</button>
    </div>
  );
};

export default EmailEvaluation;

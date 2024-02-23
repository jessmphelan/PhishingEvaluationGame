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

  const handleResponse = (field, value) => {
    setUserResponse({ ...userResponse, [field]: value });
    
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
          <button onClick={() => handleResponse('evaluatorType', 'LLM')}>LLM</button>
          <button onClick={() => handleResponse('evaluatorType', 'Human')}>Human</button>
        </div>
        <div className="column">
          <h3>Email Type</h3>
          <button onClick={() => handleResponse('emailType', 'Phishing Email')}>Phishing Email</button>
          <button onClick={() => handleResponse('emailType', 'Real Email')}>Real Email</button>
        </div>
      </div>
      <button onClick={handleNextEmail}>Next Email</button>
    </div>
  );
};

export default EmailEvaluation;

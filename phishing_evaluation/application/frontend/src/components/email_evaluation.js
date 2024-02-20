import React, { useState, useEffect } from 'react';
import Timer from './timer.js';
import axios from 'axios';

const EmailEvaluation = () => {
  const [currentEmail, setCurrentEmail] = useState(null);
  const [userResponse, setUserResponse] = useState({ evaluatorType: '', emailType: '' });

  // Fetch the first email when the component mounts
  useEffect(() => {
    fetchNextEmail();
  }, []);

  const fetchNextEmail = () => {
    // Fetch the next email from your database or API
    // For example, using axios: axios.get('/api/next-email').then(response => setCurrentEmail(response.data));
    axios.get('http://127.0.0.1:5000/api/next-email')
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
    // Optionally, you can also send this response to your database here
  };

  const handleNextEmail = () => {
    // Save the current response to the database
    axios.post('http://127.0.0.1:5000/api/save-response', { emailId: currentEmail?.id, response: userResponse })
      .then(() => {
        fetchNextEmail();
        setUserResponse({ evaluatorType: '', emailType: '' });
      })
      .catch(error => {
        console.error('Error saving response:', error);
      });
    //fetchNextEmail();
  };

  return (
    <div style={{ position: 'relative' }} className="email-evaluation-container">
      <h1>Phishing Email Evaluation</h1>
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <Timer />
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

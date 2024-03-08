import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProgressBar from './progress_bar.js';

const UntimedSection = () => {
  const [currentEmail, setCurrentEmail] = useState(null);
  const [userResponse, setUserResponse] = useState({ type: '', userTextResponse: '' });
  const [emailCount, setEmailCount] = useState(0);
  const [startTime, setStartTime] = useState(Date.now()); 
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNextEmail();
  }, []);

  const fetchNextEmail = () => {
    axios.get('http://127.0.0.1:5000/api/next_email')
    .then(response => {
      console.log(response)
      setCurrentEmail(response.data);
      setStartTime(Date.now());
    })
    .catch(error => {
      console.error('Error fetching email:', error);
    });
  };

  const handleResponse = (field, value) => {
    const endTime = Date.now(); 
    const elapsedTime = (endTime - startTime) / 1000; 
    setUserResponse({ ...userResponse, [field]: value , elapsedTime: elapsedTime });
  };

  const handleNextEmail = () => {
    axios.post('http://127.0.0.1:5000/api/save_response', { emailId: currentEmail.email_id, response: userResponse })
      .then(() => {
        fetchNextEmail();
        setUserResponse({type: '' });
      })
      .catch(error => {
        console.error('Error saving response:', error);
      });


    setEmailCount(prevCount => {
      const updatedCount = prevCount + 1;
      if (updatedCount >= 5) {
        navigate('/score'); 
      }
      return updatedCount;
    });

    setProgress((oldProgress) => {
      const newProgress = oldProgress + 20;
      if (newProgress >= 100) {
        return 100;
      }
      return newProgress;
      console.log(newProgress);
    });
  };

  return (
    <div>
    <div style={{ position: 'relative' }} className="email-evaluation-container">
      <h1>Phishing Email Evaluation</h1>
      <h4>Please classify the email in the dropdown menu below and provide a brief explanation of your reasoning. </h4>
      <ProgressBar progress={progress} />
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
         <div className="form-group">
            <label>Email Type:</label>
            <select 
              value={userResponse.type} 
              aria-label="Select Email Type" 
              onChange={e => handleResponse('type', e.target.value)}
            >
              <option value="">Select...</option>
              <option value="Phishing Email">Phishing Email</option>
              <option value="Real Email">Real Email</option>
            </select>

        </div>
        <div className="form-group">
            <textarea 
                value={userResponse.userTextResponse} 
                onChange={e => handleResponse('userTextResponse', e.target.value)}
                rows="6" // Adjust the number of rows as needed to change the height
                style={{width: '300px'}}
                placeholder= "Please input your explanation or reasoning here"
            />
            {/* <input 
                type="text" 
                value={userResponse.userTextResponse} 
                onChange={e => handleResponse('userTextResponse', e.target.value)}
                rows="4"
            /> */}
        </div>
      </div>
      <button className="startEvaluationButton" aria-label="Next Email" onClick={handleNextEmail}>Next Email</button>
    </div>
  </div>
  );
};

export default UntimedSection;
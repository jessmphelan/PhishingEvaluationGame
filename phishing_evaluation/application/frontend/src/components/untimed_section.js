import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProgressBar from './progress_bar.js';

import { usePlayerID } from './playerID_context';


const UntimedSection = () => {
  const [currentEmail, setCurrentEmail] = useState(null);
  const [userResponse, setUserResponse] = useState({ type: '', userTextResponse: '' });
  const [emailCount, setEmailCount] = useState(0);
  const [startTime, setStartTime] = useState(Date.now()); 
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const { playerID } = usePlayerID();

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

  const handleMouseUp = () => {
    const highlightedText = window.getSelection().toString().trim();
    if (highlightedText) {
      setUserResponse((prevResponse) => ({
        ...prevResponse,
        highlightedText: highlightedText,
      }));
    }
  };
  


  const handleResponse = (field, value) => {
    const endTime = Date.now(); 
    const elapsedTime = (endTime - startTime) / 1000; 
    setUserResponse({ ...userResponse, [field]: value , elapsedTime: elapsedTime });
  };

  const handleNextEmail = () => {

    if (userResponse.userTextResponse.trim().length === 0) {
      alert('Please write at least one to two sentences explaining the reasoning behind your selection.');
      return; // Prevent moving forward if the check fails
    }

    const payload = {
      playerID: playerID, 
      emailId: currentEmail.email_id, 
      response: { 
        ...userResponse, 
        highlightedText: userResponse.highlightedText 
      },
    };

    console.log(payload); 

    axios.post('http://127.0.0.1:5000/api/save_response', payload)
      .then(() => {
        fetchNextEmail();
        setUserResponse({ type: '', userTextResponse: '', highlightedText: '' });
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

    // setProgress((oldProgress) => {
    //   const increment = 100 / 3; // One third of the progress
    //   // Calculate new progress and round to two decimal places
    //   let newProgress = oldProgress + increment;
    //   // Round to two decimal places
    //   newProgress = Math.round(newProgress * 100) % 100;
    //   return newProgress > 100 ? 100 : newProgress;
    // });
   
  };

  return (
    <div>
    <div style={{ position: 'relative' }} className="email-evaluation-container">
      <h1>Phishing Email Evaluation</h1>
      <p style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'left' }}>Please click the appropriate email type selection below to classify the email and 
      provide a brief explanation for your reasoning. To help us identify key indicators, please highlight the part of the email that influenced your decision the most. 
      Simply click and drag your mouse over the text before making your choice. The selection might not change color, but it will be captured. 
      </p>
      <ProgressBar progress={progress} />
      <div className="email-container" onMouseUp={handleMouseUp}>
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
                className="customPlaceholder"
                value={userResponse.userTextResponse} 
                onChange={e => handleResponse('userTextResponse', e.target.value)}
                rows="6" // Adjust the number of rows as needed to change the height
                //style={{width: '300px'}}
                style={{width: '100%', height: '96px', padding: '10px'}}
                //style={{width: '800px', padding: '10px'}} 
                placeholder="Please write one to two sentences explaining the reasoning behind your selection"
            />
        </div> 
      </div>
      <button className="startEvaluationButton" aria-label="Next Email" onClick={handleNextEmail}>Next Email</button>
    </div>
    
  </div>
  );
};

export default UntimedSection;
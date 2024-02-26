import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UntimedSection = () => {
  const [currentEmail, setCurrentEmail] = useState(null);
  const [userResponse, setUserResponse] = useState({ emailType: '', userTextResponse: '' });
  const [emailCount, setEmailCount] = useState(0);
  const [startTime, setStartTime] = useState(Date.now()); 
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
        setUserResponse({emailType: '' });
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
  };

  return (
    <div style={{ position: 'relative' }} className="email-evaluation-container">
      <h1>Phishing Email Evaluation Untimed Section</h1>

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
              value={userResponse.emailType} 
              aria-label="Select Email Type" 
              onChange={e => handleResponse('emailType', e.target.value)}
            >
              <option value="">Select...</option>
              <option value="Phishing">Phishing</option>
              <option value="Real">Real</option>
              <option value="Other">Other</option>
            </select>

        </div>
        <div className="form-group">
            <label>Your Response:</label>
            <input 
                type="text" 
                value={userResponse.userTextResponse} 
                onChange={e => handleResponse('userTextResponse', e.target.value)}
                rows="4"
            />

    </div>
      </div>
      <button aria-label="Next Email" onClick={handleNextEmail}>Next Email</button>
    </div>
  );
};

export default UntimedSection;
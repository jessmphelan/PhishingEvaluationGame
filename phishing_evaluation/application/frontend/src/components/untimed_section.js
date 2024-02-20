import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UntimedSection = () => {
  const [currentEmail, setCurrentEmail] = useState(null);
  const [userResponse, setUserResponse] = useState({ emailType: '', userTextResponse: '' });

  // Fetch the first email when the component mounts
  useEffect(() => {
    fetchNextEmail();
  }, []);

  const fetchNextEmail = () => {
    // Fetch the next email from your database or API
    // For example, using axios: axios.get('/api/next-email').then(response => setCurrentEmail(response.data));
    axios.get('http://127.0.0.1:5000/api/next-email')
    .then(response => {
      console.log(response)
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
    // save the current response to the database
    axios.post('http://127.0.0.1:5000/api/save-response', { emailId: currentEmail?.id, response: userResponse })
      .then(() => {
        fetchNextEmail();
        setUserResponse({emailType: '' });
      })
      .catch(error => {
        console.error('Error saving response:', error);
      });
  };

  return (
    <div style={{ position: 'relative' }} className="email-evaluation-container">
      <h1>Phishing Email Evaluation Untimed Section</h1>

      <div className="email-container">
        {currentEmail ? currentEmail.content : 'Loading email...'}
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
import React from 'react';
import GifPlayer from 'react-gif-player';
import { useNavigate } from 'react-router-dom';


const InstructionalGif = () => {
    const navigate = useNavigate(); // Hook to navigate to different routes

    // Function to handle navigation when the button is clicked
    const handleBeginEvaluation = () => {
        navigate('/email_evaluation'); // Change to the path you have defined for your component
    };


    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          overflow: 'hidden' // ensure the GIF does not overflow the container
        }}> 
          <h2>How to Evaluate Emails</h2>
          <p>Please click on the gif below to see a brief demonstration.</p>
          <ol style={{ textAlign: 'left' }}>  
            <li>Read the email content carefully.</li>
            <li>Highlight the specific text that you believe is the biggest indicator of whether it is suspicious or confirms the email's legitimacy.</li>
            <li>Select whether the email is a "Phishing Email" or a "Real Email" based on your judgment.</li>
          </ol>
          <div style={{
            lineHeight: 0, 
            maxWidth: '100%', 
            textAlign: 'center' 
          }}>
            <GifPlayer 
                gif="/images/ezgif-4-6f7cdb1814.gif" 
                still="/images/instructionalstill.png" 
                style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          {/* Button to navigate to the EmailEvaluation component */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button type="submit" onClick={handleBeginEvaluation}>
            Begin Email Evaluation
          </button>
        </div>
        </div>
      </div>
    );
  };

export default InstructionalGif;

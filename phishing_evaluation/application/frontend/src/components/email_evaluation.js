import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Timer from './timer.js';
import axios from 'axios';

import { captureHighlightedText } from './textUtils';
import { usePlayerID } from './playerID_context';


const EmailEvaluation = () => {
  const [currentEmail, setCurrentEmail] = useState(null);
  const [userResponse, setUserResponse] = useState({ type: '', elapsedTime: 0, highlightedText: ''});
  const [emailCount, setEmailCount] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const [highlightedText, setHighlightedText] = useState(''); // Highlighted text

  const navigate = useNavigate();

  const { playerID } = usePlayerID(); // Correctly access playerID from context

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

  
  const highlightSelectedText = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (!selectedText) return;
  
    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.className = 'highlight';
    span.textContent = selectedText;
  
    range.deleteContents();
    range.insertNode(span);
  
    // Return the selected text for saving or further processing
    return selectedText;
  };

  const handleMouseUp = () => {
    const highlightedText = window.getSelection().toString().trim();
    //const highlightedText = highlightSelectedText();
    setUserResponse((prevResponse) => ({
      ...prevResponse,
      highlightedText: highlightedText
    }));
    //const highlightedText = captureHighlightedText();
    if (highlightedText) {
      console.log("Highlighted Text: ", highlightedText);
      // Update the state or handle the highlighted text as needed
    }
    setHighlightedText(highlightedText);
  };

  const ResetButtonColors = () =>{
    document.getElementById("PhishBtn").style.backgroundColor = '';
    document.getElementById("RealBtn").style.backgroundColor = '';
  }

  const fetchNextEmail = () => {

    // const contentContainer = document.querySelector('.email-container');
    // if (contentContainer) {
    //   contentContainer.querySelectorAll('.highlight').forEach((highlightSpan) => {
    //     const textNode = document.createTextNode(highlightSpan.textContent);
    //     highlightSpan.parentNode.replaceChild(textNode, highlightSpan);
    //   });
    // }

    

    axios.get('http://127.0.0.1:5000/api/next_email')
      .then(response => {
        console.log("Received email data:", response.data);
        setCurrentEmail(response.data);
        setStartTime(Date.now());
      })
      .catch(error => {
        console.error('Error fetching email:', error);
      });
      ResetButtonColors();
      setHighlightedText(''); // Reset highlighted text
  };

  const handleResponse = (value, BtnID) => {
    const endTime = Date.now(); // End time- when selection is made
    const elapsedTime = (endTime - startTime) / 1000; // Elapsed time in seconds
    
    //const highlightedText = highlightSelectedText(); // Highlighted text

    //setUserResponse({ type: value, elapsedTime: elapsedTime, hightlightedText: highlightedText});

    setUserResponse((prevResponse) => ({
      ...prevResponse,
      type: value,
      elapsedTime: elapsedTime
    }));


    const responseToSend = {
      playerID: playerID, // Including the playerID with the response
      emailId: currentEmail.emailId, // Assuming your email object has an emailId field
      response: { 
        type: value, 
        elapsedTime: elapsedTime, 
        highlightedText: userResponse.highlightedText } // Including the response and elapsed time
    };

    console.log("Response to send:", responseToSend);

    // Use axios or fetch to send the response to your backend
    axios.post('http://127.0.0.1:5000/api/save_response', responseToSend)
      .then(response => {
        console.log("Response saved:", response.data);
      })
      .catch(error => {
        console.error('Error saving response:', error);
      });

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
      <p style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'left' }}>Please click the appropriate button below to classify the email. 
      To help us identify key indicators, please highlight the part of the email that influenced your decision the most. 
      Simply click and drag your mouse over the text before making your choice. The selection might not change color, but it will be captured. 
      You have one minute to make your selection.
      </p>
      <Timer key={emailCount} initialMinute={1} onTimerEnd={handleTimerEnd} width={300} height={40} strokeWidth={4}/>
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

import React, { useState } from 'react';
import axios from 'axios';
import { usePlayerID } from './playerID_context';

const Educational = () => {
  // State hooks for email and checkbox
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState(false);

  const [enrollInRaffle, setEnrollInRaffle] = useState(false);
  const [wishToReceiveInfo, setWishToReceiveInfo] = useState(false);

  const playerID = usePlayerID();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Replace 'playerID' and 'emailId' with appropriate variables if needed
    const dataToSend = {
      playerID: playerID, 
      email: email, 
      enrollInRaffle: enrollInRaffle,
      wishToReceiveInfo: wishToReceiveInfo
    };
  
    console.log("Data to send:", dataToSend);
  
    axios.post('http://127.0.0.1:5000/api/save_participant_info', dataToSend)
      .then(response => {
        console.log("Participant info saved:", response.data);
        alert("Thanks for playing. You will receive follow-up information shortly.");
      })
      .catch(error => {
        console.error('Error saving participant info:', error);
      });
  };

  

  return (
    <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
      <div style={{backgroundColor: 'white', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', position: 'relative', zIndex: 2, textAlign:'center'}}> 
        <h1>Improving Phishing Detection</h1>
        <div className="takeaways">
          <div className="takeaway">
            <h2>Check for inconsistencies and impersonation attempts</h2>
            <p>Examine the sender's email address for alterations or misspellings. Look for inconsistencies in the domain, formatting, and language use.</p>
          </div>
          <div className="takeaway">
            <h2>Be cautious with links and attachments</h2>
            <p>Hover over links to preview the URL and ensure it's legitimate. Avoid opening attachments from unknown sources.</p>
          </div>
          <div className="takeaway">
            <h2>Scrutinize the content for urgency or threats</h2>
            <p>Be wary of messages that create a sense of urgency or threaten dire consequences. Verify any such requests directly with the entity.</p>
          </div>
        </div>
        {/* Email input and checkbox for attending the party */}
        <form onSubmit={handleSubmit} style={{marginTop: '20px'}}>
          <div>
            <p>Please provide your email address below to be followed up after this study.</p>
            <input 
              type="email" 
              placeholder="Your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={{marginBottom: '10px', width: '100%', padding: '10px'}}
            />
          </div>
          {/* New checkboxes */}
        <div style={{marginBottom: '10px'}}>
          <label>
            <input 
              type="checkbox" 
              checked={enrollInRaffle} 
              onChange={(e) => setEnrollInRaffle(e.target.checked)} 
            />
            Enroll me in the raffle for $100 Virago gift card.
          </label>
        </div>
        <div style={{marginBottom: '20px'}}>
          <label>
            <input 
              type="checkbox" 
              checked={wishToReceiveInfo} 
              onChange={(e) => setWishToReceiveInfo(e.target.checked)} 
            />
            I wish to receive information about other student programs related to National Defense and Global Security, including Immersion Fellowships.
          </label>
        </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Educational;

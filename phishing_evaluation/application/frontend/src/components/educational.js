import React from 'react';

const Educational = () => {
  return (
    <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
      <div style={{backgroundColor: 'white', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', position: 'relative', zIndex: 2, textAlign:'center'}}> 
    {/* <div className="educational-container">
      <div className="educational-content"> */}
        <h1>Improving Phishing Detection</h1>
        <p>Enhance your skills in identifying phishing emails with the following tips:</p>
        <div className="takeaways">
          <div className="takeaway">
            <h2>1. Check for inconsistencies and impersonation attempts</h2>
            <p>Examine the sender's email address for alterations or misspellings. Look for inconsistencies in the domain, formatting, and language use.</p>
          </div>
          <div className="takeaway">
            <h2>2. Be cautious with links and attachments</h2>
            <p>Hover over links to preview the URL and ensure it's legitimate. Avoid opening attachments from unknown sources.</p>
          </div>
          <div className="takeaway">
            <h2>3. Scrutinize the content for urgency or threats</h2>
            <p>Be wary of messages that create a sense of urgency or threaten dire consequences. Verify any such requests directly with the entity.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Educational;

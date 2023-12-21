import React from 'react';

const EmailEvaluation = () => {
  // state or functions we need for handling button clicks or other interactions

  return (
    <div className="email-evaluation-container">
      <h1>Phishing Email Evaluation</h1>
      <div className="email-container">
        {/* this is where we will display the emails */}
      </div>
      <div className="evaluation-section">
        <div className="column">
          <h2>Evaluator Type</h2>
          <button>LLM</button>
          <button>Human</button>
        </div>
        <div className="column">
          <h2>Email Type</h2>
          <button>Phishing Email</button>
          <button>Real Email</button>
        </div>
      </div>
    </div>
  );
};

export default EmailEvaluation;

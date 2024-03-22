import React from 'react';
import { useNavigate } from 'react-router-dom';

import { usePlayerID } from './playerID_context';


const InstructionsPage = () => {
    const navigate = useNavigate();

    const handleStartEvaluation = () => {
        navigate('/demographic'); // Navigate to email_evaluation page
    };

    return (
        <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
            <div style={{backgroundColor: 'white', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', position: 'relative', zIndex: 2}}>
                <h1>Phishing Evaluation Study Instructions</h1>
                <p>Welcome to our Phishing Evaluation Study. The purpose of this study is to understand how well individuals can distinguish between phishing emails compared to legitimate emails.</p>
                <h2>What You Will Do</h2>
                <ol>
                    <li>You will be presented with a series of emails.</li>
                    {/* <li>For each email, you will decide whether you believe it was written by a Language Learning Model (LLM) or a human.</li> */}
                    <li>You will categorize each email as either "Phishing" or "Real."</li>
                    <li>Once you make your selection, you will be automatically redirected to the next email.</li>
                    <li>You can spend as much time as you wish on each email, but there is a maximum time limit of one minute per email.</li>
                </ol>        
                <h2>Data Collected</h2>
                <p>In this study, we will be recording:</p>
                <ul>
                    <li>Your demographic information and responses to short form questions regarding "Need for Cognition" and the "Big 5" personality traits.</li>
                    <li>Your categorization of each email as Phishing vs. Real.</li>
                    <li>The amount of time you take to make your decision on each email.</li>
                </ul>
        
                <p>This data will be used to analyze the effectiveness of individuals in distinguishing between different types of emails and will contribute to research in digital communication security.</p>
        
                <h2>Participation</h2>
                <p>Your participation in this study is entirely voluntary, and you may choose to stop at any time. Thank you for contributing to our research.</p>
                <div style={{textAlign: 'center', marginTop: '40px'}}>
                    <button className="startEvaluationButton" onClick={handleStartEvaluation}>Start Evaluation</button>
                </div>
            </div>
        </div>
  );
};

export default InstructionsPage;

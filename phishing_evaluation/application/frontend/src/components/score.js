import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { usePlayerID } from './playerID_context';

const ScorePage = () => {
  const [score, setScore] = useState(0);

  const { playerID } = usePlayerID();


  const navigate = useNavigate();

  useEffect(() => {
    const fetchScore = async () => {
      try {

        const url = 'http://127.0.0.1:5000/api/user_responses?playerID=' + playerID;

        //const { data } = await axios.get('http://127.0.0.1:5000/api/user_responses');
        const { data } = await axios.get(url);
        setScore(data.score);
      } catch (error) {
        console.error('Error fetching score:', error);

      }
    };

    fetchScore();
  }, []);

  const handleLearnMoreClick = () => {
    console.log("Button clicked");
    navigate('/educational');
  };

  return (
    <div style={{padding: '20px', maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 100}}>
       <div style={{backgroundColor: 'white', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', position: 'relative', zIndex: 2, textAlign: 'center'}}>          
        <div class="results-summary-container">
          <div class="confetti">
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
          </div>
          <div class="results-summary-container__result">
            <div class="heading-tertiary">Your Username: {playerID} </div>
            <div class="result-box">
              <div class="heading-primary"></div>
              <h1>You Scored</h1>
              <p style={{ fontSize: '36px' }}>{score}%</p>
              {score > 50 ? (
            <p style={{ fontSize: '20px' }}>More than half of your responses matched the correct labeling!</p>
          ) : score === 50 ? (
            <p style={{ fontSize: '20px' }}>Half of your responses matched the correct labeling.</p>
          ) : (
            <p style={{ fontSize: '20px' }}>Less than half of your responses matched the correct labeling.</p>
          )}
            </div>
          </div>
          <div class="results-summary-container__options">
            <div class="heading-secondary heading-secondary--blue">Leaderboard</div>
            <div class="summary-result-options">
              <div class="result-option">
                <span class="result-text">PhishUser_1711125684811</span>
                <div class="result-box">9534</div>
              </div>
              <div class="result-option">
                <span class="result-text">PhishUser_1711076464272</span>
                <div class="result-box">9322</div>
              </div>
              <div class="result-option">
                <span class="result-text">PhishUser_1711125480280</span>
                <div class="result-box">8444</div>
              </div>
              <div style={{textAlign: 'center', paddingTop: '100px', position: 'relative', zIndex: 9999}}> {/* High z-index to bring to front */}
                <button className="learnMoreBtn" onClick={handleLearnMoreClick} style={{cursor: 'pointer', position: 'relative', zIndex: 10000}}>
                  Learn How to Improve
                </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorePage;
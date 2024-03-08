import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ScorePage = () => {
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const { data } = await axios.get('http://127.0.0.1:5000/api/user_responses');
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
            <div class="heading-tertiary">Your Username: phish0123 </div>
            <div class="heading-tertiary">Your Total Score: 5392 </div>
            <div class="result-box">
              <div class="heading-primary">..</div>
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
                <span class="result-text">First Place</span>
                <div class="result-box">9634</div>
              </div>
              <div class="result-option">
                <span class="result-text">Second Place</span>
                <div class="result-box">8927</div>
              </div>
              <div class="result-option">
                <span class="result-text">Third Place</span>
                <div class="result-box">8805</div>
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
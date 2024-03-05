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
    navigate('/educational');
  };

  return (
    <div>
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
          <div class="heading-tertiary">Your Score</div>
          <div class="result-box">
            <div class="heading-primary">{score}%</div>
          </div>
          <div class="result-text-box">
            <div class="heading-secondary">excellent</div>
            <p class="paragraph">
              You scored higher than 65% of the people who have taken these tests.
            </p>
          </div>
        </div>
        <div class="results-summary-container__options">
          <div class="heading-secondary heading-secondary--blue">Leaderboard</div>
          <div class="summary-result-options">
            <div class="result-option">
              <span class="result-text">First Place</span>
              <div class="result-box"><span>11</span> / 15</div>
            </div>
            <div class="result-option">
              <span class="result-text">Second Place</span>
              <div class="result-box"><span>10</span> / 15</div>
            </div>
            <div class="result-option">
              <span class="result-text">Third Place</span>
              <div class="result-box"><span>8</span> / 15</div>
            </div>
            <div class="summary__cta">
              <button class="learnMoreBtn" onClick={handleLearnMoreClick}>Learn How to Improve</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorePage;

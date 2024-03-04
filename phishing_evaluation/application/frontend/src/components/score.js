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
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1>You Scored</h1>
      <p style={{ fontSize: '36px' }}>{score}%</p>
      {score > 50 ? (
        <p style={{ fontSize: '20px' }}>More than half of your responses matched the correct labeling!</p>
      ) : score === 50 ? (
        <p style={{ fontSize: '20px' }}>Half of your responses matched the correct labeling.</p>
      ) : (
        <p style={{ fontSize: '20px' }}>Less than half of your responses matched the correct labeling.</p>
      )}
      <button className="startEvaluationButton" onClick={handleLearnMoreClick}>Learn How to Improve</button> 
    </div>
  );
};

export default ScorePage;

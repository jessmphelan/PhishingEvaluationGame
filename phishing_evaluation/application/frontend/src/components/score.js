import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ScorePage = () => {
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    const fetchScore = async () => {
      try {
        const { data } = await axios.get('http://127.0.0.1:5000/api/user_responses'); 
        setScore(Math.round(data.score)); 
      } catch (error) {
        console.error('Error fetching score:', error);

      }
    };

    fetchScore();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1>You Scored</h1>
      <p style={{ fontSize: '36px' }}>{score}%</p>
      if (score {'>'} 50){
        <p style={{ fontSize: '20px' }}>More than half of your responses matched the correct labeling.</p>
      } else if (score == 50) {
        <p style={{ fontSize: '20px' }}>Half of your responses matched the correct labeling.</p>
      } else {
        <p style={{ fontSize: '20px' }}>Less than half of your responses matched the correct labeling.</p>
      }
      
    </div>
  );
};

export default ScorePage;

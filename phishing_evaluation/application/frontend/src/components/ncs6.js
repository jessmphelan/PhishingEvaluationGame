import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { usePlayerID } from './playerID_context';

import { OrderContext } from './ordercontext';


const NCS6 = () => {
  const [NC1, setNC1] = useState('');
  const [NC2, setNC2] = useState('');
  const [NC3, setNC3] = useState('');
  const [NC4, setNC4] = useState('');
  const [NC5, setNC5] = useState('');
  const [NC6, setNC6] = useState('');
  const navigate = useNavigate();

  const { playerID } = usePlayerID();

  const {order, firstTestCompleted, setFirstTestCompleted} = useContext(OrderContext); // Use the order from context


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any of the fields are empty
    if (!NC1 || !NC2 || !NC3 || !NC4 || !NC5 || !NC6) {
      alert('Please fill in all fields before submitting.');
      return; // Stop the function from proceeding further if any field is empty
    }

    const responses = { NC1, NC2, NC3, NC4, NC5, NC6 };

    const payload = {
      playerID, 
      responses,
      testType: 'NCS6' 
    };

    console.log(payload);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/save_psychological_profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), 
      });

      if (!response.ok) {
        throw new Error('Failed to save NCS6 responses');
      }
      
      // Determine navigation based on completion
      if (!firstTestCompleted) {
        setFirstTestCompleted(true); // Mark the first test as completed
        console.log("Order:", order, "First Test Completed:", firstTestCompleted);
        navigate("/second"); // Navigate to the second test
      } else {
        navigate("/instructionalgif"); // Navigate to the next step after completing the second test
      }
    } catch (error) {
      console.error("Error saving NCS6 responses:", error);
     
    }
  };

  return (
    <div className='app-container'>
      <div> 
      <h1>Phishing Email Evaluation</h1> 
      </div>
    
    <form onSubmit={handleSubmit}>

      <div>
        <label>
        I would prefer complex to simple problems. 
        <select value={NC1} aria-label="NC1" onChange={e => setNC1(e.target.value)}>
          <option value="">Select...</option>
          <option value="1">Extremely Uncharacteristic of Me</option>
          <option value="2">Somewhat Uncharacteristic of Me</option>
          <option value="3">Uncertain</option>
          <option value="4">Somewhat Characteristic of Me</option>
          <option value="5">Extremely Characteristic of Me</option>
        </select>
        </label>
      </div>

      <div>
        <label>
        I like to have the responsibility of handling a situation that requires a lot of thinking. 
        <select value={NC2} aria-label="NC2" onChange={e => setNC2(e.target.value)}>
          <option value="">Select...</option>
          <option value="1">Extremely Uncharacteristic of Me</option>
          <option value="2">Somewhat Uncharacteristic of Me</option>
          <option value="3">Uncertain</option>
          <option value="4">Somewhat Characteristic of Me</option>
          <option value="5">Extremely Characteristic of Me</option>
        </select>
        </label>
      </div>

      <div>
        <label>
        Thinking is not my idea of fun. 
        <select value={NC3} aria-label="NC3" onChange={e => setNC3(e.target.value)}>
          <option value="">Select...</option>
          <option value="1">Extremely Uncharacteristic of Me</option>
          <option value="2">Somewhat Uncharacteristic of Me</option>
          <option value="3">Uncertain</option>
          <option value="4">Somewhat Characteristic of Me</option>
          <option value="5">Extremely Characteristic of Me</option>
        </select>
        </label>
      </div>

      <div>
        <label>
        I would rather do something that requires little thought than something that is sure to challenge my thinking abilities. 
        <select value={NC4} aria-label="NC4" onChange={e => setNC4(e.target.value)}>
          <option value="">Select...</option>
          <option value="1">Extremely Uncharacteristic of Me</option>
          <option value="2">Somewhat Uncharacteristic of Me</option>
          <option value="3">Uncertain</option>
          <option value="4">Somewhat Characteristic of Me</option>
          <option value="5">Extremely Characteristic of Me</option>
        </select>
        </label>
      </div>

      <div>
        <label>
        I really enjoy a task that involves coming up with new solutions to problems. 
        <select value={NC5} aria-label="NC5" onChange={e => setNC5(e.target.value)}>
          <option value="">Select...</option>
          <option value="1">Extremely Uncharacteristic of Me</option>
          <option value="2">Somewhat Uncharacteristic of Me</option>
          <option value="3">Uncertain</option>
          <option value="4">Somewhat Characteristic of Me</option>
          <option value="5">Extremely Characteristic of Me</option>
        </select>
        </label>
      </div>

      <div>
        <label>
        I would prefer a task that is intellectual, difficult, and important to one that is somewhat important but does not require much thought. 
        <select value={NC6} aria-label="NC6" onChange={e => setNC6(e.target.value)}>
          <option value="">Select...</option>
          <option value="1">Extremely Uncharacteristic of Me</option>
          <option value="2">Somewhat Uncharacteristic of Me</option>
          <option value="3">Uncertain</option>
          <option value="4">Somewhat Characteristic of Me</option>
          <option value="5">Extremely Characteristic of Me</option>
        </select>
        </label>
      </div>
      
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    
    </div>
  );
};

export default NCS6;

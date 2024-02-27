import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NCS6 = () => {
  const [NC1, setNC1] = useState('');
  const [NC2, setNC2] = useState('');
  const [NC3, setNC3] = useState('');
  const [NC4, setNC4] = useState('');
  const [NC5, setNC5] = useState('');
  const [NC6, setNC6] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({NC1, NC2, NC3, NC4, NC5, NC6 });
    navigate("/email_evaluation");
  };


  return (
    <div className='app-container'>
      <div> 
      <h1>Phishing Evaluation</h1> 
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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DemographicForm = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [vanderbilt_association, setAssociation] = useState('');
  const [year, setYear] = useState('');
  const [major, setMajor] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ age, gender, vanderbilt_association, year, major });
    navigate("/email_evaluation");
  };


  return (
    <div className='app-container'>
    <h1>Phishing Evaluation</h1>
    <h3>Demographic Information</h3>
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Age:
          <input type="number" value={age} aria-label="Age" onChange={e => setAge(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Gender:
          <select value={gender} aria-label="Select Gender" onChange={e => setGender(e.target.value)}>
            <option value="">Select...</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </label>
      </div>
      <div>
        <label>
        Vanderbilt Association: 
        <select value={vanderbilt_association} aria-label="Vanderbilt Association" onChange={e => setAssociation(e.target.value)}>
          <option value="">Select...</option>
          <option value="student">Student</option>
          <option value="staff">Staff</option>
          <option value="faculty">Faculty</option>
          <option value="other">Other</option>
        </select>
        </label>
        </div>
        <div>
        <label>
        Year: 
        <select value={year} aria-label="Select Year" onChange={e => setYear(e.target.value)}>
          <option value="">Select...</option>
          <option value="Freshman">Freshman</option>
          <option value="Sophomore">Sophomore</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
        </select>
        </label>
        </div>
        <div>
        <label>
        Major: 
        <input type="text" value={major} aria-label="Major" onChange={e => setMajor(e.target.value)} />
        </label>
        </div>
        <div></div>
        <div>
        <button type="submit">Submit</button>
        </div>
    </form>
    </div>
  );
};





export default DemographicForm;

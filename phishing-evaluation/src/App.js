
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';


//Components
import DemographicForm from './components/demographic_form.js';
import EmailEvaluation from './components/email_evaluation.js';


// Main App Component
const App = () => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <div>
      <h1>Welcome to the App</h1>
      {!showForm && (
        <button onClick={handleShowForm}>Fill Out Demographic Information</button>
      )}
      {showForm && <DemographicForm />}
      <Router>
          <div>
            <Routes>
              <Route path="/demographic_form" element={<DemographicForm />} />
              <Route path="/email_evaluation" element={<EmailEvaluation />} />
            </Routes>
          </div>
        </Router>
    </div>
  );
};

export default App;

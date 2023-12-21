import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

//Components
import DemographicForm from './components/demographic_form.js';
import EmailEvaluation from './components/email_evaluation.js';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Welcome to the App</h1>
        <nav>
          <ul>
            <li><a href="/demographic_form">Fill Out Demographic Information</a></li>
            {/* Other navigation links */}
          </ul>
        </nav>
        <Routes>
          <Route path="/demographic_form" element={<DemographicForm />} />
          <Route path="/email_evaluation" element={<EmailEvaluation />} />
          {/* Other routes */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

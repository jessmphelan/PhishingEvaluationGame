import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

//Components
import CreateAccountForm from './components/create_account.js';
import DemographicForm from './components/demographic_form.js';
import EmailEvaluation from './components/email_evaluation.js';
import Timer from './components/timer.js';

const App = () => {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li><a href="/create_account_form">User Registration</a></li>
            {/* Other navigation links }
          </ul>
        </nav> */
        /* <nav>
          <ul>
            <li><a href="/demographic_form">Fill Out Demographic Information</a></li>
            {/* Other navigation links }
          </ul>
        </nav> */}
        <Routes>
          <Route path="/" element={<CreateAccountForm />} />
          <Route path="/demographic_form" element={<DemographicForm />} />
          <Route path="/email_evaluation" element={<EmailEvaluation />} />
          <Route path="/timer" element={<Timer />} />
          {/* Other routes */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

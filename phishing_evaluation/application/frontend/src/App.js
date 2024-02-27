import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

//Components
//import CreateAccountForm from './components/create_account.js';
import DemographicForm from './components/demographic_form.js';
import NCS6 from './components/ncs6.js';
import InstructionsPage from './components/instructions.js';
import EmailEvaluation from './components/email_evaluation.js';
import UntimedSection from './components/untimed_section.js';
import Score from './components/score.js';
import Educational from './components/educational.js';
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
          {/* <Route path="/" element={<CreateAccountForm />} /> */}
          <Route path="/" element={<DemographicForm />} />
          <Route path="/ncs6" element={<NCS6/>} />
          <Route path="/instructions" element={<InstructionsPage />} />
          <Route path="/email_evaluation" element={<EmailEvaluation />} />
          <Route path="/untimed_section" element={<UntimedSection />} />
          <Route path="/score" element={<Score />} />
          <Route path="/educational" element={<Educational />} />
          <Route path="/timer" element={<Timer />} />
          {/* Other routes */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

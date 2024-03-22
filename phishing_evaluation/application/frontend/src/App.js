import React, { useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { PlayerIDProvider } from './components/playerID_context';

//Components
import CreateAccountForm from './components/create_account.js';
import DemographicForm from './components/demographic_form.js';
import NCS6 from './components/ncs6.js';
import BigFive from './components/bigfive.js';
import InstructionsPage from './components/instructions.js';
import EmailEvaluation from './components/email_evaluation.js';
import UntimedSection from './components/untimed_section.js';
import Score from './components/score.js';
import Educational from './components/educational.js';
import Timer from './components/timer.js';

const App = () => {
  return (
    <PlayerIDProvider>
    <Router>
      <div>
      <div className="wave-container"></div>
        <Routes>
          <Route path="/" element={<CreateAccountForm />} />  
          <Route path="/instructions" element={<InstructionsPage />} />
          <Route path="/demographic" element={<DemographicForm />} />
          <Route path="/bigfive" element={<BigFive/>} />
          <Route path="/ncs6" element={<NCS6/>} />
          <Route path="/email_evaluation" element={<EmailEvaluation />} />
          <Route path="/untimed_section" element={<UntimedSection />} />
          <Route path="/score" element={<Score />} />
          <Route path="/educational" element={<Educational />} />
          <Route path="/timer" element={<Timer />} />
          {/* Other routes */}
        </Routes>
      </div>
    </Router>
    </PlayerIDProvider>
  );
};

export default App;

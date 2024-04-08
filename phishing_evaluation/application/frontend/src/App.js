import React, { useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect} from 'react';

import { PlayerIDProvider } from './components/playerID_context';

import { OrderProvider } from './components/ordercontext';

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

  const [firstComponent, setFirstComponent] = useState("");

  useEffect(() => {
    // Randomly decide whether BigFive or NCS6 is first
    const isFirstBigFive = Math.random() < 0.5;
    setFirstComponent(isFirstBigFive ? "bigfive" : "ncs6");
  }, []);


  return (
    <OrderProvider>
      <PlayerIDProvider>
      <Router>
        <div>
        <div className="wave-container"></div>
          <Routes>
            <Route path="/" element={<CreateAccountForm />} />  
            <Route path="/instructions" element={<InstructionsPage />} />
            <Route path="/demographic" element={<DemographicForm />} />
            {/* Dynamically route based on the first component */}
            <Route path="/first" element={firstComponent === "bigfive" ? <BigFive/> : <NCS6/>} />
            <Route path="/second" element={firstComponent === "bigfive" ? <NCS6/> : <BigFive/>} />
            {/* Other routes remain unchanged */}
            {/* <Route path="/bigfive" element={<BigFive/>} />
            <Route path="/ncs6" element={<NCS6/>} /> */}
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
    </OrderProvider>
  );
};

export default App;

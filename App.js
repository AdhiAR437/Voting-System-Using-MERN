import React from 'react';
import './App.css';
import Login from './components/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CandidatesList from './components/CandidateVoting';
import AdminLogin from './components/AdminLogin';
import VotingStats from './components/AdminVoteNumbers';
import CandidatesVoteResults from './components/CandidateVotingResults';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/candidates' element= {<CandidatesList />} />
            <Route path='/admin'  element= {<AdminLogin />} />
            <Route path='/voting-stat' element={<VotingStats />}/>
            <Route path='/results' element={<CandidatesVoteResults />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Candidates.css';
import { Navigate } from 'react-router-dom';

const CandidatesVoteResults = () => {
  const [candidates, setCandidates] = useState([]);
  const [redirecting, setRedirect] = useState(false);
  useEffect(() => {
    axios.get('http://localhost:3000/candidates-votes')
      .then(response => {
        setCandidates(response.data);
      })
      .catch(error => {
        console.error('Error fetching candidates:', error);
      });
  }, []);

  
  const renderCandidateCards = () => {
    return candidates.map(candidate => (
      <div key={candidate.id} className="candidate-card">
      <img
      src={`${process.env.PUBLIC_URL}/candidatepic/${candidate.candidate_name}_${candidate.party_name}.jpg`}
      alt={`${candidate.candidate_name}_${candidate.party_name}`}
      className="candidate-photo"
    />
        <div className="candidate-details">
          <h3>{candidate.candidate_name}</h3>
          <h3>Age: {candidate.age}</h3>
          <h3>Party: {candidate.party_name}</h3>
          <strong><h3 class="h3-voteres">Votes: {candidate.votes}</h3></strong>
        </div>
      </div>
    ));
  };

  const redirect = () => {
    setRedirect(true);
  };

  if (redirecting) {
    return <Navigate to='/voting-stat' />;
  }

  return (
    <div>
      <h2>Candidates List</h2>
      <div className="candidates-container">
        {renderCandidateCards()}
      </div>
      <button class="btn btn-success" onClick={redirect}>Complete Voting Statistics</button>
    </div>
  );
};

export default CandidatesVoteResults;

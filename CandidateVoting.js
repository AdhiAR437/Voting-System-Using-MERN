import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import './Candidates.css';

const CandidatesList = () => 
{
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/candidates')
      .then(response => {
        setCandidates(response.data);
      })
      .catch(error => {
        console.error('Error fetching candidates:', error);
      });
  }, []);

  const handleVoteClick = (candidateId) => {
    
    axios.post('http://localhost:3000/update-vote', { candidateId })
         .then(response => {
          alert('Vote Successfully, thank you.');
          navigate('/',{replace: true});
          
        })
         .catch(error => {
           console.error('Error registering vote:', error);
         });
  };

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
          <button onClick={() => handleVoteClick(candidate.id)} class="btn btn-primary">
            Vote
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <h2 >Candidates List</h2>
      <div className="candidates-container">
        {renderCandidateCards()}
      </div>
    </div>
  );
};

export default CandidatesList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const VotingStats = () => {
  const [stats, setStats] = useState({
    totalVoters: 0,
    voted: 0,
    notVoted: 0,
    maleVoted: 0,
    femaleVoted: 0
  });
  const [redirecting, setRedirect] = useState(false);


  useEffect(() => {
    axios.get('http://localhost:3000/voting-stats')
      .then(response => {
        setStats(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const redirect = () => {
    setRedirect(true);
  };

  if (redirecting) {
    return <Navigate to='/results' />;
  }
  return (
    <div className="container mt-5">
      <h2>Voting Statistics</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Total People</h3>
              <h3 className="card-text">{stats.totalVoters}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">People Voted</h3>
              <h3 className="card-text">{stats.voted}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">People Not Voted</h3>
              <h3 className="card-text">{stats.notVoted}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Male Voted</h3>
              <h3 className="card-text">{stats.maleVoted}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Female Voted</h3>
              <h3 className="card-text">{stats.femaleVoted}</h3>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-success" onClick={redirect}>Voting Results</button>
    </div>
  );
};

export default VotingStats;

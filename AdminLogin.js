import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setphone] = useState('');

  const handleLogin = () => {
        axios.post(`http://localhost:3000/verify-admin`, { user: username, password: password, code: code })
          .then(response => {
            if (response.data.match) {
              window.location.href = '/results';
            } else {
              alert('Login unsuccessful. Please check your credentials.');
            }
          })
          .catch(error => {
            console.error(error);
            alert('An error occurred. Please try again later.');
          });
      };
      

  return (
    <div className="container mt-5">
      <div className="card-container">
        <div className="card">
          <div className="card-body">
            <div className="card-title">
              <h2>Login</h2>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="name" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="aadhaar" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Code</label>
                <input type="text" className="form-control" id="code" value={code} onChange={(e) => setphone(e.target.value)} />
              </div>
              <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

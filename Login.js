import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

axios.defaults.withCredentials = true;

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setphone] = useState('');



  const handleLogin = () => {
        axios.post(`http://localhost:3000/verify-voter`, { aadhaarNumber: username, name: password, phone: phone })
          .then(response => {
            if (response.data.match) {
              window.location.href = '/candidates';
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
                <label htmlFor="phone" className="form-label">Phone number</label>
                <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setphone(e.target.value)} />
              </div>
              <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

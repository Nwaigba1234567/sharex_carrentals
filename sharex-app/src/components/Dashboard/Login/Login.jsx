import React from 'react'
import { useState } from 'react';


const Login = () => {
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
   

    // Handle form submission
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input type='email' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>UserName:</label>
          <input type='username' value={userName} placeholder='userName' onChange={(e) => setUserName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn" type="submit" >
          Login
        </button>
      </form>
            {error && <h4 className="error-message">{error}</h4>}
    </div>
  );
}

export default Login

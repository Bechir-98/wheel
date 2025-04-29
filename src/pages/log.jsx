import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/log.css';

function Log() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Please enter your details</p>
        
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="mail">Email Address</label>
            <input 
              type="email" 
              id="mail" 
              placeholder="Enter your email" 
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              className="input-field"
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>

          <p className="signup-prompt">
            Don't have an account?{' '}
            <Link to="/Sign" className="signup-link">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Log;

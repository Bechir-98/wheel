import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Log() {
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      console.log('Sending login request...');
      console.log('Form data:', Object.fromEntries(formData));
      
      const response = await fetch('http://localhost/wheel_api/login_handler.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors'
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        // Store user data in localStorage
        if (data.debug) {
          localStorage.setItem('userId', data.debug.user_id);
          localStorage.setItem('userType', data.debug.user_type);
          localStorage.setItem('userEmail', data.debug.email);
        }
        
        // Successful login
        navigate(data.redirect);
      } else {
        // Login failed
        setError(data.error || 'Invalid credentials');
        setDebugInfo(data.debug);
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.message.includes('Failed to fetch')) {
        setError('Cannot connect to the server. Please check if the server is running.');
      } else if (err.message.includes('HTTP error')) {
        setError('Server error. Please try again later.');
      } else {
        setError('An error occurred during login. Please try again.');
      }
    }
  };

  return (
    <div className='form'>
      {error && <div className="error-message">{error}</div>}
      
      {debugInfo && (
        <div className="debug-info" style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: '#f8f9fa', 
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}>
          <h4>Debug Information:</h4>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      )}
      
      <div className='formm'>
        <form onSubmit={handleSubmit}>
          <br />
          <label htmlFor="mail">Email Address</label>
          <input type="email" id="mail" name="mail" placeholder="Email Address" required />
          <br />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Password" required />
          <br />

          <button type="submit" className="logbut">Login</button>
          <br /><br />
          <p>
            Don't have an account? <Link to="/sign">Sign here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Log;

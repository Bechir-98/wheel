import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from './assets/avatar.png';

function Sign() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    profession: ''
  });

  const navigate = useNavigate();

  // Log to check if this component is mounted
  console.log('Sign Component Rendered');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Ensure all fields are filled
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.profession) {
      alert("Please fill in all the fields.");
      return;
    }

    // Navigate to corresponding page based on profession
    if (formData.profession === '1') {
      navigate('/patient');
    } else if (formData.profession === '2') {
      navigate('/clinician');
    } else if (formData.profession === '4') {
      navigate('/vendor');
    }
  };

  return (
    <div className="form">
     
      <div className="formm">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
          
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
          
          <label htmlFor="profession">Profession</label>
          <select
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            required
          >
            <option value="">Select Profession</option>
            <option value="1">Patient</option>
            <option value="2">Clinician</option>
            <option value="4">Vendor</option>
          </select>
          <br />
          
          <button type="submit" className="logbut">
            Sign Up
          </button>
          <br />
          
          <p>
            Already have an account? <a href="/log">Log in here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Sign;

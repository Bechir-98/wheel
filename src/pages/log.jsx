import React from 'react';
import { Link } from 'react-router-dom';

function Log() {
  return (
    <div className='form'>
      

      <div className='formm'>
        <form>
          <br />
          <label htmlFor="mail">Email Address</label>
          <input type="email" id="mail" placeholder="Email Address" />
          <br />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" />
          <br />

          <button type="submit" className="logbut">Login</button>
          <br /><br />
          <p>
          Don't have an account? <a href="/Sign">Sign here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Log;

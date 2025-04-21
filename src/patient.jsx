import React from 'react';
import './Dashboard.css';

function Patient() {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="avatar-container">
          <img src="https://via.placeholder.com/100" alt="avatar" className="avatar" />
        </div>
        <div className="welcome-container">
          <h1>Welcome, Sarah</h1>
          <button className="logout-btn">Logout</button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="sidebar">
        <ul>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#profile">My Profile</a></li>
          <li><a href="#appointments">Appointments</a></li>
          <li><a href="#records">Medical Records</a></li>
          <li><a href="#messages">Messages</a></li>
          <li><a href="#settings">Settings</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Upcoming Appointments */}
        <section className="appointments">
          <h2>Your Upcoming Appointments</h2>
          <div className="appointment-card">
            <h3>Dr. Smith - 20 April 2025</h3>
            <p>10:00 AM</p>
            <button className="view-btn">View All Appointments</button>
          </div>
        </section>

        {/* Medical Records */}
        <section className="medical-records">
          <h2>Medical Records</h2>
          <div className="record-card">
            <p>Last Updated: 12 April 2025</p>
            <ul>
              <li>Blood Test ✅</li>
              <li>X-Ray Report ✅</li>
            </ul>
            <button className="view-btn">View Full Record</button>
          </div>
        </section>

        {/* Messages */}
        <section className="messages">
          <h2>Messages</h2>
          <div className="message-card">
            <p>💬 New message from Dr. Amina</p>
            <p>"Please remember to fast before your test."</p>
            <button className="view-btn">Go to Messages</button>
          </div>
        </section>

        {/* Health Tips */}
        <section className="health-tips">
          <h2>Daily Health Tip</h2>
          <p>🩺 Drink 2L of water a day and walk 30 minutes.</p>
        </section>
      </main>
    </div>
  );
}

export default Patient;

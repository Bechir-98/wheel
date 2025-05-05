import { NavLink } from 'react-router-dom';
import "../styles/sidebar.css";
import { Button } from 'react-bootstrap'; // Make sure to import Button if using react-bootstrap

function Sidebar({ role, user }) {
  let links = [];

  if (role === 'patient') {
    links = [
      { to: '/patientdashboard', label: '📊 Dashboard' },
      { to: '/profile', label: '👤 My Profile' },
      { to: '/choisis', label: '🚶   My wheelchaires' },
      { to: '/record', label: '📋 Medical Records' },
      { to: '/patient/messages', label: '💬 Messages' },
      { to: '/settings', label: '⚙️ Settings' },
    ];
  } else if (role === 'vendor') {
    links = [
      { to: '/vendordashboard', label: '📊 Dashboard' },
      { to: '/profile', label: '👤 My Profile' },
      { to: '/products', label: '📦 Products' },
      { to: '/vendor/orders', label: '🛒 Orders' },
      { to: '/vendor/reviews', label: '⭐ Reviews' },
      { to: '/settings', label: '⚙️ Settings' },
    ];
  } else if (role === 'clinician') {
    links = [
      { to: '/cliniciandashboard', label: '📊 Dashboard' },
      { to: '/profile', label: '👤 My Profile' },
      { to: '/clinician/consultations', label: '📅 Consultations' },
      { to: '/patients', label: '👥 Patients' },
      { to: '/clinician/assessments', label: '📋 Assessments' },
      { to: '/clinician/prescriptions', label: '💊 Prescriptions' },
      { to: '/settings', label: '⚙️ Settings' },
    ];
  }

  return (
    <>

      <div className="sidebar">
        <div className="user-profile">
          <div className="avatar-container">
            <div className="user-avatar">{user?.name?.charAt(0)}</div>
          </div>
          <h5>{user?.name || 'User Name'}</h5>
          <p className="user-type">{role.charAt(0).toUpperCase() + role.slice(1)}</p>
          <Button variant="outline-primary" size="sm" className="logout-btn">
            <i className="fa fa-sign-out"></i> Logout
          </Button>
        </div>
     
      <div className="sidebar-nav">
        <ul className="nav flex-column">
          {links.map((link, index) => (
            <li className="nav-item" key={index}>
              <NavLink to={link.to} className="nav-link">
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </>
  );
}

export default Sidebar;

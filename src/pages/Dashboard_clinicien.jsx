import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ClinicianDashboard() {
  return (
    <div className="dashboard-wrapper">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="user-profile">
          <div className="avatar-container">
            <div className="user-avatar">SJ</div>
          </div>
          <h5>Sarah Johnson</h5>
          <p className="user-type">Clinician</p>
          <Button variant="outline-primary" size="sm" className="logout-btn">
            <i className="fa fa-sign-out"></i> Logout
          </Button>
        </div>
        
        <div className="sidebar-nav">
          <ul className="nav flex-column">
            <li className="nav-item active">📊 Dashboard</li>
            <li className="nav-item">📅 Consultations</li>
            <li className="nav-item">👥 Patients</li>
            <li className="nav-item">📋 Assessments</li>
            <li className="nav-item">💊 Prescriptions</li>
            <li className="nav-item">⚙️ Settings</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Container fluid>
          {/* Stat Cards Row */}
          <Row className="stat-cards mb-4">
            <Col md={3} sm={6} className="mb-3">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <div className="stat-value">186</div>
                  <p className="stat-label mb-0">Total Patients</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6} className="mb-3">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <div className="stat-value">42</div>
                  <p className="stat-label mb-0">Consultations This Month</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6} className="mb-3">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <div className="stat-value">8</div>
                  <p className="stat-label mb-0">Today's Appointments</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6} className="mb-3">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <div className="stat-value">15</div>
                  <p className="stat-label mb-0">Pending Assessments</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Middle Section */}
          <Row className="mb-4">
            <Col md={6} className="mb-3">
              <Card className="h-100 dashboard-card">
                <Card.Header>
                  <strong>Today's Consultations</strong>
                </Card.Header>
                <Card.Body>
                  <Card className="appointment-card mb-2">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="patient-avatar me-3">JD</div>
                          <div>
                            <h6 className="mb-1">John Doe</h6>
                            <span className="text-muted">9:00 AM - Follow-up</span>
                          </div>
                        </div>
                        <Button variant="outline-primary" size="sm">View</Button>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card className="appointment-card">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="patient-avatar me-3">ES</div>
                          <div>
                            <h6 className="mb-1">Emily Smith</h6>
                            <span className="text-muted">11:30 AM - Initial consultation</span>
                          </div>
                        </div>
                        <Button variant="outline-primary" size="sm">View</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-3">
              <Card className="h-100 dashboard-card">
                <Card.Header>
                  <strong>Recent Assessments</strong>
                </Card.Header>
                <Card.Body>
                  <Card className="appointment-card mb-2">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="patient-avatar me-3">RJ</div>
                          <div>
                            <h6 className="mb-1">Robert Johnson</h6>
                            <span className="text-muted">Completed yesterday</span>
                          </div>
                        </div>
                        <Button variant="outline-primary" size="sm">View</Button>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card className="appointment-card">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="patient-avatar me-3">AL</div>
                          <div>
                            <h6 className="mb-1">Alice Lee</h6>
                            <span className="text-muted">Pending review</span>
                          </div>
                        </div>
                        <Button variant="outline-primary" size="sm">Review</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Bottom Section */}
          <Row>
            <Col md={12}>
              <Card className="dashboard-card">
                <Card.Header>
                  <strong>Patient Statistics</strong>
                </Card.Header>
                <Card.Body>
                  <div className="placeholder-chart">
                    <p className="text-muted text-center">Patient demographics and visit trends will be displayed here</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      
      <style jsx>{`
        .dashboard-wrapper {
          display: flex;
          height: 100vh;
          font-family: Arial, sans-serif;
          overflow: hidden;
        }

        .sidebar {
          padding: 20px 0;
          border-right: 1px solid #e9ecef;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          width: 250px;
          height: 100vh;
          background-color: #f8f9fa;
          box-shadow: 1px 0 5px rgba(0,0,0,0.05);
        }

        .user-profile {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 20px 20px;
          border-bottom: 1px solid #e9ecef;
          margin-bottom: 20px;
        }

        .avatar-container {
          width: 80px;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 10px;
        }

        .user-avatar {
          width: 80px;
          height: 80px;
          background-color: #cfe2ff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #0d6efd;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .user-profile h5 {
          margin: 10px 0 5px;
          font-size: 1.2rem;
        }

        .user-type {
          margin: 0 0 15px;
          color: #6c757d;
          font-size: 0.9rem;
        }

        .sidebar-nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sidebar-nav li {
          padding: 12px 20px;
          margin-bottom: 2px;
          display: flex;
          align-items: center;
          cursor: pointer;
          color: #212529;
          transition: background-color 0.2s;
        }

        .sidebar-nav li.active {
          background-color: #ffffff;
          border-left: 3px solid #0d6efd;
          color: #0d6efd;
          font-weight: 500;
        }

        .sidebar-nav li:not(.active) {
          border-left: 3px solid transparent;
        }

        .sidebar-nav li:hover {
          background-color: #e9ecef;
        }

        .main-content {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          background-color: #ffffff;
        }

        .stat-cards .card {
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.05);
          transition: transform 0.2s;
        }

        .stat-cards .card:hover {
          transform: translateY(-5px);
        }

        .stat-value {
          color: #0d6efd;
          font-weight: bold;
          font-size: 1.8rem;
          margin-bottom: 5px;
        }

        .stat-label {
          color: #6c757d;
          font-size: 0.9rem;
        }

        .dashboard-card {
          box-shadow: 0 0 10px rgba(0,0,0,0.05);
          border-radius: 10px;
        }

        .appointment-card {
          background-color: #f8f9fa;
          border: none;
          margin-bottom: 10px;
          border-radius: 8px;
          transition: background-color 0.2s;
        }

        .appointment-card:hover {
          background-color: #e9ecef;
        }

        .patient-avatar {
          width: 40px;
          height: 40px;
          background-color: #cfe2ff;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #0d6efd;
          font-weight: bold;
          font-size: 0.8rem;
        }

        .placeholder-chart {
          height: 300px;
          background-color: #f8f9fa;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .dashboard-wrapper {
            flex-direction: column;
          }
          
          .sidebar {
            width: 100%;
            height: auto;
            position: relative;
          }
          
          .main-content {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default ClinicianDashboard;
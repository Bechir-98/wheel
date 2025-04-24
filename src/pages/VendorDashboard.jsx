import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function VendorDashboard() {
  return (
    <div className="dashboard-wrapper">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="user-profile">
          <div className="avatar-container">
            <div className="user-avatar">JD</div>
          </div>
          <h5>John Doe</h5>
          <p className="user-type">Vendor</p>
          <Button variant="outline-primary" size="sm" className="logout-btn">
            <i className="fa fa-sign-out"></i> Logout
          </Button>
        </div>
        
        <div className="sidebar-nav">
          <ul className="nav flex-column">
            <li className="nav-item active">📊 Dashboard</li>
            <li className="nav-item">📦 Products</li>
            <li className="nav-item">📈 Sales</li>
            <li className="nav-item">🛒 Orders</li>
            <li className="nav-item">⭐ Reviews</li>
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
                  <div className="stat-value">156</div>
                  <p className="stat-label mb-0">Active Products</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6} className="mb-3">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <div className="stat-value">$2,300</div>
                  <p className="stat-label mb-0">Monthly Revenue</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6} className="mb-3">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <div className="stat-value">12</div>
                  <p className="stat-label mb-0">Pending Orders</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6} className="mb-3">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <div className="stat-value">4.5</div>
                  <p className="stat-label mb-0">Average Rating</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Middle Section */}
          <Row className="mb-4">
            <Col md={6} className="mb-3">
              <Card className="h-100 dashboard-card">
                <Card.Header>
                  <strong>Product Catalog</strong>
                </Card.Header>
                <Card.Body>
                  <p className="text-muted">View all products in your catalog.</p>
                  <Button variant="outline-primary" size="sm">View Catalog</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-3">
              <Card className="h-100 dashboard-card">
                <Card.Header>
                  <strong>Recent Orders</strong>
                </Card.Header>
                <Card.Body>
                  <p className="text-muted">No recent orders available.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Bottom Section */}
          <Row>
            <Col md={12}>
              <Card className="dashboard-card">
                <Card.Header>
                  <strong>Sales Statistics</strong>
                </Card.Header>
                <Card.Body>
                  <div className="placeholder-chart">
                    <p className="text-muted text-center">Sales chart will be displayed here</p>
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

export default VendorDashboard;
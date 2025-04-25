import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function VendorDashboard() {
  return (
    <div className="dashboard-wrapper">
      <Sidebar role="vendor" />


     

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
      
      
    </div>
  );
}

export default VendorDashboard;
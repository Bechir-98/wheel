import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom'
import Sidebar from '../components/Sidebar';

function PatientDashboard() {
  return (
    <div className="dashboard-wrapper">
      {/* Left Sidebar */}
      <Sidebar role="patient" />
     

      {/* Main Content */}
      <div className="main-content">
        <Container fluid>
          {/* Stat Cards Row */}
          <Row className="stat-cards mb-4">
            <Col md={3} sm={6} className="mb-3">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <div className="stat-value">2</div>
                  <p className="stat-label mb-0">Upcoming Appointments</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6} className="mb-3">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <div className="stat-value">4</div>
                  <p className="stat-label mb-0">Medical Records</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6} className="mb-3">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <div className="stat-value">1</div>
                  <p className="stat-label mb-0">New Messages</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3} sm={6} className="mb-3">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column justify-content-center">
                  <div className="stat-value">85%</div>
                  <p className="stat-label mb-0">Treatment Progress</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Middle Section */}
          <Row className="mb-4">
            <Col md={6} className="mb-3">
              <Card className="h-100 dashboard-card">
                <Card.Header>
                  <strong>Your Upcoming Appointments</strong>
                </Card.Header>
                <Card.Body>
                  <Card className="appointment-card mb-2">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="patient-avatar me-3">DS</div>
                          <div>
                            <h6 className="mb-1">Dr. Smith - Wheelchair Assessment</h6>
                            <span className="text-muted">April 20, 2025 • 10:00 AM - 11:00 AM</span>
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
                          <div className="patient-avatar me-3">DJ</div>
                          <div>
                            <h6 className="mb-1">Physical Therapy with Dr. Johnson</h6>
                            <span className="text-muted">April 28, 2025 • 2:30 PM - 3:30 PM</span>
                          </div>
                        </div>
                        <Button variant="outline-primary" size="sm">View</Button>
                      </div>
                    </Card.Body>
                  </Card>
                  <div className="text-center mt-3">
                    <Button variant="primary">View All Appointments</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-3">
              <Card className="h-100 dashboard-card">
                <Card.Header>
                  <strong>Messages</strong>
                </Card.Header>
                <Card.Body>
                  <Card className="message-card mb-2">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="patient-avatar me-3">DA</div>
                          <div>
                            <h6 className="mb-1">Dr. Amina</h6>
                            <span className="text-muted">Please remember to fast before your blood test appointment...</span>
                          </div>
                        </div>
                        <Badge bg="primary" className="message-badge">New</Badge>
                      </div>
                    </Card.Body>
                  </Card>
                  <div className="text-center mt-3">
                    <Button variant="primary">Go to Messages</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Bottom Sections */}
          <Row>
            <Col md={6} className="mb-3">
              <Card className="dashboard-card">
                <Card.Header>
                  <strong>Medical Records</strong>
                </Card.Header>
                <Card.Body>
                  <p className="text-muted mb-3">Last Updated: April 12, 2025</p>
                  <ul className="records-list">
                    <li className="record-item d-flex align-items-center mb-2">
                      <div className="check-icon me-2">✓</div>
                      <span>Blood Test Results</span>
                    </li>
                    <li className="record-item d-flex align-items-center mb-2">
                      <div className="check-icon me-2">✓</div>
                      <span>X-Ray Report</span>
                    </li>
                    <li className="record-item d-flex align-items-center mb-2">
                      <div className="check-icon me-2">✓</div>
                      <span>Wheelchair Fitting Assessment</span>
                    </li>
                    <li className="record-item d-flex align-items-center mb-2">
                      <div className="check-icon me-2">✓</div>
                      <span>Physical Therapy Notes</span>
                    </li>
                  </ul>
                  <div className="text-center mt-3">
                    <Button variant="primary">View Full Records</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-3">
              <Card className="dashboard-card">
                <Card.Header>
                  <strong>Daily Health Tips</strong>
                </Card.Header>
                <Card.Body>
                  <Card className="tip-card mb-2">
                    <Card.Body>
                      <div className="d-flex">
                        <div className="tip-icon me-3">💧</div>
                        <div>
                          <p className="mb-0">Drink at least 2 liters of water daily and aim for 30 minutes of physical activity. It's important to maintain proper hydration and exercise, even when using a wheelchair.</p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card className="tip-card">
                    <Card.Body>
                      <div className="d-flex">
                        <div className="tip-icon me-3">🔧</div>
                        <div>
                          <p className="mb-0">Remember to inspect your wheelchair regularly for any signs of wear. Regular maintenance can prevent accidents and extend the life of your mobility device.</p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      
     
    </div>
  );
}

// This is needed for the Badge component
const Badge = ({ bg, className, children }) => {
  return (
    <span className={`badge bg-${bg} ${className}`}>
      {children}
    </span>
  );
};

export default PatientDashboard;
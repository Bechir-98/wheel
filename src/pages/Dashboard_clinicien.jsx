import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function ClinicianDashboard() {
  return (
    <div className="dashboard-wrapper">
          <Sidebar role="clinician" />

      {/* Main Content */}
      <div className="main-content">
        <Container fluid>
          {/* Stat Cards Row */}
          <Row className="stat-cards mb-5">
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
          <Row>
          <Col md={6} className=" mb-5 ">
          <Card className=" dashboard-card  w-100">
                <Card.Header>
                  <strong>Today's Consultations</strong>
                </Card.Header>
                <Card.Body>

                  <Card className="appointment-card mb-2 w-100  h-25 ">
                    <Card.Body>
                      <div className="   justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="patient-avatar me-4">JD</div>
                          <div>
                            <h6 className="mb-1">John Doe</h6>
                            <span className="text-muted">9:00 AM - Follow-up</span>
                          </div>
                        </div>
                        <Button variant="outline-primary" size="sm">View</Button>
                      </div>
                    </Card.Body>
                  </Card>

                  <Card className="appointment-card mb-2 w-100  h-25">
                    <Card.Body>
                      <div className=" justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="patient-avatar me-4">ES</div>
                          <div>
                            <h6 className="mb-1">Emily Smith</h6>
                            <span className="text-muted">11:30 AM - Initial consultation</span>
                          </div>
                        </div>
                        <Button variant="outline-primary" size="md">View</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-3 mb-5 h-50 w-50">
              <Card className=" dashboard-card  w-100">
                <Card.Header>
                  <strong>Recent Assessments</strong>
                </Card.Header>
                <Card.Body>
                  <Card className="aappointment-card mb-2 w-100  h-50 ">
                    <Card.Body>
                      <div className=" justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="patient-avatar me-4">RJ</div>
                          <div>
                            <h6 className="mb-1">Robert Johnson</h6>
                            <span className="text-muted">Completed yesterday</span>
                          </div>
                        </div>
                        <Button variant="outline-primary" size="sm">View</Button>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card className="appointment-card mb-2 w-100  h-50">
                    <Card.Body>
                      <div className=" justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="patient-avatar me-4 ">AL</div>
                          <div>
                            <h6 className="mb-1 ">Alice Lee</h6>
                            <span className="text-muted ">Pending review</span>
                          </div>
                        </div>
                        <Button variant="outline-primary" size="sm" >Review</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Bottom Section */}
          <Row>
            <Col md={12} >
              <Card className="dashboard-card w-100 ">
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
      
     
     
    </div>
  );
}

export default ClinicianDashboard;
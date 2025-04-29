import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import chair from '../assets/chair.svg';
import patient from '../assets/patient.svg';
import clinician from '../assets/clinician.svg';
import vendor from '../assets/vendor.svg';
import ff from '../assets/fpng.png';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';

function Home() {
  const [isFlippedP, setIsFlippedP] = useState(false);
  const [isFlippedC, setIsFlippedC] = useState(false);
  const [isFlippedV, setIsFlippedV] = useState(false);

  return (
    <div className="bg-light min-vh-100">
      {/* Hero Section */}
      <section className="py-5 bg-white shadow-sm position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-5"></div>
        <Container className="py-5 position-relative">
          <Row className="align-items-center">
            <Col md={6} className="pe-md-5">
              <span className="badge bg-primary mb-3 px-3 py-2">Welcome to Wheel Match</span>
              <h1 className="display-4 fw-bold mb-4 text-primary">Find the perfect wheelchair for your needs</h1>
              <p className="lead mb-4 text-muted">Personalized recommendations based on your condition, lifestyle, and preferences</p>
              <div className="d-grid gap-3 d-md-flex">
                <Button as={Link} to="/patientdashboard" variant="primary" size="lg" className="px-4 py-2">
                  Start as Patient
                </Button>
                <Button as={Link} to="/cliniciandashboard" variant="outline-primary" size="lg" className="px-4 py-2">
                  Start as Clinician
                </Button>
                <Button as={Link} to="/vendordashboard" variant="outline-primary" size="lg" className="px-4 py-2">
                  Start as Vendor
                </Button>
              </div>
            </Col>
            <Col md={6} className="text-center mt-4 mt-md-0">
              <img src={chair} alt="Wheelchair" className="img-fluid" style={{maxHeight: "400px"}} />
            </Col>
          </Row>
        </Container>
      </section>

      {/* How it works Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <span className="badge bg-primary mb-2 px-3 py-2">Process</span>
            <h2 className="display-5 fw-bold">How it works</h2>
            <p className="lead text-muted">Simple steps to find your perfect match</p>
          </div>
          <Row className="align-items-center justify-content-center text-center g-4">
            <Col md={3}>
              <div className="p-4 bg-white rounded-3 shadow-sm h-100 position-relative">
                <div className="position-absolute top-0 start-0 translate-middle badge bg-primary rounded-pill">1</div>
                <img src={patient} alt="Patient" className="img-fluid mb-4" style={{maxHeight: "150px"}} />
                <h3 className="h4 mb-3">Patient</h3>
                <p className="text-muted mb-0">Enters personal data</p>
              </div>
            </Col>
            <Col md={1} className="d-none d-md-block">
              <img src={ff} alt="Process step" className="img-fluid" />
            </Col>
            <Col md={3}>
              <div className="p-4 bg-white rounded-3 shadow-sm h-100 position-relative">
                <div className="position-absolute top-0 start-0 translate-middle badge bg-primary rounded-pill">2</div>
                <img src={clinician} alt="Clinician" className="img-fluid mb-4" style={{maxHeight: "150px"}} />
                <h3 className="h4 mb-3">Clinician</h3>
                <p className="text-muted mb-0">Adds their info</p>
              </div>
            </Col>
            <Col md={1} className="d-none d-md-block">
              <img src={ff} alt="Process step" className="img-fluid" />
            </Col>
            <Col md={3}>
              <div className="p-4 bg-white rounded-3 shadow-sm h-100 position-relative">
                <div className="position-absolute top-0 start-0 translate-middle badge bg-primary rounded-pill">3</div>
                <img src={vendor} alt="Vendor" className="img-fluid mb-4" style={{maxHeight: "150px"}} />
                <h3 className="h4 mb-3">Vendor</h3>
                <p className="text-muted mb-0">Finalizes & schedules test</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Who is this for Section */}
      <section className="py-5 bg-white">
        <Container>
          <div className="text-center mb-5">
            <span className="badge bg-primary mb-2 px-3 py-2">Users</span>
            <h2 className="display-5 fw-bold">Who is this for?</h2>
            <p className="lead text-muted">Choose your role to get started</p>
          </div>
          <Row className="g-4">
            {/* Patient Card */}
            <Col md={4}>
              <ReactCardFlip isFlipped={isFlippedP} flipDirection="horizontal">
                <Card className="h-100 border-0 shadow-sm" onClick={() => setIsFlippedP(true)}>
                  <Card.Body className="text-center p-4">
                    <img src={patient} alt="Patient" className="img-fluid mb-4" style={{maxHeight: "150px"}} />
                    <h3 className="h4 mb-3">Patient</h3>
                    <p className="text-muted mb-0">Click to learn more</p>
                  </Card.Body>
                </Card>
                <Card className="h-100 border-0 shadow-sm" onClick={() => setIsFlippedP(false)}>
                  <Card.Body className="d-flex align-items-center p-4">
                    <p className="mb-0 text-muted">
                      Get matched with the most suitable wheelchair based on your physical condition, lifestyle, and preferences.
                      Easy onboarding and personalized results.
                    </p>
                  </Card.Body>
                </Card>
              </ReactCardFlip>
            </Col>

            {/* Clinician Card */}
            <Col md={4}>
              <ReactCardFlip isFlipped={isFlippedC} flipDirection="horizontal">
                <Card className="h-100 border-0 shadow-sm" onClick={() => setIsFlippedC(true)}>
                  <Card.Body className="text-center p-4">
                    <img src={clinician} alt="Clinician" className="img-fluid mb-4" style={{maxHeight: "150px"}} />
                    <h3 className="h4 mb-3">Clinician</h3>
                    <p className="text-muted mb-0">Click to learn more</p>
                  </Card.Body>
                </Card>
                <Card className="h-100 border-0 shadow-sm" onClick={() => setIsFlippedC(false)}>
                  <Card.Body className="d-flex align-items-center p-4">
                    <p className="mb-0 text-muted">
                      Assist patients by providing medical insights and mobility assessments.
                      Collaborate in the recommendation process to ensure accurate fittings.
                    </p>
                  </Card.Body>
                </Card>
              </ReactCardFlip>
            </Col>

            {/* Vendor Card */}
            <Col md={4}>
              <ReactCardFlip isFlipped={isFlippedV} flipDirection="horizontal">
                <Card className="h-100 border-0 shadow-sm" onClick={() => setIsFlippedV(true)}>
                  <Card.Body className="text-center p-4">
                    <img src={vendor} alt="Vendor" className="img-fluid mb-4" style={{maxHeight: "150px"}} />
                    <h3 className="h4 mb-3">Vendor</h3>
                    <p className="text-muted mb-0">Click to learn more</p>
                  </Card.Body>
                </Card>
                <Card className="h-100 border-0 shadow-sm" onClick={() => setIsFlippedV(false)}>
                  <Card.Body className="d-flex align-items-center p-4">
                    <p className="mb-0 text-muted">
                      Receive qualified leads based on medical and personal data.
                      Schedule product trials, manage logistics, and offer tailored wheelchair solutions.
                    </p>
                  </Card.Body>
                </Card>
              </ReactCardFlip>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Let's Get Started Section */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="align-items-center">
            <Col md={8} className="text-center text-md-start">
              <h2 className="display-5 fw-bold mb-3">Ready to find your perfect match?</h2>
              <p className="lead mb-0">Join thousands of users who have found their ideal wheelchair through our platform.</p>
            </Col>
            <Col md={4} className="text-center text-md-end mt-4 mt-md-0">
              <Button as={Link} to="/patientdashboard" variant="light" size="lg" className="px-4 py-2">
                Get Started Now
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Home;

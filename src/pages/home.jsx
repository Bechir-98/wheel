import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <section className="hero-section py-5 bg-primary text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} data-aos="fade-right">
              <h1 className="display-4 fw-bold">Find Your Perfect Wheelchair</h1>
              <p className="lead">Connecting patients with the right mobility solutions</p>
              <Button as={Link} to="/wheelchairs" variant="light" size="lg" className="mt-3">
                Browse Wheelchairs
              </Button>
            </Col>
            <Col lg={6} data-aos="fade-left">
              <img src="/assets/hero-image.jpg" alt="Hero" className="img-fluid rounded-3" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="features-section py-5">
        <Container>
          <h2 className="text-center mb-5">Our Services</h2>
          <Row className="g-4">
            {['Patients', 'Clinicians', 'Vendors'].map((user) => (
              <Col md={4} key={user} data-aos="fade-up">
                <Card className="h-100 shadow-sm">
                  <Card.Body className="text-center">
                    <i className={`bi bi-person-${user.toLowerCase()} fs-1 mb-3`}></i>
                    <Card.Title>For {user}</Card.Title>
                    <Card.Text>
                      Specialized solutions for {user.toLowerCase()} to manage wheelchair services effectively.
                    </Card.Text>
                    <Button variant="outline-primary" as={Link} to={`/${user.toLowerCase()}/dashboard`}>
                      Learn More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;

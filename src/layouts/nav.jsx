import React from 'react';
import brand from '../assets/brand.png';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Navb() {
  const location = useLocation();

  const scrollToFooter = (e) => {
    e.preventDefault();
    const footer = document.getElementById('about');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Navbar 
        bg="dark" 
        data-bs-theme="dark" 
        fixed="top"
        expand="lg"
        style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
      >
        <Container fluid style={{ padding: '0 20px' }}>
          <Navbar.Brand as={Link} to="/" style={{ marginRight: 'auto' }} onClick={scrollToTop}>
            <img
              src={brand}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Wheel Match Logo"
              loading="lazy"
            />
            <span style={{ marginLeft: "10px" }}>Wheel Match</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link 
                as={Link} 
                to="/"
                className={location.pathname === '/' ? 'active' : ''}
                onClick={scrollToTop}
              >
                Home
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/wheelchairs"
                className={location.pathname === '/wheelchairs' ? 'active' : ''}
                onClick={scrollToTop}
              >
                Wheelchairs
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/faq"
                onClick={scrollToTop}
              >
                FAQ
              </Nav.Link>
              <Nav.Link 
                href="#about"
                onClick={(e) => {
                  scrollToTop();
                  scrollToFooter(e);
                }}
              >
                About
              </Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link 
                as={Link}
                to="/log"
                className={location.pathname === '/log' ? 'active' : ''}
                style={{ marginLeft: 'auto', whiteSpace: 'nowrap' }}
                onClick={scrollToTop}
              >
                Sign in / Sign up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Spacer to avoid content hiding under fixed navbar */}
      <div style={{ paddingTop: '70px' }} />
    </>
  );
}

export default Navb;

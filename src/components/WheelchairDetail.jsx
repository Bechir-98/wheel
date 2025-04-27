import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Row, Col, Card, Button, Badge, Spinner, Alert,
  Carousel, ListGroup, Tab, Tabs, Image, Modal
} from 'react-bootstrap';

// Import images
import standardWheelchair from '../assets/wheelchair-standard.jpg';
import customWheelchair from '../assets/wheelchair-custom.jpg';
import sportWheelchair from '../assets/wheelchair-sport.jpg';
import defaultWheelchair from '../assets/brand.png';
import componentImage1 from '../assets/component1.jpg';
import componentImage2 from '../assets/component2.jpg';

const WheelchairDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [wheelchair, setWheelchair] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedWheelchairs, setRelatedWheelchairs] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [showEnlargeModal, setShowEnlargeModal] = useState(false);

  // Image handling with multiple fallbacks
  const getWheelchairImage = (typeName) => {
    const imageMap = {
      'standard': standardWheelchair,
      'sur mesure': customWheelchair,
      'sportif': sportWheelchair,
    //   'pediatric': require('../assets/wheelchair-pediatric.jpg')
    };
    
    const normalizedType = typeName?.trim().toLowerCase();
    return imageMap[normalizedType] || defaultWheelchair;
  };

  // Fetch wheelchair details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch main wheelchair data
        const wheelchairResponse = await fetch(`http://localhost/wheel_api/getWheelchair.php?id=${id}`);
        if (!wheelchairResponse.ok) throw new Error('Wheelchair not found');
        const wheelchairData = await wheelchairResponse.json();
        
        // Fetch related wheelchairs (same type)
        const relatedResponse = await fetch(
          `http://localhost/wheel_api/getWheelchairs.php?type=${wheelchairData.ID_TYPE}&exclude=${id}`
        );
        const relatedData = await relatedResponse.json();
        
        setWheelchair(wheelchairData);
        setRelatedWheelchairs(relatedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return (
    <Container className="py-5 text-center">
      <Spinner animation="border" variant="primary" />
      <p className="mt-2">Loading wheelchair details...</p>
    </Container>
  );

  if (error) return (
    <Container className="py-5">
      <Alert variant="danger">
        <Alert.Heading>Error Loading Wheelchair</Alert.Heading>
        <p>{error}</p>
        <Button onClick={() => navigate('/wheelchairs')}>Back to Wheelchairs</Button>
      </Alert>
    </Container>
  );

  if (!wheelchair) return (
    <Container className="py-5">
      <Alert variant="warning">
        <Alert.Heading>Wheelchair Not Found</Alert.Heading>
        <p>The requested wheelchair could not be found.</p>
        <Button onClick={() => navigate('/wheelchairs')}>Back to Wheelchairs</Button>
      </Alert>
    </Container>
  );

  // Create image gallery (main image + additional angles)
  const images = [
    getWheelchairImage(wheelchair.NOM_TYPE),
    componentImage1,
    componentImage2
  ].filter(Boolean);

  return (
    <Container className="py-4">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate('/wheelchairs')}
        className="mb-4"
      >
        &larr; Back to Wheelchairs
      </Button>
      
      <Row className="mb-5">
        <Col lg={6}>
          {/* Image Gallery */}
          <Card className="mb-4 shadow-sm">
            <Carousel 
              activeIndex={activeImage} 
              onSelect={setActiveImage}
              interval={null}
              indicators={images.length > 1}
              controls={images.length > 1}
            >
              {images.map((img, idx) => (
                <Carousel.Item key={idx}>
                  <div 
                    style={{ 
                      height: '400px', 
                      background: `url(${img}) center/contain no-repeat`,
                      cursor: 'pointer'
                    }}
                    onClick={() => setShowEnlargeModal(true)}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            
            {/* Thumbnail navigation */}
            {images.length > 1 && (
              <div className="d-flex justify-content-center p-2">
                {images.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img}
                    thumbnail
                    style={{
                      width: '60px',
                      height: '60px',
                      margin: '0 5px',
                      cursor: 'pointer',
                      opacity: activeImage === idx ? 1 : 0.6
                    }}
                    onClick={() => setActiveImage(idx)}
                  />
                ))}
              </div>
            )}
          </Card>
        </Col>
        
        <Col lg={6}>
          {/* Main Info Card */}
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="d-flex justify-content-between align-items-start">
                <h2 className="mb-3">{wheelchair.NOM_TYPE}</h2>
                <div>
                  {wheelchair.isNew && (
                    <Badge pill bg="danger" className="me-2">New</Badge>
                  )}
                  {wheelchair.PROPULTION === 1 && (
                    <Badge bg="info">⚡ Powered</Badge>
                  )}
                </div>
              </Card.Title>
              
              <div className="mb-4">
                <h3 className="text-success mb-2">${Number(wheelchair.PRIX).toFixed(2)}</h3>
                <p className={wheelchair.QT_STOCK > 0 ? "text-success" : "text-danger"}>
                  <strong>Availability:</strong> {wheelchair.QT_STOCK > 0 ? 
                    `${wheelchair.QT_STOCK} in stock` : "Out of stock"}
                </p>
              </div>

              {/* Tabs for different sections */}
              <Tabs defaultActiveKey="specs" className="mb-4">
                <Tab eventKey="specs" title="Specifications">
                  <ListGroup variant="flush" className="mt-3">
                    <ListGroup.Item>
                      <strong>Type:</strong> {wheelchair.NOM_TYPE}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Propulsion:</strong> {wheelchair.PROPULTION ? "Yes" : "No"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Weight Capacity:</strong> {wheelchair.POIDS_MAX || '150 kg'}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Dimensions:</strong> {wheelchair.DIMENSIONS || 'N/A'}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Weight:</strong> {wheelchair.POIDS || 'N/A'} kg
                    </ListGroup.Item>
                  </ListGroup>
                </Tab>
                
                <Tab eventKey="options" title="Options">
                  {wheelchair.options?.length > 0 ? (
                    <ListGroup variant="flush" className="mt-3">
                      {wheelchair.options.map(option => (
                        <ListGroup.Item key={option.ID_OPTION}>
                          <strong>{option.NOM_OPTION}</strong>
                          {option.TAILLE_OPTION && (
                            <span className="text-muted"> ({option.TAILLE_OPTION})</span>
                          )}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p className="mt-3">No additional options</p>
                  )}
                </Tab>
                
                <Tab eventKey="components" title="Components">
                  {wheelchair.components?.length > 0 ? (
                    <ListGroup variant="flush" className="mt-3">
                      {wheelchair.components.map(comp => (
                        <ListGroup.Item key={comp.ID_COMPOSANT}>
                          <strong>{comp.NOM_COMP}</strong>
                          {comp.TAILLE_COMP && (
                            <span className="text-muted"> - Size: {comp.TAILLE_COMP}</span>
                          )}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <p className="mt-3">No component information available</p>
                  )}
                </Tab>
                
                <Tab eventKey="pathologies" title="Recommended For">
                  {wheelchair.pathologies?.length > 0 ? (
                    <div className="mt-3">
                      <p>This wheelchair is recommended for the following conditions:</p>
                      <ul>
                        {wheelchair.pathologies.map(path => (
                          <li key={path.ID_PATHOLOGIE}>
                            <strong>{path.NOM_PAT}</strong>
                            <p className="text-muted small">{path.DESCRIPTION}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="mt-3">No specific pathology recommendations</p>
                  )}
                </Tab>
              </Tabs>
              
              <div className="mt-auto d-grid gap-2">
                <Button 
                  variant="primary" 
                  size="lg"
                  disabled={wheelchair.QT_STOCK <= 0}
                >
                  {wheelchair.QT_STOCK > 0 ? "Add to Cart" : "Notify When Available"}
                </Button>
                <Button variant="outline-secondary">
                  Contact Specialist
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Related Wheelchairs Section */}
      {relatedWheelchairs.length > 0 && (
        <section className="mt-5">
          <h3 className="mb-4">Similar Wheelchairs</h3>
          <Row className="g-4">
            {relatedWheelchairs.map(wheelchair => (
              <Col key={wheelchair.ID_FAUTEUIL} xs={12} sm={6} md={4} lg={3}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={getWheelchairImage(wheelchair.NOM_TYPE)}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-between">
                      <span>{wheelchair.NOM_TYPE}</span>
                      {wheelchair.PROPULTION === 1 && (
                        <Badge bg="info" className="ms-2">⚡</Badge>
                      )}
                    </Card.Title>
                    <Card.Text className="text-success fw-bold">
                      ${Number(wheelchair.PRIX).toFixed(2)}
                    </Card.Text>
                    <Button 
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/wheelchairs/${wheelchair.ID_FAUTEUIL}`)}
                      className="w-100"
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      )}
      
      {/* Image Enlarge Modal */}
      <Modal 
        show={showEnlargeModal} 
        onHide={() => setShowEnlargeModal(false)}
        size="lg"
        centered
      >
        <Modal.Body className="p-0">
          <img 
            src={images[activeImage]} 
            alt="Wheelchair enlarged view"
            style={{ width: '100%', height: 'auto' }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default WheelchairDetail;
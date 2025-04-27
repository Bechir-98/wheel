import { useState, useEffect, useMemo } from "react";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Form, 
  Badge, 
  Spinner, 
  Alert,
  Placeholder 
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

// Import default images
import standardWheelchair from '../assets/wheelchair-standard.jpg';
import customWheelchair from '../assets/wheelchair-custom.jpg';
import sportWheelchair from '../assets/wheelchair-sport.jpg';
import defaultWheelchair from '../assets/brand.png';

// Configuration
const API_BASE_URL = "http://localhost/wheel_api/";

// Skeleton Loader Component
const WheelchairSkeleton = () => (
  <Col xs={12} sm={6} lg={4} className="mb-4">
    <Card className="h-100">
      <div className="bg-light" style={{ height: '200px' }} />
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} />
        </Placeholder>
        <Placeholder.Button variant="primary" xs={12} />
      </Card.Body>
    </Card>
  </Col>
);

const WheelchairsPage = () => {
  const [filters, setFilters] = useState({
    type: "",
    inStockOnly: true,
    search: "",
    propulsion: "",
    showNewOnly: false
  });

  const [wheelchairs, setWheelchairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Enhanced image handling with multiple fallbacks
  const getWheelchairImage = (typeName) => {
    if (!typeName) return defaultWheelchair;
    
    // Normalize the type name for comparison
    const normalizedType = typeName.trim().toLowerCase();
    
    // Define image mappings (all lowercase for case-insensitive matching)
    const imageMap = {
      'standard': standardWheelchair,
      'sur mesure': customWheelchair,
      'sportif': sportWheelchair,
      // Add more mappings as needed
      'pediatric': defaultWheelchair,
      'luxe': defaultWheelchair
    };
    
    // Return matching image or default
    return imageMap[normalizedType] || defaultWheelchair;
  };

  // Fetch wheelchair data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}getWheelchairs.php`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Enhance data with additional fields
        const enhancedData = data.map(w => ({
          ...w,
          isNew: w.ID_FAUTEUIL > 103,
          imageUrl: getWheelchairImage(w.NOM_TYPE),
          hasOptions: w.options && w.options.length > 0
        }));
        
        setWheelchairs(enhancedData);
      } catch (error) {
        let errorMessage = "Failed to load wheelchairs";
        if (error.message.includes('Failed to fetch')) {
          errorMessage = "Network error - please check your connection";
        } else if (error.response?.status === 404) {
          errorMessage = "Data not found";
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter handlers
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      type: "",
      inStockOnly: true,
      search: "",
      propulsion: "",
      showNewOnly: false
    });
  };

  // Memoized filtered results
  const filteredWheelchairs = useMemo(() => {
    return wheelchairs.filter(w => {
      return (
        (!filters.type || w.NOM_TYPE === filters.type) &&
        (!filters.inStockOnly || w.QT_STOCK > 0) &&
        (!filters.search || w.NOM_TYPE.toLowerCase().includes(filters.search.toLowerCase())) &&
        (!filters.propulsion || w.PROPULTION.toString() === filters.propulsion) &&
        (!filters.showNewOnly || w.isNew)
      );
    });
  }, [wheelchairs, filters]);

  const uniqueTypes = [...new Set(wheelchairs.map(w => w.NOM_TYPE))];

  // Loading state
  if (loading) return (
    <Container fluid className="py-4 bg-light">
      <Row>
        <Col md={3} className="mb-4">
          <div className="p-3 bg-white rounded shadow-sm">
            <Placeholder as="h4" animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Form} animation="glow">
              {[...Array(4)].map((_, i) => (
                <Placeholder key={i} as={Form.Group} className="mb-3">
                  <Placeholder as={Form.Label} xs={4} />
                  <Placeholder as={Form.Control} xs={12} />
                </Placeholder>
              ))}
            </Placeholder>
          </div>
        </Col>
        <Col md={9}>
          <Row className="g-4">
            {[...Array(6)].map((_, i) => <WheelchairSkeleton key={i} />)}
          </Row>
        </Col>
      </Row>
    </Container>
  );

  // Error state
  if (error) return (
    <Container className="py-5">
      <Alert variant="danger">
        <Alert.Heading>Error loading data</Alert.Heading>
        <p>{error}</p>
        <div className="d-flex gap-2">
          <Button variant="primary" onClick={() => window.location.reload()}>
            Retry
          </Button>
          <Button variant="secondary" onClick={() => setError(null)}>
            Dismiss
          </Button>
        </div>
      </Alert>
    </Container>
  );

  return (
    <Container fluid className="py-4 bg-light">
      <Row>
        {/* Filter Sidebar */}
        <Col md={3} className="mb-4">
          <div className="p-3 bg-white rounded shadow-sm sticky-top" style={{top: '20px'}}>
            <h4 className="mb-3 text-primary">Filters</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="visually-hidden">Search</Form.Label>
                <Form.Control
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="🔍 Search by name"
                  className="shadow-sm"
                  aria-label="Search wheelchairs by name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="visually-hidden">Type</Form.Label>
                <Form.Select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="shadow-sm"
                  aria-label="Filter by wheelchair type"
                >
                  <option value="">All Types</option>
                  {uniqueTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="visually-hidden">Propulsion</Form.Label>
                <Form.Select
                  name="propulsion"
                  value={filters.propulsion}
                  onChange={handleFilterChange}
                  className="shadow-sm"
                  aria-label="Filter by propulsion type"
                >
                  <option value="">All Propulsion Types</option>
                  <option value="1">With Propulsion</option>
                  <option value="0">Without Propulsion</option>
                </Form.Select>
              </Form.Group>

              <Form.Check
                type="checkbox"
                id="inStockOnly"
                label="In Stock Only"
                name="inStockOnly"
                checked={filters.inStockOnly}
                onChange={handleFilterChange}
                className="mb-3 fw-bold"
              />

              <Form.Check
                type="checkbox"
                id="showNewOnly"
                label="New Arrivals Only"
                name="showNewOnly"
                checked={filters.showNewOnly}
                onChange={handleFilterChange}
                className="mb-3 fw-bold"
              />

              <Button
                variant="outline-secondary"
                onClick={resetFilters}
                className="w-100 shadow-sm"
                aria-label="Reset all filters"
              >
                Reset All Filters
              </Button>
            </Form>
          </div>
        </Col>

        {/* Wheelchair Listings */}
        <Col md={9}>
          <Row className="g-4">
            {filteredWheelchairs.length > 0 ? (
              filteredWheelchairs.map(wheelchair => (
                <Col key={wheelchair.ID_FAUTEUIL} xs={12} sm={6} lg={4}>
                  <Card className="h-100 shadow-sm border-0 overflow-hidden hover-shadow">
                    {/* Wheelchair Image */}
                    <div 
                      className="position-relative" 
                      style={{ height: "200px", overflow: 'hidden', cursor: 'pointer' }}
                      onClick={() => navigate(`/wheelchairs/${wheelchair.ID_FAUTEUIL}`)}
                    >
                      <img
                        src={wheelchair.imageUrl}
                        alt={`${wheelchair.NOM_TYPE} wheelchair`}
                        className="img-fluid h-100 w-100 object-fit-cover"
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.src = defaultWheelchair;
                        }}
                        loading="lazy"
                      />
                      {/* Status Badges */}
                      {wheelchair.isNew && (
                        <Badge 
                          pill 
                          bg="danger" 
                          className="position-absolute top-0 start-0 m-2"
                          aria-label="New arrival"
                        >
                          New
                        </Badge>
                      )}
                      {wheelchair.hasOptions && (
                        <Badge 
                          pill 
                          bg="success" 
                          className="position-absolute top-0 end-0 m-2"
                          aria-label="Has options"
                        >
                          Options
                        </Badge>
                      )}
                      {wheelchair.QT_STOCK <= 3 && wheelchair.QT_STOCK > 0 && (
                        <Badge 
                          pill 
                          bg="warning" 
                          className="position-absolute bottom-0 end-0 m-2"
                          aria-label="Low stock"
                        >
                          Low Stock
                        </Badge>
                      )}
                    </div>

                    <Card.Body className="d-flex flex-column">
                      <Card.Title 
                        className="d-flex justify-content-between align-items-start"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/wheelchairs/${wheelchair.ID_FAUTEUIL}`)}
                      >
                        <span className="me-2">{wheelchair.NOM_TYPE}</span>
                        {wheelchair.PROPULTION === 1 && (
                          <Badge bg="info" className="ms-auto" aria-hidden="true">
                            ⚡ Powered
                          </Badge>
                        )}
                      </Card.Title>
                      
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="text-success fw-bold fs-5">
                            ${Number(wheelchair.PRIX).toFixed(2)}
                          </span>
                          <small 
                            className={wheelchair.QT_STOCK > 0 ? "text-success" : "text-danger"}
                            aria-label={`Stock status: ${wheelchair.QT_STOCK > 0 ? `${wheelchair.QT_STOCK} in stock` : 'Out of stock'}`}
                          >
                            {wheelchair.QT_STOCK > 0 ? `${wheelchair.QT_STOCK} in stock` : "Out of stock"}
                          </small>
                        </div>
                        <div className="d-grid gap-2">
                          <Button 
                            variant="primary"
                            onClick={() => navigate(`/wheelchairs/${wheelchair.ID_FAUTEUIL}`)}
                            disabled={wheelchair.QT_STOCK <= 0}
                            aria-label={`View details for ${wheelchair.NOM_TYPE}`}
                          >
                            View Details
                          </Button>
                          {wheelchair.QT_STOCK > 0 && (
                            <Button 
                              variant="outline-primary"
                              aria-label={`Add ${wheelchair.NOM_TYPE} to cart`}
                            >
                              Add to Cart
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col className="text-center py-5">
                <div className="p-4 bg-white rounded shadow-sm">
                  <h5 className="text-muted mb-3">No matching wheelchairs found</h5>
                  <p className="text-muted mb-4">Try adjusting your filters</p>
                  <Button
                    variant="primary"
                    onClick={resetFilters}
                    className="shadow-sm"
                    aria-label="Reset all filters"
                  >
                    Reset All Filters
                  </Button>
                </div>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

WheelchairsPage.propTypes = {
  // Add prop types if needed
};

export default WheelchairsPage;
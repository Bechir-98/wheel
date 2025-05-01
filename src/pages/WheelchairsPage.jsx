import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Form, 
  Badge, 
  Alert,
  Placeholder,
  InputGroup,
  Dropdown,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
    <Card className="h-100 shadow-sm">
      <Placeholder as={Card.Img} variant="top" className="bg-light" style={{ height: '200px' }} />
      <Card.Body className="d-flex flex-column">
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={8} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow" className="mb-4">
          <Placeholder xs={7} /> <Placeholder xs={4} />
        </Placeholder>
        <div className="mt-auto">
          <Placeholder.Button variant="primary" xs={12} className="mb-2" />
          <Placeholder.Button variant="outline-primary" xs={12} />
        </div>
      </Card.Body>
    </Card>
  </Col>
);

const WheelchairsPage = () => {
  // State management
  const [filters, setFilters] = useState({
    type: "",
    inStockOnly: true,
    search: "",
    propulsion: "",
    showNewOnly: false,
    minPrice: "",
    maxPrice: ""
  });
  
  const [wheelchairs, setWheelchairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("featured");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  
  const navigate = useNavigate();

  // Helper function to get wheelchair image based on type
  const getWheelchairImage = useCallback((typeName) => {
    if (!typeName) return defaultWheelchair;
    
    const normalizedType = typeName.trim().toLowerCase();
    
    const imageMap = {
      'standard': standardWheelchair,
      'sur mesure': customWheelchair,
      'sportif': sportWheelchair,
      'pediatric': defaultWheelchair,
      'luxe': defaultWheelchair
    };
    
    return imageMap[normalizedType] || defaultWheelchair;
  }, []);

  // Fetch wheelchair data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}getWheelchairs.php`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Process and enhance the data
        const enhancedData = data.map(w => ({
          ...w,
          isNew: w.NEW === true || w.ID_FAUTEUIL > 15,
          imageUrl: getWheelchairImage(w.NOM_TYPE),
          OPTIONS: w.OPTIONS || '',
          hasOptions: w.OPTIONS && w.OPTIONS.length > 0,
          price: parseFloat(w.PRIX)
        }));
        
        setWheelchairs(enhancedData);
        setError(null);
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
  }, [getWheelchairImage]);

  // Filter change handler
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      type: "",
      inStockOnly: true,
      search: "",
      propulsion: "",
      showNewOnly: false,
      minPrice: "",
      maxPrice: ""
    });
    setSortOrder("featured");
  };

  // Sort change handler
  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  // Filter and sort wheelchairs
  const filteredAndSortedWheelchairs = useMemo(() => {
    // First apply filters
    let result = wheelchairs.filter(w => {
      const matchesType = !filters.type || w.NOM_TYPE === filters.type;
      const matchesStock = !filters.inStockOnly || parseInt(w.QT_STOCK) > 0;
      const matchesSearch = !filters.search || 
        w.NOM_TYPE.toLowerCase().includes(filters.search.toLowerCase()) ||
        (w.OPTIONS && w.OPTIONS.toLowerCase().includes(filters.search.toLowerCase()));
      const matchesPropulsion = !filters.propulsion || w.PROPULTION === filters.propulsion;
      const matchesNew = !filters.showNewOnly || w.isNew;
      
      // Price filtering
      const minPrice = filters.minPrice ? parseFloat(filters.minPrice) : 0;
      const maxPrice = filters.maxPrice ? parseFloat(filters.maxPrice) : Infinity;
      const matchesPrice = w.price >= minPrice && w.price <= maxPrice;

      return matchesType && matchesStock && matchesSearch && matchesPropulsion && matchesNew && matchesPrice;
    });

    // Then apply sorting
    if (sortOrder === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "newest") {
      result.sort((a, b) => b.ID_FAUTEUIL - a.ID_FAUTEUIL);
    } else if (sortOrder === "stock") {
      result.sort((a, b) => parseInt(b.QT_STOCK) - parseInt(a.QT_STOCK));
    }

    return result;
  }, [wheelchairs, filters, sortOrder]);

  // Extract unique types for filter dropdown
  const uniqueTypes = useMemo(() => {
    return [...new Set(wheelchairs.map(w => w.NOM_TYPE))];
  }, [wheelchairs]);

  // Calculate price range
  const priceRange = useMemo(() => {
    if (!wheelchairs.length) return { min: 0, max: 5000 };
    
    return wheelchairs.reduce((acc, wheelchair) => {
      const price = parseFloat(wheelchair.PRIX);
      return {
        min: Math.min(acc.min, price),
        max: Math.max(acc.max, price)
      };
    }, { min: Infinity, max: 0 });
  }, [wheelchairs]);

  // View item handler
  const handleViewItem = useCallback((id) => {
    navigate(`/wheelchairs/${id}`);
  }, [navigate]);

  // Add to cart handler
  const handleAddToCart = useCallback((wheelchair, e) => {
    e.stopPropagation();
    // Implement cart functionality here
    console.log(`Added wheelchair ${wheelchair.ID_FAUTEUIL} to cart`);
    // Here you would dispatch to a cart context or redux store
  }, []);

  // Loading state UI
  if (loading) return (
    <Container fluid className="py-5 bg-light">
      <Row>
        <Col md={3} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Form} animation="glow">
                {[...Array(5)].map((_, i) => (
                  <Placeholder key={i} as={Form.Group} className="mb-3">
                    <Placeholder as={Form.Label} xs={4} />
                    <Placeholder as={Form.Control} xs={12} />
                  </Placeholder>
                ))}
              </Placeholder>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Row className="g-4">
            {[...Array(6)].map((_, i) => <WheelchairSkeleton key={i} />)}
          </Row>
        </Col>
      </Row>
    </Container>
  );

  // Error state UI
  if (error) return (
    <Container className="py-5">
      <Alert variant="danger" className="shadow">
        <Alert.Heading className="d-flex align-items-center">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Error loading data
        </Alert.Heading>
        <p>{error}</p>
        <div className="d-flex gap-2">
          <Button variant="primary" onClick={() => window.location.reload()}>
            <i className="bi bi-arrow-clockwise me-2"></i>Retry
          </Button>
          <Button variant="outline-secondary" onClick={() => setError(null)}>
            Dismiss
          </Button>
        </div>
      </Alert>
    </Container>
  );

  return (
    <Container fluid className="py-5 bg-light">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="display-5 fw-bold text-primary">Our Wheelchair Collection</h1>
          <p className="text-muted">Find the perfect wheelchair for your needs</p>
        </Col>
      </Row>
      
      {/* Mobile Filter Toggle Button - Only visible on small screens */}
      <Row className="d-md-none mb-3">
        <Col>
          <Button 
            variant="outline-primary" 
            className="w-100"
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
          >
            <i className={`bi bi-funnel${showFiltersMobile ? '-fill' : ''} me-2`}></i>
            {showFiltersMobile ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </Col>
      </Row>
      
      <Row>
        {/* Filter Sidebar */}
        <Col md={3} className={`mb-4 ${showFiltersMobile ? 'd-block' : 'd-none d-md-block'}`}>
          <Card className="shadow-sm sticky-top" style={{top: '20px'}}>
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-funnel me-2"></i>
                Filters
              </h5>
              <Badge bg="light" text="dark" pill className="d-flex align-items-center">
                {filteredAndSortedWheelchairs.length}
              </Badge>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-search"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="search"
                      value={filters.search}
                      onChange={handleFilterChange}
                      placeholder="Search wheelchairs..."
                      aria-label="Search wheelchairs by name"
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Wheelchair Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    aria-label="Filter by wheelchair type"
                  >
                    <option value="">All Types</option>
                    {uniqueTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Propulsion</Form.Label>
                  <Form.Select
                    name="propulsion"
                    value={filters.propulsion}
                    onChange={handleFilterChange}
                    aria-label="Filter by propulsion type"
                  >
                    <option value="">All Types</option>
                    <option value="1">With Propulsion</option>
                    <option value="0">Manual</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price Range</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        placeholder="Min"
                        min={priceRange.min}
                        max={priceRange.max}
                      />
                    </Col>
                    <Col xs="auto" className="d-flex align-items-center">-</Col>
                    <Col>
                      <Form.Control
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        placeholder="Max"
                        min={priceRange.min}
                        max={priceRange.max}
                      />
                    </Col>
                  </Row>
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
                  className="w-100"
                  aria-label="Reset all filters"
                >
                  <i className="bi bi-arrow-counterclockwise me-2"></i>
                  Reset Filters
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Wheelchair Listings */}
        <Col md={9}>
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
            <div className="mb-2 mb-md-0">
              <span className="badge bg-primary rounded-pill me-2">
                {filteredAndSortedWheelchairs.length} {filteredAndSortedWheelchairs.length === 1 ? 'Item' : 'Items'}
              </span>
              {filters.showNewOnly && (
                <span className="badge bg-danger rounded-pill me-2">
                  New Arrivals
                </span>
              )}
              {filters.inStockOnly && (
                <span className="badge bg-success rounded-pill me-2">
                  In Stock Only
                </span>
              )}
              {filters.type && (
                <span className="badge bg-info rounded-pill me-2">
                  Type: {filters.type}
                </span>
              )}
              {filters.search && (
                <span className="badge bg-secondary rounded-pill me-2">
                  Search: "{filters.search}"
                </span>
              )}
            </div>
            <div>
              <Dropdown onSelect={handleSortChange}>
                <Dropdown.Toggle variant="outline-secondary" id="sort-dropdown" size="sm">
                  <i className="bi bi-sort-down me-1"></i>
                  {sortOrder === "featured" && "Sort by: Featured"}
                  {sortOrder === "price-asc" && "Sort by: Price (Low to High)"}
                  {sortOrder === "price-desc" && "Sort by: Price (High to Low)"}
                  {sortOrder === "newest" && "Sort by: Newest First"}
                  {sortOrder === "stock" && "Sort by: Stock Available"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="featured">Featured</Dropdown.Item>
                  <Dropdown.Item eventKey="price-asc">Price: Low to High</Dropdown.Item>
                  <Dropdown.Item eventKey="price-desc">Price: High to Low</Dropdown.Item>
                  <Dropdown.Item eventKey="newest">Newest First</Dropdown.Item>
                  <Dropdown.Item eventKey="stock">Stock Available</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          {filteredAndSortedWheelchairs.length > 0 ? (
            <Row className="g-4">
              {filteredAndSortedWheelchairs.map(wheelchair => (
                <Col key={wheelchair.ID_FAUTEUIL} xs={12} sm={6} lg={4}>
                  <Card 
                    className="h-100 shadow-sm border-0 overflow-hidden transition-all hover-effect"
                    onClick={() => handleViewItem(wheelchair.ID_FAUTEUIL)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="position-relative bg-light" style={{ height: "220px", overflow: 'hidden' }}>
                      <img
                        src={wheelchair.imageUrl}
                        alt={`${wheelchair.NOM_TYPE} wheelchair`}
                        className="img-fluid h-100 w-100 object-fit-cover transition-all"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultWheelchair;
                        }}
                        loading="lazy"
                      />
                      {/* Status Badges */}
                      <div className="position-absolute top-0 start-0 p-2">
                        {wheelchair.isNew && (
                          <Badge pill bg="danger" className="me-1">
                            New
                          </Badge>
                        )}
                        {wheelchair.hasOptions && (
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`tooltip-options-${wheelchair.ID_FAUTEUIL}`}>
                                Options: {wheelchair.OPTIONS}
                              </Tooltip>
                            }
                          >
                            <Badge pill bg="success" className="me-1">
                              Options
                            </Badge>
                          </OverlayTrigger>
                        )}
                        {wheelchair.PROPULTION === "1" && (
                          <Badge pill bg="info" className="me-1">
                            ⚡ Powered
                          </Badge>
                        )}
                      </div>
                      {parseInt(wheelchair.QT_STOCK) <= 3 && parseInt(wheelchair.QT_STOCK) > 0 && (
                        <Badge pill bg="warning" text="dark" className="position-absolute bottom-0 end-0 m-2">
                          Only {wheelchair.QT_STOCK} left
                        </Badge>
                      )}
                      {parseInt(wheelchair.QT_STOCK) === 0 && (
                        <div className="position-absolute top-0 end-0 bottom-0 start-0 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center">
                          <Badge pill bg="danger" className="fs-6 px-3 py-2">
                            Out of Stock
                          </Badge>
                        </div>
                      )}
                    </div>

                    <Card.Body className="d-flex flex-column">
                      <div className="mb-2">
                        <Card.Title className="d-flex justify-content-between align-items-start mb-1">
                          <span className="text-truncate">{wheelchair.NOM_TYPE}</span>
                        </Card.Title>
                        <div className="text-muted small">
                          <span className="d-inline-block me-2">
                            <i className="bi bi-star-fill text-warning me-1"></i>
                            4.8
                          </span>
                          <span>
                            <i className={`bi ${parseInt(wheelchair.QT_STOCK) > 0 ? 'bi-check-circle-fill text-success' : 'bi-x-circle-fill text-danger'} me-1`}></i>
                            {parseInt(wheelchair.QT_STOCK) > 0 ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-success fw-bold fs-5">
                            ${parseFloat(wheelchair.PRIX).toFixed(2)}
                          </span>
                          {parseInt(wheelchair.QT_STOCK) > 0 && (
                            <small className="text-muted">
                              {wheelchair.QT_STOCK} available
                            </small>
                          )}
                        </div>
                        <div className="d-grid gap-2">
                          <Button 
                            variant="primary"
                            onClick={() => handleViewItem(wheelchair.ID_FAUTEUIL)}
                            disabled={parseInt(wheelchair.QT_STOCK) <= 0}
                            aria-label={`View details for ${wheelchair.NOM_TYPE}`}
                          >
                            <i className="bi bi-eye-fill me-2"></i>
                            View Details
                          </Button>
                          {parseInt(wheelchair.QT_STOCK) > 0 && (
                            <Button 
                              variant="outline-primary"
                              onClick={(e) => handleAddToCart(wheelchair, e)}
                              aria-label={`Add ${wheelchair.NOM_TYPE} to cart`}
                            >
                              <i className="bi bi-cart-plus me-2"></i>
                              Add to Cart
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Card className="text-center py-5 shadow-sm">
              <Card.Body>
                <div className="mb-4">
                  <i className="bi bi-search text-muted" style={{ fontSize: '3rem' }}></i>
                </div>
                <h5 className="text-muted mb-3">No matching wheelchairs found</h5>
                <p className="text-muted mb-4">Try adjusting your filters or search term</p>
                <Button
                  variant="primary"
                  onClick={resetFilters}
                  className="px-4"
                  aria-label="Reset all filters"
                >
                  <i className="bi bi-funnel me-2"></i>
                  Reset All Filters
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default WheelchairsPage;
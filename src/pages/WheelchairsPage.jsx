import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Badge } from "react-bootstrap";

const WheelchairsPage = () => {
  const [filters, setFilters] = useState({
    type: "",
    inStockOnly: true,
    search: "",
    propulsion: "",
  });

  const [wheelchairs, setWheelchairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch wheelchair data from PHP backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost/wheel_api/getWheelchairs.php");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWheelchairs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    });
  };

  const filteredWheelchairs = wheelchairs.filter(w => {
    const matchType = filters.type ? w.NOM_TYPE === filters.type : true;
    const matchStock = filters.inStockOnly ? w.QT_STOCK > 0 : true;
    const matchSearch = filters.search 
      ? w.NOM_TYPE.toLowerCase().includes(filters.search.toLowerCase())
      : true;
    const matchPropulsion = filters.propulsion 
      ? w.PROPULTION.toString() === filters.propulsion
      : true;

    return matchType && matchStock && matchSearch && matchPropulsion;
  });

  // Get unique types for filter dropdown
  const uniqueTypes = [...new Set(wheelchairs.map(w => w.NOM_TYPE))];

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center py-5 text-danger">Error: {error}</div>;

  return (
    <Container fluid className="py-4 bg-light">
      <Row>
        {/* Sidebar Filters */}
        <Col md={3} className="mb-4">
          <div className="p-3 bg-white rounded shadow-sm">
            <h4 className="mb-3 text-primary">Filters</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Search</Form.Label>
                <Form.Control
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search by name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Type</Form.Label>
                <Form.Select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                >
                  <option value="">All Types</option>
                  {uniqueTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Propulsion</Form.Label>
                <Form.Select
                  name="propulsion"
                  value={filters.propulsion}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="1">With Propulsion</option>
                  <option value="0">Without Propulsion</option>
                </Form.Select>
              </Form.Group>

              <Form.Check
                type="checkbox"
                label="In Stock Only"
                name="inStockOnly"
                checked={filters.inStockOnly}
                onChange={handleFilterChange}
                className="mb-3 fw-bold"
              />

              <Button
                variant="secondary"
                onClick={resetFilters}
                className="w-100"
              >
                Reset Filters
              </Button>
            </Form>
          </div>
        </Col>

        {/* Wheelchairs List */}
        <Col md={9}>
          <Row>
            {filteredWheelchairs.length > 0 ? (
              filteredWheelchairs.map(wheelchair => (
                <Col md={6} lg={4} key={wheelchair.ID_FAUTEUIL} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    {/* Placeholder image since your schema doesn't include images */}
                    <div className="bg-secondary" style={{ height: "200px" }}></div>
                    <Card.Body>
                      <Card.Title>{wheelchair.NOM_TYPE}</Card.Title>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-success fw-bold">
                          ${Number(wheelchair.PRIX).toFixed(2) || "0.00"}
                        </span>
                        {wheelchair.PROPULTION === 1 && (
                          <Badge bg="info">Propulsion</Badge>
                        )}
                      </div>
                      <div className="mb-2">
                        <small className="text-muted">
                          Stock: {wheelchair.QT_STOCK}
                        </small>
                      </div>
                      <Button variant="primary" className="w-100">
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : 
            
            
            
            (
              <Col className="text-center py-5">
                <div className="p-4 bg-white rounded shadow-sm">
                  <p className="text-muted">No wheelchairs found matching your criteria.</p>
                  <Button variant="secondary" onClick={resetFilters}>
                    Reset Filters
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

export default WheelchairsPage;
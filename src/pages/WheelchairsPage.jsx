import { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { wheelchairsData, wheelchairCategories, wheelchairFeatures } from "../data/wheelchairs.jsx";

const WheelchairsPage = () => {
  const [filters, setFilters] = useState({
    category: "",
    inStockOnly: false,
    search: "",
    feature: "",
    propulsion: "",
    new: false,
    bestseller: false,
    promo: false,
  });

  const wheelchairs = wheelchairsData;

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      inStockOnly: false,
      search: "",
      feature: "",
      propulsion: "",
      new: false,
      bestseller: false,
      promo: false,
    });
  };

  const filteredWheelchairs = wheelchairs.filter((w) => {
    const matchCategory = filters.category ? w.type.category === filters.category : true;
    const matchStock = filters.inStockOnly ? w.QT_STOCK > 0 : true;
    const matchSearch = filters.search
      ? w.type.NOM_TYPE.toLowerCase().includes(filters.search.toLowerCase()) ||
        w.DESCRIPTION.toLowerCase().includes(filters.search.toLowerCase())
      : true;
    const matchFeature = filters.feature
      ? w.options.some((opt) => opt.NOM_OPTION.toLowerCase().includes(filters.feature.toLowerCase()))
      : true;
    const matchPropulsion = filters.propulsion ? w.PROPULTION === parseInt(filters.propulsion) : true;
    const matchNew = filters.new ? w.NEW === true : true;
    const matchBestseller = filters.bestseller ? w.BESTSELLER === true : true;
    const matchPromo = filters.promo ? w.PROMO === true : true;

    return (
      matchCategory &&
      matchStock &&
      matchSearch &&
      matchFeature &&
      matchPropulsion &&
      matchNew &&
      matchBestseller &&
      matchPromo
    );
  });

  const availableCategories = wheelchairCategories.filter((cat) =>
    wheelchairs.some((w) => w.type.category === cat.id)
  );

  return (
    <Container fluid className="py-4 bg-light">
      <Row>
        {/* Sidebar */}
        <Col md={3} className="mb-4">
          <div className="p-3 bg-white rounded shadow-sm">
            <h4 className="mb-3 text-primary">Filters</h4>
            <Form>
              {/* Search Bar */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Search</Form.Label>
                <Form.Control
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search by name or description"
                  className="shadow-sm"
                />
              </Form.Group>

              {/* Category Filter */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Category</Form.Label>
                <Form.Select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="shadow-sm"
                >
                  <option value="">All Categories</option>
                  {availableCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Feature Filter */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Feature</Form.Label>
                <Form.Select
                  name="feature"
                  value={filters.feature}
                  onChange={handleFilterChange}
                  className="shadow-sm"
                >
                  <option value="">All Features</option>
                  {wheelchairFeatures.map((feature) => (
                    <option key={feature.id} value={feature.name.toLowerCase()}>
                      {feature.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Propulsion Filter */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Propulsion</Form.Label>
                <Form.Select
                  name="propulsion"
                  value={filters.propulsion}
                  onChange={handleFilterChange}
                  className="shadow-sm"
                >
                  <option value="">All Propulsions</option>
                  <option value="1">Manual</option>
                  <option value="2">Electric</option>
                  <option value="3">Sport</option>
                </Form.Select>
              </Form.Group>

              {/* Additional Filters */}
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="New"
                  name="new"
                  checked={filters.new}
                  onChange={handleFilterChange}
                  className="fw-bold"
                />
                <Form.Check
                  type="checkbox"
                  label="Bestseller"
                  name="bestseller"
                  checked={filters.bestseller}
                  onChange={handleFilterChange}
                  className="fw-bold"
                />
                <Form.Check
                  type="checkbox"
                  label="Promo"
                  name="promo"
                  checked={filters.promo}
                  onChange={handleFilterChange}
                  className="fw-bold"
                />
              </Form.Group>

              <Button
                variant="secondary"
                onClick={resetFilters}
                className="w-100 shadow-sm"
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
              filteredWheelchairs.map((wheelchair) => (
                <Col md={6} lg={4} key={wheelchair.ID_FAUT} className="mb-4">
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Img
                      variant="top"
                      src={wheelchair.image}
                      alt={wheelchair.type.NOM_TYPE}
                      className="rounded-top"
                      style={{ objectFit: "cover", height: "200px" }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="fs-5 text-primary">
                        {wheelchair.type.NOM_TYPE}
                      </Card.Title>
                      <Card.Text className="text-success fw-bold mb-2">
                        ${wheelchair.PRIX.toFixed(2)}
                      </Card.Text>
                      <Card.Text className="flex-grow-1 text-muted">
                        {wheelchair.DESCRIPTION}
                      </Card.Text>
                      <Button
                        variant="primary"
                        className="mt-2 shadow-sm"
                      >
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col className="text-center">
                <div className="p-4 bg-white rounded shadow-sm">
                  <p className="text-muted">No wheelchairs found with the selected filters.</p>
                  <Button
                    variant="secondary"
                    onClick={resetFilters}
                    className="shadow-sm"
                  >
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

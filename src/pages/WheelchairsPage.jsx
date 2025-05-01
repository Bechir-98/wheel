import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, InputGroup } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import WheelchairCard from '../components/WheelchairCard';
import { useWheelchairs } from '../hooks/useWheelchairs';

const WheelchairsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    type: searchParams.get('type') || '',
    priceRange: searchParams.get('priceRange') || ''
  });

  const { wheelchairs, loading, error } = useWheelchairs(filters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setSearchParams({ ...filters, [name]: value });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <Container className="py-4">
      <h1 className="mb-4">Available Wheelchairs</h1>
      
      <Row className="mb-4">
        <Col md={4}>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="search"
              name="search"
              placeholder="Search wheelchairs..."
              value={filters.search}
              onChange={handleFilterChange}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">All Types</option>
            <option value="manual">Manual</option>
            <option value="electric">Electric</option>
            <option value="sport">Sport</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select name="priceRange" value={filters.priceRange} onChange={handleFilterChange}>
            <option value="">Price Range</option>
            <option value="0-1000">$0 - $1,000</option>
            <option value="1000-5000">$1,000 - $5,000</option>
            <option value="5000+">$5,000+</option>
          </Form.Select>
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} className="g-4">
        {wheelchairs.map((wheelchair) => (
          <Col key={wheelchair.id}>
            <WheelchairCard wheelchair={wheelchair} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WheelchairsPage;
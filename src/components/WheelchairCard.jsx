import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const WheelchairCard = ({ wheelchair }) => {
  const { id, name, image, price, type, description } = wheelchair;

  return (
    <Card className="h-100 shadow-sm hover-lift">
      <Card.Img 
        variant="top" 
        src={image} 
        alt={name}
        className="object-fit-cover"
        style={{ height: '200px' }}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{type}</Card.Subtitle>
        <Card.Text>
          {description.substring(0, 100)}...
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <span className="h5 mb-0">${price.toLocaleString()}</span>
          <Button 
            as={Link}
            to={`/wheelchairs/${id}`}
            variant="outline-primary"
          >
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

WheelchairCard.propTypes = {
  wheelchair: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default WheelchairCard;
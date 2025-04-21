import React, { useState } from 'react';
import './WheelchairsPage.css'; // Add your CSS file here

const WheelchairsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [type, setType] = useState('all');

  const wheelchairs = [
    {
      id: 1,
      name: "Ultra Lightweight Pro",
      type: "Manual",
      price: 1299.99,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?auto=format&fit=crop&w=800&q=80",
      specs: {
        weight: "14.5 lbs",
        width: "16-20 inches",
        capacity: "250 lbs",
        foldable: "Yes"
      }
    },
    {
      id: 2,
      name: "Power Elite X500",
      type: "Electric",
      price: 2999.99,
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?auto=format&fit=crop&w=800&q=80",
      specs: {
        range: "20 miles",
        speed: "6 mph",
        capacity: "300 lbs",
        battery: "Lithium-ion"
      }
    },
    {
      id: 3,
      name: "Sport Performance",
      type: "Manual",
      price: 1899.99,
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?auto=format&fit=crop&w=800&q=80",
      specs: {
        weight: "16 lbs",
        width: "14-18 inches",
        capacity: "220 lbs",
        adjustable: "Full"
      }
    },
    {
      id: 4,
      name: "Compact Travel",
      type: "Manual",
      price: 899.99,
      rating: 4.6,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?auto=format&fit=crop&w=800&q=80",
      specs: {
        weight: "19 lbs",
        width: "16 inches",
        foldable: "Yes",
        transport: "Airline approved"
      }
    }
  ];

  const filteredWheelchairs = wheelchairs.filter(wheelchair => {
    const matchesSearch = wheelchair.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = type === 'all' || wheelchair.type === type;
    const matchesPriceRange = priceRange === 'all' || 
      (priceRange === 'under1000' && wheelchair.price < 1000) ||
      (priceRange === '1000to2000' && wheelchair.price >= 1000 && wheelchair.price <= 2000) ||
      (priceRange === 'over2000' && wheelchair.price > 2000);

    return matchesSearch && matchesType && matchesPriceRange;
  });

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <header>
          <h1 className="title">Find Your Perfect Wheelchair</h1>
          
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search wheelchairs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">Search</button>
          </div>
          
          <div className="filters-container">
            <div className="filter-group">
              <label>Price Range</label>
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                <option value="all">All Prices</option>
                <option value="under1000">Under $1,000</option>
                <option value="1000to2000">$1,000 - $2,000</option>
                <option value="over2000">Over $2,000</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="all">All Types</option>
                <option value="Manual">Manual</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
          </div>
        </header>
        
        <div className="grid">
          {filteredWheelchairs.map((wheelchair) => (
            <div className="wheelchair-card" key={wheelchair.id}>
              <div className="image-container">
                <img src={wheelchair.image} alt={wheelchair.name} className="image" />
              </div>
              
              <div className="card-content">
                <h3 className="wheelchair-name">{wheelchair.name}</h3>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < Math.floor(wheelchair.rating) ? 'filled' : ''}`}>★</span>
                  ))}
                  <span>{wheelchair.rating} ({wheelchair.reviews} reviews)</span>
                </div>
                
                <div className="price">${wheelchair.price.toLocaleString()}</div>
                
                <ul className="specs-list">
                  {Object.entries(wheelchair.specs).map(([key, value]) => (
                    <li key={key} className="spec-item">
                      <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="button-group">
                  <button className="add-to-cart-button">Add to Cart</button>
                  <button className="learn-more-button">Learn More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WheelchairsPage;

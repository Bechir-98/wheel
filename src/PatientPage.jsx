import React, { useState } from 'react';

function PatientPage() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    weight: '',
    height: '',
    hasHelper: false,
    description: '',
    address: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission logic here
  };

  return (
    <div className="form">
  
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Surname:</label>
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          required
        />

        <label>Weight:</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />

        <label>Height:</label>
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleChange}
          required
        />

        <label>Do you need a helper?</label>
        <input
          type="checkbox"
          name="hasHelper"
          checked={formData.hasHelper}
          onChange={(e) => setFormData({ ...formData, hasHelper: e.target.checked })}
        />

        <label>Description of usage:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PatientPage;

import React, { useState, useEffect } from "react";
import "../../styles/DashboardPages.css";
import axios from "axios";
import { Container, Card, Button, Form, Row, Col, Spinner, Alert, Badge } from 'react-bootstrap';
import { FaUser, FaEdit, FaSave, FaTimes, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWeight, FaRuler, FaUserMd, FaStore } from 'react-icons/fa';

// Configuration de l'API
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost/wheel_api',
  endpoints: {
    users: 'users.php',
    updateUser: 'users.php'
  }
};

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get user ID from session/local storage
        const userId = localStorage.getItem('userId');
        const userType = localStorage.getItem('userType');
        
        if (!userId || !userType) {
          throw new Error('User not authenticated');
        }
        
        const response = await axios.get(`${API_CONFIG.baseURL}/${API_CONFIG.endpoints.users}`, {
          params: {
            id_utilisateur: userId,
            type: userType
          }
        });

        if (!response.data) {
          throw new Error('No data received from server');
        }

        if (response.data.error) {
          throw new Error(response.data.error);
        }

        setUserData(response.data);
        
        // Configure form data based on user type
        const baseData = {
          ADRESSE: response.data.ADRESSE || '',
          EMAIL: response.data.EMAIL || '',
          NUMTEL: response.data.NUMTEL || ''
        };

        switch (userType) {
          case 'patient':
            setFormData({
              ...baseData,
              NOMP: response.data.NOMP || '',
              PRENOMP: response.data.PRENOMP || '',
              POIDS: response.data.POIDS || '',
              TAILLE: response.data.TAILLE || '',
              UTILISATION_PRPL: response.data.UTILISATION_PRPL || '',
              AIDANT: response.data.AIDANT || ''
            });
            break;
          case 'clinicien':
            setFormData({
              ...baseData,
              NOMC: response.data.NOMC || '',
              PRENOMC: response.data.PRENOMC || '',
              ID_SPEC: response.data.ID_SPEC || ''
            });
            break;
          case 'commercant':
            setFormData({
              ...baseData,
              NOM_MARCHAND: response.data.NOM_MARCHAND || ''
            });
            break;
          default:
            throw new Error('Unrecognized user type');
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.response?.data?.error || err.message || "An error occurred while loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add the user type and ID to the form data
      const submitData = {
        ...formData,
        id_utilisateur: userData.id_utilisateur,
        type: userData.type
      };

      const response = await axios.post(
        `${API_CONFIG.baseURL}/${API_CONFIG.endpoints.updateUser}`,
        submitData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      if (response.data.success) {
        setUserData(prev => ({ ...prev, ...formData }));
        setIsEditing(false);
      } else {
        throw new Error(response.data.message || "Erreur lors de la mise à jour des données");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Erreur lors de la mise à jour des données");
      console.error(err);
    }
  };

  const renderPatientForm = () => (
    <div className="d-flex flex-column gap-4">
      <Row className="g-3">
        <Col md={6}>
          <Form.Group className="d-flex flex-column">
            <Form.Label className="fw-bold mb-2">
              <FaUser className="me-2" />
              Nom
            </Form.Label>
            <Form.Control
              type="text"
              name="NOMP"
              value={formData.NOMP}
              onChange={handleInputChange}
              required
              className="form-control-lg"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="d-flex flex-column">
            <Form.Label className="fw-bold mb-2">
              <FaUser className="me-2" />
              Prénom
            </Form.Label>
            <Form.Control
              type="text"
              name="PRENOMP"
              value={formData.PRENOMP}
              onChange={handleInputChange}
              required
              className="form-control-lg"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="g-3">
        <Col md={6}>
          <Form.Group className="d-flex flex-column">
            <Form.Label className="fw-bold mb-2">
              <FaWeight className="me-2" />
              Poids (kg)
            </Form.Label>
            <Form.Control
              type="number"
              name="POIDS"
              value={formData.POIDS}
              onChange={handleInputChange}
              required
              className="form-control-lg"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="d-flex flex-column">
            <Form.Label className="fw-bold mb-2">
              <FaRuler className="me-2" />
              Taille (m)
            </Form.Label>
            <Form.Control
              type="number"
              name="TAILLE"
              value={formData.TAILLE}
              onChange={handleInputChange}
              step="0.01"
              required
              className="form-control-lg"
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="d-flex flex-column">
        <Form.Label className="fw-bold mb-2">Utilisation principale</Form.Label>
        <Form.Select
          name="UTILISATION_PRPL"
          value={formData.UTILISATION_PRPL}
          onChange={handleInputChange}
          required
          className="form-control-lg"
        >
          <option value="Intérieur">Intérieur</option>
          <option value="Extérieur">Extérieur</option>
          <option value="Mixte">Mixte</option>
        </Form.Select>
      </Form.Group>
    </div>
  );

  const renderClinicienForm = () => (
    <>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              name="NOMC"
              value={formData.NOMC}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type="text"
              name="PRENOMC"
              value={formData.PRENOMC}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Spécialité</Form.Label>
        <Form.Select
          name="ID_SPEC"
          value={formData.ID_SPEC}
          onChange={handleInputChange}
          required
        >
          <option value="1">Rééducation</option>
          <option value="2">Orthopédie</option>
          <option value="3">Neurologie</option>
        </Form.Select>
      </Form.Group>
    </>
  );

  const renderCommercantForm = () => (
    <Form.Group className="mb-3">
      <Form.Label>Nom commercial</Form.Label>
      <Form.Control
        type="text"
        name="NOM_MARCHAND"
        value={formData.NOM_MARCHAND}
        onChange={handleInputChange}
        required
      />
    </Form.Group>
  );

  const renderCommonFormFields = () => (
    <div className="d-flex flex-column gap-4">
      <Form.Group className="d-flex flex-column">
        <Form.Label className="fw-bold mb-2">
          <FaMapMarkerAlt className="me-2" />
          Adresse
        </Form.Label>
        <Form.Control
          type="text"
          name="ADRESSE"
          value={formData.ADRESSE}
          onChange={handleInputChange}
          required
          className="form-control-lg"
        />
      </Form.Group>

      <Row className="g-3">
        <Col md={6}>
          <Form.Group className="d-flex flex-column">
            <Form.Label className="fw-bold mb-2">
              <FaEnvelope className="me-2" />
              Email
            </Form.Label>
            <Form.Control
              type="email"
              name="EMAIL"
              value={formData.EMAIL}
              onChange={handleInputChange}
              required
              className="form-control-lg"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="d-flex flex-column">
            <Form.Label className="fw-bold mb-2">
              <FaPhone className="me-2" />
              Téléphone
            </Form.Label>
            <Form.Control
              type="tel"
              name="NUMTEL"
              value={formData.NUMTEL}
              onChange={handleInputChange}
              required
              className="form-control-lg"
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );

  const renderPatientInfo = () => (
    <Row className="g-4">
      <Col md={4}>
        <Card className="h-100 shadow-sm">
          <Card.Header className="bg-primary text-white d-flex align-items-center">
            <FaUser className="me-2" />
            <h5 className="mb-0">Informations personnelles</h5>
          </Card.Header>
          <Card.Body className="d-flex flex-column">
            <div className="mb-2 d-flex align-items-center">
              <strong className="me-2">Nom:</strong>
              <span>{userData.NOMP}</span>
            </div>
            <div className="mb-2 d-flex align-items-center">
              <strong className="me-2">Prénom:</strong>
              <span>{userData.PRENOMP}</span>
            </div>
            <div className="d-flex align-items-center">
              <strong className="me-2">NSS:</strong>
              <span>{userData.NSS}</span>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={4}>
        <Card className="h-100 shadow-sm">
          <Card.Header className="bg-success text-white d-flex align-items-center">
            <FaUserMd className="me-2" />
            <h5 className="mb-0">Informations médicales</h5>
          </Card.Header>
          <Card.Body className="d-flex flex-column">
            <div className="mb-2 d-flex align-items-center">
              <strong className="me-2">Poids:</strong>
              <span>{userData.POIDS} kg</span>
            </div>
            <div className="mb-2 d-flex align-items-center">
              <strong className="me-2">Taille:</strong>
              <span>{userData.TAILLE} m</span>
            </div>
            <div className="d-flex align-items-center">
              <strong className="me-2">Utilisation principale:</strong>
              <span>{userData.UTILISATION_PRPL}</span>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={4}>
        <Card className="h-100 shadow-sm">
          <Card.Header className="bg-info text-white d-flex align-items-center">
            <FaMapMarkerAlt className="me-2" />
            <h5 className="mb-0">Coordonnées</h5>
          </Card.Header>
          <Card.Body className="d-flex flex-column">
            <div className="mb-2 d-flex align-items-center">
              <strong className="me-2">Adresse:</strong>
              <span>{userData.ADRESSE}</span>
            </div>
            <div className="mb-2 d-flex align-items-center">
              <strong className="me-2">Email:</strong>
              <span>{userData.EMAIL}</span>
            </div>
            <div className="d-flex align-items-center">
              <strong className="me-2">Téléphone:</strong>
              <span>{userData.NUMTEL}</span>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  const renderClinicienInfo = () => (
    <Row>
      <Col md={6}>
        <Card className="mb-3">
          <Card.Header className="bg-primary text-white">
            <h5 className="mb-0">Informations professionnelles</h5>
          </Card.Header>
          <Card.Body>
            <p><strong>Nom:</strong> {userData.NOMC}</p>
            <p><strong>Prénom:</strong> {userData.PRENOMC}</p>
            <p><strong>Spécialité:</strong> {userData.specialite}</p>
          </Card.Body>
        </Card>
      </Col>

      <Col md={6}>
        <Card className="mb-3">
          <Card.Header className="bg-info text-white">
            <h5 className="mb-0">Coordonnées</h5>
          </Card.Header>
          <Card.Body>
            <p><strong>Adresse:</strong> {userData.ADRESSE}</p>
            <p><strong>Email:</strong> {userData.EMAIL}</p>
            <p><strong>Téléphone:</strong> {userData.NUMTEL}</p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  const renderCommercantInfo = () => (
    <Row>
      <Col md={6}>
        <Card className="mb-3">
          <Card.Header className="bg-primary text-white">
            <h5 className="mb-0">Informations commerciales</h5>
          </Card.Header>
          <Card.Body>
            <p><strong>Nom commercial:</strong> {userData.NOM_MARCHAND}</p>
          </Card.Body>
        </Card>
      </Col>

      <Col md={6}>
        <Card className="mb-3">
          <Card.Header className="bg-info text-white">
            <h5 className="mb-0">Coordonnées</h5>
          </Card.Header>
          <Card.Body>
            <p><strong>Adresse:</strong> {userData.ADRESSE}</p>
            <p><strong>Email:</strong> {userData.EMAIL}</p>
            <p><strong>Téléphone:</strong> {userData.NUMTEL}</p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="text-center">
          <Spinner animation="border" variant="primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Chargement...</span>
          </Spinner>
          <h4 className="mt-3">Chargement de votre profil...</h4>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger" className="d-flex align-items-center">
          <FaTimes className="me-2" />
          <div>
            <h5 className="alert-heading">Erreur</h5>
            <p className="mb-0">{error}</p>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <h2 className="mb-0 d-flex align-items-center">
            <FaUser className="me-2" />
            Mon Profil
          </h2>
          <Badge bg="primary" className="ms-2">{userData.type}</Badge>
        </div>
        <Button 
          variant={isEditing ? "outline-danger" : "outline-primary"}
          onClick={() => setIsEditing(!isEditing)}
          className="d-flex align-items-center"
        >
          {isEditing ? (
            <>
              <FaTimes className="me-2" />
              Annuler
            </>
          ) : (
            <>
              <FaEdit className="me-2" />
              Modifier
            </>
          )}
        </Button>
      </div>

      <Card className="shadow-sm">
        <Card.Body className="p-4">
          {isEditing ? (
            <Form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
              {userData.type === 'patient' && renderPatientForm()}
              {userData.type === 'clinicien' && renderClinicienForm()}
              {userData.type === 'commercant' && renderCommercantForm()}
              {renderCommonFormFields()}
              <div className="d-flex justify-content-end">
                <Button 
                  variant="primary" 
                  type="submit"
                  className="d-flex align-items-center"
                  size="lg"
                >
                  <FaSave className="me-2" />
                  Enregistrer les modifications
                </Button>
              </div>
            </Form>
          ) : (
            <>
              {userData.type === 'patient' && renderPatientInfo()}
              {userData.type === 'clinicien' && renderClinicienInfo()}
              {userData.type === 'commercant' && renderCommercantInfo()}
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MyProfile;

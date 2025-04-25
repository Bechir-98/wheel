

import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
 import "../styles/WheelchairsPage.css";

const fauteuilsData = [
  {
    id: 1,
    nom: "Fauteuil Manuel Léger",
    prix: 450,
    note_moyenne: 4.2,
    image_url: "https://via.placeholder.com/300",
    type: "manuel",
    pliable: true,
  },
  {
    id: 2,
    nom: "Fauteuil Électrique X",
    prix: 1200,
    note_moyenne: 4.7,
    image_url: "https://via.placeholder.com/300",
    type: "électrique",
    pliable: false,
  },
  // Ajoute d'autres fauteuils ici
];

const WheelchairsPage = () => {
  const [filtreType, setFiltreType] = useState("");
  const [filtrePliable, setFiltrePliable] = useState("");

  const fauteuilsFiltres = fauteuilsData.filter((f) => {
    return (
      (filtreType === "" || f.type === filtreType) &&
      (filtrePliable === "" || (filtrePliable === "oui" ? f.pliable : !f.pliable))
    );
  });

  return (
    <Container fluid className="py-4 bg-light min-vh-100">
      <h1 className="text-center mb-4">Catalogue de Fauteuils Roulants</h1>

      {/* Filtres */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Type de fauteuil</Form.Label>
                <Form.Select value={filtreType} onChange={(e) => setFiltreType(e.target.value)}>
                  <option value="">Tous</option>
                  <option value="manuel">Manuel</option>
                  <option value="électrique">Électrique</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Pliable</Form.Label>
                <Form.Select
                  value={filtrePliable}
                  onChange={(e) => setFiltrePliable(e.target.value)}
                >
                  <option value="">Tous</option>
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Catalogue */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {fauteuilsFiltres.map((f) => (
          <Col key={f.id}>
            <Card className="h-100 shadow-sm">
              <div className="position-relative" style={{ paddingTop: "75%" }}>
                <Card.Img
                  src={f.image_url}
                  alt={f.nom}
                  className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                />
              </div>
              <Card.Body>
                <Card.Title>{f.nom}</Card.Title>
                <Card.Text>
                  <strong>Prix:</strong> <span className="text-primary">{f.prix} €</span>
                </Card.Text>
                <div className="d-flex align-items-center mb-2">
                  <Badge bg="warning" text="dark">
                    ⭐ {f.note_moyenne}
                  </Badge>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="primary">Ajouter au panier</Button>
                  <Button variant="outline-primary">Détails</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WheelchairsPage;



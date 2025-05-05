import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import chair from '../assets/chair.svg';
import patient from '../assets/patient.svg';
import clinician from '../assets/clinician.svg';
import vendor from '../assets/vendor.svg';
import ff from '../assets/fpng.png';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import ReactCardFlip from 'react-card-flip';

function Home() {
  const [isFlippedP, setIsFlippedP] = useState(false);
  const [isFlippedC, setIsFlippedC] = useState(false);
  const [isFlippedV, setIsFlippedV] = useState(false);

  const buttonStyle = {
    backgroundColor: "#212529",
    color: "#fff",
    "&:hover": { backgroundColor: "#343a40" }
  };

  return (
    <>
      <Box sx={{ marginLeft: '2%' }}>
        <div className='selector'>
          <div className='find'>
            <h1>Trouvez le fauteuil roulant parfait pour vos besoins</h1>
            <h3>Recommandations personnalisées basées sur votre condition, style de vie et préférences</h3>
            <div className='selectB'>
              <Button
                component={Link}
                to="/patient-dashboard"
                variant="contained"
                sx={buttonStyle}
              >
                Commencer en tant que Patient
              </Button>
              <Button
                component={Link}
                to="/clinician-dashboard"
                variant="contained"
                sx={buttonStyle}
              >
                Commencer en tant que Clinicien
              </Button>
              <Button
                component={Link}
                to="/vendor-dashboard"
                variant="contained"
                sx={buttonStyle}
              >
                Commencer en tant que Vendeur
              </Button>
            </div>
          </div>
          <div className='chair'>
            <img src={chair} alt="Fauteuil roulant" />
          </div>
        </div>

        <div>
          <h1>Comment ça marche</h1>
          <div className='how'>
            <div className='ph'>
              <img src={patient} alt="Patient" />
              <h2>Patient</h2>
              <h3>Entre ses données personnelles</h3>
            </div>
            <img src={ff} alt="Étape du processus" />
            <div className='ph'>
              <img src={clinician} alt="Clinicien" />
              <h2>Clinicien</h2>
              <h3>Ajoute ses informations</h3>
            </div>
            <img src={ff} alt="Étape du processus" />
            <div className='ph'>
              <img src={vendor} alt="Vendeur" />
              <h2>Vendeur</h2>
              <h3>Finalise et planifie l'essai</h3>
            </div>
          </div>
        </div>

        <div>
          <h1>Pour qui est-ce fait ?</h1>
          <br />
          <div className='card-container'>
            {/* Patient Card */}
            <ReactCardFlip isFlipped={isFlippedP} flipDirection="horizontal">
              <div className='card front' onClick={() => setIsFlippedP(true)}>
                <img src={patient} alt="Patient" />
                <h2>Patient</h2>
              </div>
              <div className='card back' onClick={() => setIsFlippedP(false)}>
                <p>
                  Trouvez le fauteuil roulant le plus adapté à votre condition physique, style de vie et préférences.
                  Onboarding facile et résultats personnalisés.
                </p>
              </div>
            </ReactCardFlip>

            {/* Clinician Card */}
            <ReactCardFlip isFlipped={isFlippedC} flipDirection="horizontal">
              <div className='card front' onClick={() => setIsFlippedC(true)}>
                <img src={clinician} alt="Clinicien" />
                <h2>Clinicien</h2>
              </div>
              <div className='card back' onClick={() => setIsFlippedC(false)}>
                <p>
                  Aidez les patients en fournissant des informations médicales et des évaluations de mobilité.
                  Collaborez au processus de recommandation pour assurer un ajustement précis.
                </p>
              </div>
            </ReactCardFlip>

            {/* Vendor Card */}
            <ReactCardFlip isFlipped={isFlippedV} flipDirection="horizontal">
              <div className='card front' onClick={() => setIsFlippedV(true)}>
                <img src={vendor} alt="Vendeur" />
                <h2>Vendeur</h2>
              </div>
              <div className='card back' onClick={() => setIsFlippedV(false)}>
                <p>
                  Recevez des prospects qualifiés basés sur les données médicales et personnelles.
                  Planifiez les essais de produits, gérez la logistique et proposez des solutions de fauteuils roulants sur mesure.
                </p>
              </div>
            </ReactCardFlip>
          </div>
        </div>
        <br />
      </Box>
    </>
  );
}

export default Home;

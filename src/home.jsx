import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import chair from './assets/chair.svg';
import patient from './assets/patient.svg';
import clinician from './assets/clinician.svg';
import vendor from './assets/vendor.svg';
import ff from './assets/fpng.png';
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
            <h1>Find the perfect wheelchair for your needs</h1>
            <h3>Personalized recommendations based on your condition, lifestyle, and preferences</h3>
            <div className='selectB'>
              <Button
                component={Link}
                to="/sign"
                variant="contained"
                sx={buttonStyle}
              >
                Start as Patient
              </Button>
              <Button
                component={Link}
                to="/sign"
                variant="contained"
                sx={buttonStyle}
              >
                Start as Clinician
              </Button>
              <Button
                component={Link}
                to="/sign"
                variant="contained"
                sx={buttonStyle}
              >
                Start as Vendor
              </Button>
            </div>
          </div>
          <div className='chair'>
            <img src={chair} alt="Wheelchair" />
          </div>
        </div>

        <div>
          <h1>How it works</h1>
          <div className='how'>
            <div className='ph'>
              <img src={patient} alt="Patient" />
              <h2>Patient</h2>
              <h3>Enters personal data</h3>
            </div>
            <img src={ff} alt="Process step" />
            <div className='ph'>
              <img src={clinician} alt="Clinician" />
              <h2>Clinician</h2>
              <h3>Adds their info</h3>
            </div>
            <img src={ff} alt="Process step" />
            <div className='ph'>
              <img src={vendor} alt="Vendor" />
              <h2>Vendor</h2>
              <h3>Finalizes & schedules test</h3>
            </div>
          </div>
        </div>

        <div>
          <h1>Who is this for?</h1>
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
                  Get matched with the most suitable wheelchair based on your physical condition, lifestyle, and preferences.
                  Easy onboarding and personalized results.
                </p>
              </div>
            </ReactCardFlip>

            {/* Clinician Card */}
            <ReactCardFlip isFlipped={isFlippedC} flipDirection="horizontal">
              <div className='card front' onClick={() => setIsFlippedC(true)}>
                <img src={clinician} alt="Clinician" />
                <h2>Clinician</h2>
              </div>
              <div className='card back' onClick={() => setIsFlippedC(false)}>
                <p>
                  Assist patients by providing medical insights and mobility assessments.
                  Collaborate in the recommendation process to ensure accurate fittings.
                </p>
              </div>
            </ReactCardFlip>

            {/* Vendor Card */}
            <ReactCardFlip isFlipped={isFlippedV} flipDirection="horizontal">
              <div className='card front' onClick={() => setIsFlippedV(true)}>
                <img src={vendor} alt="Vendor" />
                <h2>Vendor</h2>
              </div>
              <div className='card back' onClick={() => setIsFlippedV(false)}>
                <p>
                  Receive qualified leads based on medical and personal data.
                  Schedule product trials, manage logistics, and offer tailored wheelchair solutions.
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

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navb from './nav.jsx';
import WcPage from './wcpage.jsx'; // Main page for wheelchair catalog
import Home from './home.jsx';
import Sign from './sign.jsx';
import Log from './log.jsx';
import Footer from './footer.jsx';
import FAQ from './faq.jsx';

// Import the missing pages (ensure these components exist)
import PatientPage from './PatientPage.jsx';  // For patients to fill in their details
import ClinicianPage from './ClinicianPage.jsx'; // For clinicians to fill in their details
import VendorPage from './VendorPage.jsx'; // For vendors to fill in their details
import WheelchairDetails from './WheelchairsPage.jsx';  // For wheelchair-specific details
import Patient from './patient';

function App() {
  return (
    
    
    <Router>
      <div className="App">
        <Navb />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Wheelchair Catalog Page */}
          <Route path="/wheelchairs" element={<WheelchairDetails />} /> {/* Displays all wheelchairs */}
          {/* Wheelchair Detail Page */}
          <Route path="/wheelchair/:id" element={<WheelchairDetails />} /> {/* Displays details of a specific wheelchair */}
          
          {/* User Signup and Login Pages */}
          <Route path="/sign" element={<Sign />} />
          <Route path="/log" element={<Log />} />

          {/* User Profile Pages based on their profession */}
          <Route path="/patient" element={<PatientPage />} />
          <Route path="/clinician" element={<ClinicianPage />} />
          <Route path="/vendor" element={<VendorPage />} />

          {/* FAQ Page */}
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

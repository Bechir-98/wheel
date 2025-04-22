import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WcPage from '../pages/WC.jsx'; // Main page for wheelchair catalog
import Home from '../pages/home.jsx';
import Sign from '../pages/sign.jsx';
import Log from '../pages/log.jsx';
import Navb from '../layouts/nav.jsx';
import FAQ from '../pages/faq.jsx';


// Import the missing pages (ensure these components exist)
import PatientPage from '../pages/PatientPage.jsx';  // For patients to fill in their details
import ClinicianPage from '../pages/ClinicianPage.jsx'; // For clinicians to fill in their details
import VendorPage from '../pages/VendorPage.jsx'; // For vendors to fill in their details
import WheelchairDetails from '../pages/WheelchairsPage.jsx';  // For wheelchair-specific details
import Patient from '../pages/Patient_Dashboard';

function RouteR(){
return(
<>

<Router>
      <div className="App">
      <Navb/>
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
       
      </div>
    </Router>
    </>
);
}

export default RouteR;
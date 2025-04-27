import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WcPage from '../pages/WC.jsx';
import Home from '../pages/home.jsx';
import Sign from '../pages/sign.jsx';
import Log from '../pages/log.jsx';
import Navb from '../layouts/nav.jsx';
import FAQ from '../pages/faq.jsx';

import ClinicianDashboard from '../pages/Dashboard_clinicien.jsx';
import VendorDashboard from '../pages/VendorDashboard.jsx';
import PatientDashboard from '../pages/Patient_Dashboard.jsx';

import PatientPage from '../pages/PatientPage.jsx';
import ClinicianPage from '../pages/ClinicianPage.jsx';
import VendorPage from '../pages/VendorPage.jsx';
import WheelchairDetails from '../pages/WheelchairsPage.jsx';

// NEW IMPORTS
import MyProfile from '../pages/dashboard/MyProfile.jsx';
import Messages from '../pages/dashboard/Messages.jsx';
import Settings from '../pages/dashboard/Settings.jsx';

// Cart Imports
// import CartPage from '../pages/CartPage.jsx';  // Import the CartPage

function RouteR() {
  return (
    <Router>
      <div className="App">
        <Navb />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wheelchairs" element={<WheelchairDetails />} />
          <Route path="/wheelchair/:id" element={<WheelchairDetails />} />

          {/* User Signup and Login */}
          <Route path="/sign" element={<Sign />} />
          <Route path="/log" element={<Log />} />

          {/* Profession-specific pages */}
          <Route path="/patient" element={<PatientPage />} />
          <Route path="/clinician" element={<ClinicianPage />} />
          <Route path="/vendor" element={<VendorPage />} />

          {/* Dashboards */}
          <Route path="/patientdashboard" element={<PatientDashboard />} />
          <Route path="/vendordashboard" element={<VendorDashboard />} />
          <Route path="/cliniciandashboard" element={<ClinicianDashboard />} />

          {/* Shared dashboard pages with sidebar layout */}
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />

          
          {/* <Route path="/cart" element={<CartPage />} />  {/* Added CartPage route */}

          {/* FAQ */}
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </div>
    </Router>
  );
}

export default RouteR;
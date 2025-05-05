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

import WheelchairDetails from '../pages/WheelchairsPage.jsx';
import WheelchairDetail from '../components/WheelchairDetail';
import PatientsPage from '../pages/patients.jsx';

// NEW IMPORTS
import MyProfile from '../pages/dashboard/MyProfile.jsx';
import Messages from '../pages/dashboard/Messages.jsx';
import Settings from '../pages/dashboard/Settings.jsx';
import Record from '../pages/record.jsx';
import ProductsPage from '../pages/products.jsx';
import ChoisisPage from '../pages/choisis.jsx';

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
          <Route path="/wheelchairs/:id" element={<WheelchairDetail />} />

          {/* User Signup and Login */}
          <Route path="/sign" element={<Sign />} />
          <Route path="/log" element={<Log />} />

          {/* Profession-specific pages */}
          <Route path="/patients" element={<PatientsPage />} />
          
          {/* Dashboards */}
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/clinician-dashboard" element={<ClinicianDashboard />} />

          {/* Shared dashboard pages with sidebar layout */}
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/record" element={<Record />} /> 
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/choisis" element={<ChoisisPage />} />

          
          {/* <Route path="/cart" element={<CartPage />} />  {/* Added CartPage route */}

          {/* FAQ */}
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </div>
    </Router>
  );
}

export default RouteR;
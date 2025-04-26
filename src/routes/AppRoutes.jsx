import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Contexts and Layouts
import { CartProvider } from '../contexts/CartContext';
import { ToastProvider } from '../contexts/ToastContext';
import Navb from '../layouts/nav.jsx';

// Pages - Public
import Home from '../pages/home.jsx';
import FAQ from '../pages/faq.jsx';
import WheelchairsPage from '../pages/WheelchairsPage.jsx';

// Pages - Authentication
import Sign from '../pages/sign.jsx';
import Log from '../pages/log.jsx';

// Pages - Profession Specific
import PatientPage from '../pages/PatientPage.jsx';
import ClinicianPage from '../pages/ClinicianPage.jsx';
import VendorPage from '../pages/VendorPage.jsx';

// Dashboards
import PatientDashboard from '../pages/Patient_Dashboard.jsx';
import ClinicianDashboard from '../pages/Dashboard_clinicien.jsx';
import VendorDashboard from '../pages/VendorDashboard.jsx';

// Dashboard Subpages
import MyProfile from '../pages/dashboard/MyProfile.jsx';
import Messages from '../pages/dashboard/Messages.jsx';
import Settings from '../pages/dashboard/Settings.jsx';

// Global Components
import Cart from '../components/Cart.jsx';

function AppRoutes() {
  return (
    <CartProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <Navb />

            {/* Main Content */}
            <main className="flex-1">
              <Routes>
                {/* Public Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/wheelchairs" element={<WheelchairsPage />} />
                <Route path="/faq" element={<FAQ />} />

                {/* Authentication */}
                <Route path="/sign" element={<Sign />} />
                <Route path="/log" element={<Log />} />

                {/* Profession-specific Pages */}
                <Route path="/patient" element={<PatientPage />} />
                <Route path="/clinician" element={<ClinicianPage />} />
                <Route path="/vendor" element={<VendorPage />} />

                {/* Dashboards */}
                <Route path="/dashboard">
                  <Route path="patient" element={<PatientDashboard />} />
                  <Route path="clinician" element={<ClinicianDashboard />} />
                  <Route path="vendor" element={<VendorDashboard />} />
                  
                  {/* Dashboard Common Routes */}
                  <Route path="profile" element={<MyProfile />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Routes>
            </main>

            {/* Global Cart Component */}
            <Cart />
          </div>
        </Router>
      </ToastProvider>
    </CartProvider>
  );
}

export default AppRoutes;

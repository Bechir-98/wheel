import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Layout from '../layouts/Layout';

// Lazy load components for better performance
const Home = lazy(() => import('../pages/home'));
const WheelchairDetails = lazy(() => import('../pages/WheelchairsPage'));
const WheelchairDetail = lazy(() => import('../components/WheelchairDetail'));
const Sign = lazy(() => import('../pages/sign'));
const Log = lazy(() => import('../pages/log'));

// Dashboard imports
const PatientDashboard = lazy(() => import('../pages/Patient_Dashboard'));
const VendorDashboard = lazy(() => import('../pages/VendorDashboard'));
const ClinicianDashboard = lazy(() => import('../pages/Dashboard_clinicien'));

// Shared dashboard pages with sidebar layout
const MyProfile = lazy(() => import('../pages/dashboard/MyProfile'));
const Messages = lazy(() => import('../pages/dashboard/Messages'));
const Settings = lazy(() => import('../pages/dashboard/Settings'));

// FAQ
const FAQ = lazy(() => import('../pages/faq'));

function RouteR() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/wheelchairs" element={<WheelchairDetails />} />
            <Route path="/wheelchairs/:id" element={<WheelchairDetail />} />
            <Route path="/sign" element={<Sign />} />
            <Route path="/log" element={<Log />} />
            <Route path="/faq" element={<FAQ />} />

            {/* Protected Dashboard Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/patient/*" element={
                <Routes>
                  <Route path="dashboard" element={<PatientDashboard />} />
                  <Route path="profile" element={<MyProfile />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="settings" element={<Settings />} />
                </Routes>
              } />

              <Route path="/clinician/*" element={
                <Routes>
                  <Route path="dashboard" element={<ClinicianDashboard />} />
                  <Route path="profile" element={<MyProfile />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="settings" element={<Settings />} />
                </Routes>
              } />

              <Route path="/vendor/*" element={
                <Routes>
                  <Route path="dashboard" element={<VendorDashboard />} />
                  <Route path="profile" element={<MyProfile />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="settings" element={<Settings />} />
                </Routes>
              } />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Suspense>
    </Router>
  );
}

export default RouteR;
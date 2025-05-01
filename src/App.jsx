import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AuthProvider, useAuth } from './context/AuthContext';
import NavBar from './components/navigation/NavBar';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import DashboardPage from './pages/DashboardPage';
import WcPage from './pages/WcPage';
import PatientPage from './pages/PatientPage';
import WheelchairsPage from './pages/Wheelchairspage';
import FAQ from './pages/FAQ';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/Orderspage';
import CustomersPage from './pages/Customerspage';
import PatientsPage from './pages/Patientspage';
import ConsultationsPage from './pages/Consultationpage';
import MyWheelchairsPage from './pages/MyWheelchairsPage';
import HealthRecordsPage from './pages/HealthRecordsPage';
import WheelchairDetailsPage from './pages/wheelchairesdatailes';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/welcome" element={<WcPage />} />
            <Route path="/wheelchairs" element={<WheelchairsPage />} />
            <Route
              path="/wheelchairs/:id"
              element={
                <ProtectedRoute>
                  <WheelchairDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/faq" element={<FAQ/>} />
            <Route path="/about" element={<AboutPage />} />
            
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            
            {/* Patient Routes */}
            <Route
              path="/patient"
              element={
                <ProtectedRoute allowedRoles={['1']}>
                  <PatientPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/consultations"
              element={
                <ProtectedRoute allowedRoles={['1', '2']}>
                  <ConsultationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-wheelchairs"
              element={
                <ProtectedRoute allowedRoles={['1']}>
                  <MyWheelchairsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/health-records"
              element={
                <ProtectedRoute allowedRoles={['1']}>
                  <HealthRecordsPage />
                </ProtectedRoute>
              }
            />
            
            {/* Clinician Routes */}
            <Route
              path="/patients"
              element={
                <ProtectedRoute allowedRoles={['2']}>
                  <PatientsPage />
                </ProtectedRoute>
              }
            />
            
            {/* Vendor Routes */}
            <Route
              path="/products"
              element={
                <ProtectedRoute allowedRoles={['4']}>
                  <ProductsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute allowedRoles={['4']}>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customers"
              element={
                <ProtectedRoute allowedRoles={['4']}>
                  <CustomersPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
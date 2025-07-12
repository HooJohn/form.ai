import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import TemplateLibraryPage from '../pages/TemplateLibraryPage';
import FormFillingPage from '../pages/FormFillingPage';
import MainLayout from '../components/layout/MainLayout';
import PublicLayout from '../components/layout/PublicLayout'; // Import new layout
import DashboardPage from '../pages/DashboardPage';
import PricingPage from '../pages/PricingPage';
import UserCenterPage from '../pages/UserCenterPage';
import LandingPage from '../pages/LandingPage';

// Layout for public-facing pages
const PublicRoutes = () => (
  <PublicLayout>
    <Outlet />
  </PublicLayout>
);

// Layout for internal application pages (requires login)
const AppRoutes = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Route>

        {/* Standalone Auth Page */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected App Routes */}
        <Route element={<AppRoutes />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/templates" element={<TemplateLibraryPage />} />
          <Route path="/account" element={<UserCenterPage />} />
        </Route>
        
        {/* Form filling page might have its own layout, but for now uses a fragment */}
        <Route path="/forms/:formId" element={<FormFillingPage />} />
        
        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>
    </Router>
  );
};

export default AppRouter;

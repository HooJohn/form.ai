import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import TemplateLibraryPage from '../pages/TemplateLibraryPage';
import FormFillingPage from '../pages/FormFillingPage';
import MainLayout from '../components/layout/MainLayout';
import PublicLayout from '../components/layout/PublicLayout';
import DashboardPage from '../pages/DashboardPage';
import PricingPage from '../pages/PricingPage';
import UserCenterPage from '../pages/UserCenterPage';
import HomePage from '../pages/HomePage'; // Import the new, correct landing page

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
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* Standalone Auth Page */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected App Routes */}
        <Route element={<AppRoutes />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/templates" element={<TemplateLibraryPage />} />
          <Route path="/account" element={<UserCenterPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Route>
        
        <Route path="/forms/:formId" element={<FormFillingPage />} />
        
        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>
    </Router>
  );
};

export default AppRouter;

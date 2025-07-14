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
import HomePage from '../pages/HomePage';
import * as authService from '../services/auth.service';

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

// Wrapper for the Pricing Page to select the correct layout based on auth state
const PricingPageWrapper = () => {
  const auth = authService.getAuthData();
  const Layout = auth ? MainLayout : PublicLayout;
  return (
    <Layout>
      <PricingPage />
    </Layout>
  );
};

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

        {/* Pricing page with its own layout logic */}
        <Route path="/pricing" element={<PricingPageWrapper />} />

        {/* Protected App Routes */}
        <Route element={<AppRoutes />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/templates" element={<TemplateLibraryPage />} />
          <Route path="/account" element={<UserCenterPage />} />
        </Route>
        
        <Route path="/forms/:formId" element={<FormFillingPage />} />
        
        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>
    </Router>
  );
};

export default AppRouter;

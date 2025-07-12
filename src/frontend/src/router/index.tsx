import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import TemplateLibraryPage from '../pages/TemplateLibraryPage';
import FormFillingPage from '../pages/FormFillingPage';
import MainLayout from '../components/layout/MainLayout';
import DashboardPage from '../pages/DashboardPage';
import PricingPage from '../pages/PricingPage';
import UserCenterPage from '../pages/UserCenterPage';
import LandingPage from '../pages/LandingPage'; // Import the new landing page

// A component to wrap routes that should use the main layout for logged-in users
const AppLayout = () => (
  <MainLayout>
    <Outlet /> {/* This will render the matched child route */}
  </MainLayout>
);

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Publicly accessible routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Routes that use the MainLayout, intended for logged-in users */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/templates" element={<TemplateLibraryPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/account" element={<UserCenterPage />} />
        </Route>
        
        {/* Form filling page might have its own layout, but for now uses a fragment */}
        {/* In a real app, this would also be protected */}
        <Route path="/forms/:formId" element={<FormFillingPage />} />
        
        {/* Fallback route can redirect to landing page or a 404 component */}
        <Route path="*" element={<Navigate to="/" />} /> 
        
      </Routes>
    </Router>
  );
};

export default AppRouter;

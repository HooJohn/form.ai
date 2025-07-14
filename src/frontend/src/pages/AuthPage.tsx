import React from 'react';
import AuthForm from '../components/feature/AuthForm';
import backgroundImage from '../assets/auth-background.jpg';

const AuthPage = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-30 backdrop-blur-sm"></div>
      <div className="relative z-10">
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;

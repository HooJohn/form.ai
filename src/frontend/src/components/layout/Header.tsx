import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage, Language } from '../../contexts/LanguageContext';
import * as authService from '../../services/auth.service';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Simple auth state check from localStorage
  const [auth, setAuth] = useState(authService.getAuthData());

  // This effect will not auto-update on login/logout across tabs,
  // a more robust solution would use a global state manager (like Redux or Zustand)
  // or a custom event listener for storage changes. For now, this works on navigation.
  useEffect(() => {
    setAuth(authService.getAuthData());
  }, [location]);


  const handleLogout = () => {
    authService.clearAuthData();
    setAuth(null);
    navigate('/auth');
  };

  const navLinks = [
    { path: '/dashboard', text: { 'zh-HK': '儀表板', 'zh-CN': '仪表盘', 'en': 'Dashboard' } },
    { path: '/templates', text: { 'zh-HK': '模板庫', 'zh-CN': '模板库', 'en': 'Templates' } },
    { path: '/pricing', text: { 'zh-HK': '定價方案', 'zh-CN': '定价方案', 'en': 'Pricing' } },
  ];

  return (
    <header className="bg-accent shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-40">
      <div className="flex items-center space-x-4">
        <Link to="/dashboard" className="text-xl font-bold text-secondary flex items-center">
          <span className="text-2xl mr-2">🎓</span> Form.AI
        </Link>
        <nav className="hidden md:flex space-x-6 ml-4">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-text-secondary hover:text-primary font-medium pb-1 ${location.pathname.startsWith(link.path) ? 'text-primary border-b-2 border-primary' : ''}`}
            >
              {t(link.text)}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <select
          className="py-2 pl-3 pr-8 rounded-md border bg-white border-secondary/30 text-sm text-text-secondary focus:ring-primary focus:border-primary"
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
        >
          <option value="zh-HK">中文繁體</option>
          <option value="zh-CN">中文简体</option>
          <option value="en">English</option>
        </select>
        
        {auth ? (
          <div className="flex items-center space-x-4">
            <Link to="/account" className="flex items-center space-x-2 text-text-secondary hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden md:block">{auth.user.email}</span>
            </Link>
            <button onClick={handleLogout} className="text-sm text-text-secondary hover:text-primary">
              {t({ 'zh-HK': '登出', 'zh-CN': '登出', 'en': 'Logout' })}
            </button>
          </div>
        ) : (
          <Link to="/auth" className="flex items-center space-x-2 text-text-secondary hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="hidden md:block">{t({ 'zh-HK': '登錄', 'zh-CN': '登录', 'en': 'Login' })}</span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

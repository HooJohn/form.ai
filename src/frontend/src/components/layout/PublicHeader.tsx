import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, Language } from '../../contexts/LanguageContext';

const PublicHeader = () => {
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { path: '/#features', text: { 'zh-HK': '核心功能', 'zh-CN': '核心功能', 'en': 'Features' } },
    { path: '/pricing', text: { 'zh-HK': '定價方案', 'zh-CN': '定价方案', 'en': 'Pricing' } },
  ];

  return (
    <header className="bg-accent shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-40">
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-xl font-bold text-secondary flex items-center">
          <span className="text-2xl mr-2">🎓</span> Form.AI
        </Link>
        <nav className="hidden md:flex space-x-8">
          {/* Use an anchor for features since it's on the same page */}
          <a href="/#features" className="text-text-secondary hover:text-primary font-medium">
            {t(navLinks[0].text)}
          </a>
          {/* Use Link for other pages */}
          <Link to="/pricing" className="text-text-secondary hover:text-primary font-medium">
            {t(navLinks[1].text)}
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <select
          className="py-2 pl-3 pr-8 rounded-md border border-secondary/30 bg-white text-sm text-text-secondary focus:ring-primary focus:border-primary"
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
        >
          <option value="zh-HK">中文繁體</option>
          <option value="zh-CN">中文简体</option>
          <option value="en">English</option>
        </select>
        <Link to="/auth" className="bg-primary text-white py-2 px-5 rounded-lg text-sm font-semibold hover:bg-primary-dark transition shadow-md">
          {t({ 'zh-HK': '登錄 / 註冊', 'zh-CN': '登录 / 注册', 'en': 'Login / Sign Up' })}
        </Link>
      </div>
    </header>
  );
};

export default PublicHeader;

import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, Language } from '../../contexts/LanguageContext';

const PublicHeader = () => {
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    // The "Features" link can be an anchor link to a section on the landing page
    { path: '/#features', text: { 'zh-HK': '核心功能', 'zh-CN': '核心功能', 'en': 'Features' } },
    { path: '/pricing', text: { 'zh-HK': '定價方案', 'zh-CN': '定价方案', 'en': 'Pricing' } },
  ];

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-40">
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-xl font-bold text-blue-600 flex items-center">
          <span className="text-2xl mr-2">🎓</span> SmartForm AI
        </Link>
        <nav className="hidden md:flex space-x-6">
          {navLinks.map(link => (
            <a // Use <a> for anchor links on the same page
              key={t(link.text)}
              href={link.path}
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              {t(link.text)}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <select
          className="p-2 rounded-md border border-gray-300 text-sm text-gray-700"
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
        >
          <option value="zh-HK">中文繁體</option>
          <option value="zh-CN">中文简体</option>
          <option value="en">English</option>
        </select>
        <Link to="/auth" className="bg-blue-500 text-white py-2 px-5 rounded-lg text-sm font-semibold hover:bg-blue-600 transition shadow-md">
          {t({ 'zh-HK': '登錄 / 註冊', 'zh-CN': '登录 / 注册', 'en': 'Login / Sign Up' })}
        </Link>
      </div>
    </header>
  );
};

export default PublicHeader;

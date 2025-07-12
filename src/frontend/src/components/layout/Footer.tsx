import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white text-gray-600 py-6 px-6 text-center text-sm mt-auto border-t">
      <div className="max-w-7xl mx-auto">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} SmartForm AI. {t({ 'zh-HK': '版權所有。', 'zh-CN': '版权所有。', 'en': 'All rights reserved.' })}
        </p>
        <div className="flex justify-center space-x-4 mt-3">
          <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-200">
            {t({ 'zh-HK': '關於我們', 'zh-CN': '关于我们', 'en': 'About Us' })}
          </a>
          <span className="text-gray-400">|</span>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-200">
            {t({ 'zh-HK': '私隱政策', 'zh-CN': '隐私政策', 'en': 'Privacy Policy' })}
          </a>
          <span className="text-gray-400">|</span>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-200">
            {t({ 'zh-HK': '服務條款', 'zh-CN': '服务条款', 'en': 'Terms of Service' })}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

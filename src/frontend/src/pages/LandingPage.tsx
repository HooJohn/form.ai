import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

// --- Sub-components for a cleaner structure ---

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-16 bg-white sm:pb-24 md:pb-28 lg:max-w-2xl lg:w-full lg:pb-32 xl:pb-36">
          <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-20 sm:px-6 md:mt-24 lg:mt-28 lg:px-8 xl:mt-32">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-7xl">
                <span className="block animate-fade-in-up animation-delay-200">{t({ 'zh-HK': '告別繁瑣表格', 'zh-CN': '告别繁琐表格', 'en': 'Say Goodbye to Tedious Forms' })}</span>
                <span className="block text-blue-600 animate-fade-in-up animation-delay-400">{t({ 'zh-HK': 'AI 搞定升學申請', 'zh-CN': 'AI 搞定升学申请', 'en': 'AI Handles School Applications' })}</span>
              </h1>
              <p className="mt-4 text-base text-gray-600 sm:mt-6 sm:text-xl sm:max-w-xl sm:mx-auto lg:mx-0 animate-fade-in-up animation-delay-600">
                {t({ 
                  'zh-HK': 'SmartForm AI 專為香港升學設計，透過先進的 AI 技術，將您從複雜的申請表格中解放出來。節省90%的時間，專注於更重要的事情。', 
                  'zh-CN': 'SmartForm AI 专为香港升学设计，透过先进的 AI 技术，将您从复杂的申请表格中解放出来。节省90%的时间，专注于更重要的事情。', 
                  'en': 'Designed for Hong Kong school applications, SmartForm AI frees you from complex forms with advanced AI. Save 90% of your time and focus on what truly matters.' 
                })}
              </p>
              <div className="mt-6 sm:mt-10 sm:flex sm:justify-center lg:justify-start animate-fade-in-up animation-delay-800">
                <div className="rounded-md shadow">
                  <Link to="/auth" className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-xl md:px-10 transform transition-transform duration-300 hover:scale-105">
                    {t({ 'zh-HK': '免費開始使用', 'zh-CN': '免费开始使用', 'en': 'Get Started for Free' })}
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-4">
                  <Link to="/pricing" className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-xl md:px-10 transform transition-transform duration-300 hover:scale-105">
                    {t({ 'zh-HK': '查看定價', 'zh-CN': '查看定价', 'en': 'View Pricing' })}
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-full w-full bg-gray-50 flex items-center justify-center p-8">
          {/* Custom SVG Illustration */}
          <svg width="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: 'rgb(59, 130, 246)', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: 'rgb(37, 99, 235)', stopOpacity: 1}} />
              </linearGradient>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="blur"/>
                <feOffset in="blur" dx="5" dy="5" result="offsetBlur"/>
                <feMerge>
                  <feMergeNode in="offsetBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <rect x="150" y="100" width="500" height="400" rx="20" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" filter="url(#shadow)"/>
            <path d="M 400,50 L 400,150" stroke="url(#grad1)" strokeWidth="10" strokeLinecap="round" />
            <path d="M 400,450 L 400,550" stroke="url(#grad1)" strokeWidth="10" strokeLinecap="round" />
            <circle cx="400" cy="300" r="80" fill="url(#grad1)" />
            <path d="M 370,300 L 390,320 L 430,280" stroke="white" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <text x="400" y="30" textAnchor="middle" fontSize="24" fill="#4B5563">PDF / JPG</text>
            <text x="400" y="580" textAnchor="middle" fontSize="24" fill="#4B5563">Completed Form</text>
          </svg>
        </div>
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
  const { t } = useLanguage();
  const steps = [
    {
      icon: <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>,
      title: { 'zh-HK': '1. 上傳表格', 'zh-CN': '1. 上传表格', 'en': '1. Upload Form' },
      description: { 'zh-HK': '支持PDF、圖片、掃描件。我們的AI能自動識別表格結構。', 'zh-CN': '支持PDF、图片、扫描件。我们的AI能自动识别表格结构。', 'en': 'Supports PDF, images, and scans. Our AI automatically recognizes the form structure.' }
    },
    {
      icon: <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
      title: { 'zh-HK': '2. AI 智能填充', 'zh-CN': '2. AI 智能填充', 'en': '2. AI Smart Fill' },
      description: { 'zh-HK': '只需用自然語言提供信息，AI即可為您自動填寫，省時又準確。', 'zh-CN': '只需用自然语言提供信息，AI即可为您自动填写，省时又准确。', 'en': 'Just provide your info in natural language, and AI will fill it out for you, saving time and ensuring accuracy.' }
    },
    {
      icon: <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
      title: { 'zh-HK': '3. 導出與打印', 'zh-CN': '3. 导出与打印', 'en': '3. Export & Print' },
      description: { 'zh-HK': '一鍵生成高清PDF文件，完美還原原表格格式，隨時打印或提交。', 'zh-CN': '一键生成���清PDF文件，完美还原原表格格式，随时打印或提交。', 'en': 'Generate high-resolution PDFs with one click, perfectly matching the original format.' }
    }
  ];

  return (
    <div id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold tracking-wide uppercase text-blue-600">{t({ 'zh-HK': '運作方式', 'zh-CN': '运作方式', 'en': 'How It Works' })}</h2>
          <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            {t({ 'zh-HK': '三步輕鬆完成', 'zh-CN': '三步轻松完成', 'en': 'Effortless in Three Steps' })}
          </p>
        </div>
        <div className="mt-20">
          <div className="grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {steps.map((step, index) => (
              <div key={t(step.title)} className="relative">
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 text-blue-600 mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">{t(step.title)}</h3>
                  <p className="text-gray-600 text-lg">{t(step.description)}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <svg className="h-8 w-8 text-gray-300" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M12.96,2.16a1.49,1.49,0,0,1,2.08,0l14.4,12a1.5,1.5,0,0,1,0,2.68l-14.4,12a1.49,1.49,0,0,1-2.08,0L-1.44,17.84a1.5,1.5,0,0,1,0-2.68Z" transform="translate(1.44 -1.5)"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FinalCTASection = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="max-w-3xl mx-auto text-center py-20 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
          <span className="block">{t({ 'zh-HK': '準備好開始了嗎？', 'zh-CN': '准备好开始了吗？', 'en': 'Ready to get started?' })}</span>
        </h2>
        <p className="mt-4 text-xl leading-6 text-indigo-100">
          {t({ 'zh-HK': '立即註冊，體驗前所未有的表格填寫方式。', 'zh-CN': '立即注册，体验前所未有的表格填写方式。', 'en': 'Sign up now and experience a new way of filling out forms.' })}
        </p>
        <Link to="/auth" className="mt-10 w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto transform transition-transform duration-300 hover:scale-105">
          {t({ 'zh-HK': '免費註冊', 'zh-CN': '免费注册', 'en': 'Sign Up for Free' })}
        </Link>
      </div>
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <HowItWorksSection />
      <FinalCTASection />
    </div>
  );
};

export default LandingPage;

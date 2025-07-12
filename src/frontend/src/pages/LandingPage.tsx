import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

// Helper for feature section
const Feature = ({ icon, title, description }: { icon: JSX.Element, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);

const LandingPage = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-gray-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">{t({ 'zh-HK': '告別繁瑣表格', 'zh-CN': '告别繁琐表格', 'en': 'Say Goodbye to Tedious Forms' })}</span>
                  <span className="block text-blue-600">{t({ 'zh-HK': 'AI 搞定升學申請', 'zh-CN': 'AI 搞定升学申请', 'en': 'AI Handles School Applications' })}</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto lg:mx-0">
                  {t({ 
                    'zh-HK': 'SmartForm AI 專為香港升學設計，透過先進的 AI 技術，將您從複雜的申請表格中解放出來。節省90%的時間，專注於更重要的事情。', 
                    'zh-CN': 'SmartForm AI 专为香港升学设计，透过先进的 AI 技术，将您从复杂的申请表格中解放出来。节省90%的时间，专注于更重要的事情。', 
                    'en': 'Designed for Hong Kong school applications, SmartForm AI frees you from complex forms with advanced AI. Save 90% of your time and focus on what truly matters.' 
                  })}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link to="/auth" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                      {t({ 'zh-HK': '免費開始使用', 'zh-CN': '免费开始使用', 'en': 'Get Started for Free' })}
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link to="/pricing" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10">
                      {t({ 'zh-HK': '查看定價', 'zh-CN': '查看定价', 'en': 'View Pricing' })}
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          {/* Replace with a real product screenshot later */}
          <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt="Product Screenshot" />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">{t({ 'zh-HK': '核心功能', 'zh-CN': '核心功能', 'en': 'Core Features' })}</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {t({ 'zh-HK': '一個更聰明、更快捷的填表方式', 'zh-CN': '一个更聪明、更快捷的填表方式', 'en': 'A Smarter, Faster Way to Fill Forms' })}
            </p>
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            <Feature 
              icon={<svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>}
              title={t({ 'zh-HK': '上傳任何表格', 'zh-CN': '上传任何表格', 'en': 'Upload Any Form' })}
              description={t({ 'zh-HK': '支持PDF、圖片、掃描件。我們的AI能自動識別表格結構。', 'zh-CN': '支持PDF、图片、扫描件。我们的AI能自动识别表格结构。', 'en': 'Supports PDF, images, and scans. Our AI automatically recognizes the form structure.' })}
            />
            <Feature 
              icon={<svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
              title={t({ 'zh-HK': 'AI 智能填充', 'zh-CN': 'AI 智能填充', 'en': 'AI Smart Fill' })}
              description={t({ 'zh-HK': '只需用自然語言提供信息，或上傳舊表格，AI即可為您自動填寫。', 'zh-CN': '只需用自然语言提供信息，或上传旧表格，AI即可为您自动填写。', 'en': 'Just provide your info in natural language or upload old forms, and AI will fill it out for you.' })}
            />
            <Feature 
              icon={<svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>}
              title={t({ 'zh-HK': '導出與打印', 'zh-CN': '导出与打印', 'en': 'Export & Print' })}
              description={t({ 'zh-HK': '一鍵生成高清PDF文件，完美還原原表格格式，隨時打印或提交。', 'zh-CN': '一键生成高清PDF文件，完美还原原表格格式，随时打印或提交。', 'en': 'Generate high-resolution PDFs with one click, perfectly matching the original format.' })}
            />
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-gray-800">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">{t({ 'zh-HK': '準備好開始了嗎？', 'zh-CN': '准备好开始了吗？', 'en': 'Ready to get started?' })}</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            {t({ 'zh-HK': '立即註冊，體驗前所未有的表格填寫方式。', 'zh-CN': '立即注册，体验前所未有的表格填写方式。', 'en': 'Sign up now and experience a new way of filling out forms.' })}
          </p>
          <Link to="/auth" className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-indigo-50 sm:w-auto">
            {t({ 'zh-HK': '免費註冊', 'zh-CN': '免费注册', 'en': 'Sign Up for Free' })}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

// --- Sub-components for a cleaner structure ---

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <div className="relative bg-accent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 bg-accent">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side: Text Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-text-primary sm:text-5xl md:text-6xl">
                  <span className="block animate-fade-in-up" style={{animationDelay: '0.2s'}}>{t({ 'zh-HK': '告別繁瑣表格', 'zh-CN': '告别繁琐表格', 'en': 'Say Goodbye to Tedious Forms' })}</span>{' '}
                  <span className="block text-primary animate-fade-in-up" style={{animationDelay: '0.4s'}}>{t({ 'zh-HK': 'AI搞定升學申請', 'zh-CN': 'AI搞定升学申请', 'en': 'AI Handles School Applications' })}</span>
                </h1>
                <p className="mt-3 text-base text-text-secondary sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                  {t({ 
                    'zh-HK': 'Form.AI 專為香港升學設計，透過先進的 AI 技術，將您從複雜的申請表格中解放出來。節省90%的時間，專注於更重要的事情。', 
                    'zh-CN': 'Form.AI 专为香港升学设计，透过先进的 AI 技术，将您从复杂的申请表格中解放出来。节省90%的时间，专注于更重要的事情。', 
                    'en': 'Designed for Hong Kong school applications, Form.AI frees you from complex forms with advanced AI. Save 90% of your time and focus on what truly matters.' 
                  })}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start animate-fade-in-up" style={{animationDelay: '0.8s'}}>
                  <div className="rounded-md shadow">
                    <Link to="/auth" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark md:py-4 md:text-lg md:px-10 transform transition-transform duration-300 hover:scale-105">
                      {t({ 'zh-HK': '免費開始使用', 'zh-CN': '免费开始使用', 'en': 'Get Started for Free' })}
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link to="/pricing" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20 md:py-4 md:text-lg md:px-10 transform transition-transform duration-300 hover:scale-105">
                      {t({ 'zh-HK': '查看定價', 'zh-CN': '查看定价', 'en': 'View Pricing' })}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Illustration */}
            <div className="h-full w-full flex items-center justify-center p-8 bg-white lg:bg-transparent">
              <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="tabletScreen" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F97316" stopOpacity="0.1"/>
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.2"/>
                  </linearGradient>
                </defs>
                
                {/* Scene Background */}
                <rect width="800" height="600" fill="white"/>
                <path d="M0,600 C200,500 600,700 800,550 L800,600 L0,600Z" fill="#F8FAFC"/>

                {/* "Before" - Left Side: Frustration */}
                <g transform="translate(50, 250)">
                  <rect x="0" y="0" width="150" height="200" rx="5" fill="#E2E8F0" transform="rotate(-5)"/>
                  <rect x="10" y="-10" width="150" height="200" rx="5" fill="#F1F5F9" transform="rotate(2)"/>
                  <rect x="5" y="5" width="150" height="200" rx="5" fill="#E2E8F0" transform="rotate(-2)"/>
                  <text x="75" y="100" fontFamily="Arial" fontSize="20" fill="#94A3B8" textAnchor="middle" transform="rotate(-2)">STRESS</text>
                  <path d="M20, -30 C 30,-50 70,-50 80,-30" stroke="#94A3B8" strokeWidth="4" fill="none"/>
                  <circle cx="40" cy="-20" r="4" fill="#94A3B8"/>
                  <circle cx="60" cy="-20" r="4" fill="#94A3B8"/>
                </g>

                {/* Arrow showing transformation */}
                <g transform="translate(280, 350)">
                  <path d="M0,0 C50,-50 100,-50 150,0" stroke="#F97316" strokeWidth="6" fill="none" strokeDasharray="15 10"/>
                  <path d="M140,-10 L150,0 L140,10" stroke="#F97316" strokeWidth="6" fill="none" strokeLinecap="round"/>
                </g>

                {/* "After" - Right Side: Success */}
                <g transform="translate(450, 150)">
                  {/* Tablet */}
                  <rect x="0" y="0" width="300" height="400" rx="30" fill="#334155"/>
                  <rect x="15" y="15" width="270" height="370" rx="15" fill="url(#tabletScreen)"/>
                  
                  {/* Person */}
                  <circle cx="250" cy="350" r="60" fill="#F97316"/>
                  <circle cx="250" cy="350" r="55" fill="#FFF7ED"/>
                  <path d="M235,340 C240,350 260,350 265,340" stroke="#334155" strokeWidth="4" fill="none" strokeLinecap="round"/>
                  <circle cx="240" cy="330" r="4" fill="#334155"/>
                  <circle cx="260" cy="330" r="4" fill="#334155"/>

                  {/* Form on Tablet */}
                  <g transform="translate(40, 50)">
                    <rect x="0" y="0" width="220" height="40" rx="5" fill="white" opacity="0.8"/>
                    <text x="10" y="27" fontFamily="Arial" fontSize="18" fill="#334155">Name: John Doe</text>
                    <path d="M190,10 L200,20 L215,5" stroke="#10B981" strokeWidth="4" fill="none" strokeLinecap="round"/>

                    <rect x="0" y="60" width="220" height="40" rx="5" fill="white" opacity="0.8"/>
                    <text x="10" y="87" fontFamily="Arial" fontSize="18" fill="#334155">School: St. Mary's</text>
                    <path d="M190,70 L200,80 L215,65" stroke="#10B981" strokeWidth="4" fill="none" strokeLinecap="round"/>
                  </g>

                  {/* AI Sparkle */}
                  <g transform="translate(150, 250)">
                    <path d="M-15,0 L15,0 M0,-15 L0,15" stroke="#F97316" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="0" cy="0" r="5" fill="white"/>
                  </g>
                </g>
              </svg>
            </div>
          </div>
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
      title: { 'zh-HK': '1. 智能識別表格', 'zh-CN': '1. 智能识别表格', 'en': '1. Smart Form Recognition' },
      description: { 'zh-HK': '上傳任何PDF或圖片。AI能自動識別表格結構，包括文字欄位、選擇框及照片位置。', 'zh-CN': '上传任何PDF或图片。AI能自动识别表格结构，包括文本字段、选择框及照片位置。', 'en': 'Upload any PDF or image. Our AI automatically recognizes the form structure, including text fields, checkboxes, and photo placeholders.' }
    },
    {
      icon: <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
      title: { 'zh-HK': '2. AI 智能填充', 'zh-CN': '2. AI 智能填充', 'en': '2. AI Smart Fill' },
      description: { 'zh-HK': '只需用自然語言提供信息，AI即可為您自動填寫，省時又準確。', 'zh-CN': '只需用自然语言提供信息，AI即可为您自动填写，省时又准确。', 'en': 'Just provide your info in natural language, and AI will fill it out for you, saving time and ensuring accuracy.' }
    },
    {
      icon: <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
      title: { 'zh-HK': '3. 簽名與附件', 'zh-CN': '3. 签名与附件', 'en': '3. Sign & Attach' },
      description: { 'zh-HK': '輕鬆手寫電子簽名，並上傳指定尺寸的證件照片，完美符合學校要求。', 'zh-CN': '轻松手写电子签名，并上传指定尺寸的证件照片，完美符合学校要求。', 'en': 'Easily add your handwritten electronic signature and upload ID photos resized to exact dimensions, perfectly meeting school requirements.' }
    },
    {
      icon: <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
      title: { 'zh-HK': '4. 導出與打印', 'zh-CN': '4. 导出与打印', 'en': '4. Export & Print' },
      description: { 'zh-HK': '一鍵生成高清PDF文件，完美還原原表格格式，隨時打印或提交。', 'zh-CN': '一键生成高清PDF文件，完美还原原表格格式，随时打印或提交。', 'en': 'Generate high-resolution PDFs with one click, perfectly matching the original format.' }
    }
  ];

  return (
    <div id="features" className="py-24 bg-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold tracking-wide uppercase text-primary">{t({ 'zh-HK': '核心功能', 'zh-CN': '核心功能', 'en': 'Core Features' })}</h2>
          <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-text-primary sm:text-5xl">
            {t({ 'zh-HK': '強大功能，一目了然', 'zh-CN': '强大功能，一目了然', 'en': 'Powerful Features at a Glance' })}
          </p>
        </div>
        <div className="mt-20">
          <div className="grid md:grid-cols-1 lg:grid-cols-4 md:gap-x-8 md:gap-y-10">
            {steps.map((step, index) => (
              <div key={t(step.title)} className="relative">
                <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-lg h-full">
                  <div className="flex-shrink-0 flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 text-primary mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-accent-green mb-3">{t(step.title)}</h3>
                  <p className="text-text-secondary text-lg">{t(step.description)}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <svg className="h-8 w-8 text-secondary/30" fill="currentColor" viewBox="0 0 32 32">
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
    <div className="bg-gradient-to-b from-secondary to-secondary-dark">
      <div className="max-w-3xl mx-auto text-center py-20 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
          <span className="block">{t({ 'zh-HK': '準備好開始了嗎？', 'zh-CN': '准备好开始了吗？', 'en': 'Ready to get started?' })}</span>
        </h2>
        <p className="mt-4 text-xl leading-6 text-accent-green">
          {t({ 'zh-HK': '立即註冊，體驗前所未有的表格填寫方式。', 'zh-CN': '立即注册，体验前所未有的表格填写方式。', 'en': 'Sign up now and experience a new way of filling out forms.' })}
        </p>
        <Link to="/auth" className="mt-10 w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md bg-primary text-white hover:bg-primary-dark sm:w-auto transform transition-transform duration-300 hover:scale-105">
          {t({ 'zh-HK': '免費註冊', 'zh-CN': '免费注册', 'en': 'Sign Up for Free' })}
        </Link>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="bg-accent">
      <HeroSection />
      <HowItWorksSection />
      <FinalCTASection />
    </div>
  );
};

export default HomePage;
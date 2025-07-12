import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const pricingTiers = [
  {
    name: { 'zh-HK': '免費版', 'zh-CN': '免费版', 'en': 'Free' },
    price: { 'zh-HK': 'HKD 0', 'zh-CN': 'HKD 0', 'en': 'HKD 0' },
    priceDetail: { 'zh-HK': '永久免費', 'zh-CN': '永久免费', 'en': 'Free Forever' },
    features: [
      { 'zh-HK': '每月 2 次填寫', 'zh-CN': '每月 2 次填写', 'en': '2 Form Fills per Month' },
      { 'zh-HK': '基礎模板庫', 'zh-CN': '基础模板库', 'en': 'Basic Template Library' },
      { 'zh-HK': '預覽和導出 (受限)', 'zh-CN': '预览和导出 (受限)', 'en': 'Preview & Limited Export' },
    ],
    cta: { 'zh-HK': '開始使用', 'zh-CN': '开始使用', 'en': 'Get Started' },
    isFeatured: false,
  },
  {
    name: { 'zh-HK': '專業版', 'zh-CN': '专业版', 'en': 'Professional' },
    price: { 'zh-HK': 'HKD 298', 'zh-CN': 'HKD 298', 'en': 'HKD 298' },
    priceDetail: { 'zh-HK': '每月', 'zh-CN': '每月', 'en': 'per month' },
    features: [
      { 'zh-HK': '無限次填寫', 'zh-CN': '无限次填写', 'en': 'Unlimited Form Fills' },
      { 'zh-HK': '高級模板庫', 'zh-CN': '高级模板库', 'en': 'Advanced Template Library' },
      { 'zh-HK': 'AI 升學報告 (摘要)', 'zh-CN': 'AI 升学报告 (摘要)', 'en': 'AI Report Summary' },
      { 'zh-HK': '高清 PDF 導出', 'zh-CN': '高清 PDF 导出', 'en': 'High-Res PDF Export' },
    ],
    cta: { 'zh-HK': '選擇專業版', 'zh-CN': '选择专业版', 'en': 'Choose Pro' },
    isFeatured: true,
  },
  {
    name: { 'zh-HK': '家庭版', 'zh-CN': '家庭版', 'en': 'Family' },
    price: { 'zh-HK': 'HKD 498', 'zh-CN': 'HKD 498', 'en': 'HKD 498' },
    priceDetail: { 'zh-HK': '每月', 'zh-CN': '每月', 'en': 'per month' },
    features: [
      { 'zh-HK': '專業版所有功能', 'zh-CN': '专业版所有功能', 'en': 'All Professional Features' },
      { 'zh-HK': '最多 3 位成員共享', 'zh-CN': '最多 3 位成员共享', 'en': 'Up to 3 Members' },
      { 'zh-HK': '每月 1 次人工審核', 'zh-CN': '每月 1 次人工审核', 'en': '1 Human Review per Month' },
      { 'zh-HK': '升學顧問諮詢', 'zh-CN': '升学顾问咨询', 'en': 'Admission Advisor Chat' },
    ],
    cta: { 'zh-HK': '選擇家庭版', 'zh-CN': '选择家庭版', 'en': 'Choose Family' },
    isFeatured: false,
  },
];

const PricingPage = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t({ 'zh-HK': '選擇適合您的方案', 'zh-CN': '选择适合您的方案', 'en': 'Choose the Right Plan for You' })}
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            {t({ 'zh-HK': '從免費開始，隨時升級。', 'zh-CN': '从免费开始，随时升级。', 'en': 'Start for free, upgrade anytime.' })}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <div
              key={t(tier.name)}
              className={`rounded-lg shadow-lg p-8 flex flex-col ${tier.isFeatured ? 'bg-blue-600 text-white' : 'bg-white'}`}
            >
              <h3 className={`text-2xl font-semibold ${tier.isFeatured ? '' : 'text-gray-900'}`}>{t(tier.name)}</h3>
              <div className="mt-4">
                <span className="text-4xl font-extrabold">{t(tier.price)}</span>
                <span className={`ml-2 text-lg ${tier.isFeatured ? 'text-blue-200' : 'text-gray-500'}`}>{t(tier.priceDetail)}</span>
              </div>
              <ul className="mt-6 space-y-4 flex-grow">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className={`flex-shrink-0 h-6 w-6 ${tier.isFeatured ? 'text-blue-300' : 'text-green-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3">{t(feature)}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 w-full py-3 px-6 text-lg font-semibold rounded-lg transition-transform transform hover:scale-105 ${
                  tier.isFeatured
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {t(tier.cta)}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;

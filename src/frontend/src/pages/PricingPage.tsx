import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

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
      { 'zh-HK': 'AI 升學報告', 'zh-CN': 'AI 升学报告', 'en': 'AI Admissions Reports' },
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
      { 'zh-HK': '升學顧問諮詢', 'zh-CN': '升学���问咨询', 'en': 'Admission Advisor Chat' },
    ],
    cta: { 'zh-HK': '選擇家庭版', 'zh-CN': '选择家庭版', 'en': 'Choose Family' },
    isFeatured: false,
  },
];

const PricingPage = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-accent py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">{t({ 'zh-HK': '定價', 'zh-CN': '定价', 'en': 'Pricing' })}</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            {t({ 'zh-HK': '選擇適合您的方案', 'zh-CN': '选择适合您的方案', 'en': 'The Right Plan for You' })}
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-text-secondary">
          {t({ 'zh-HK': '從免費開始，體驗核心功能，並可隨時升級以解鎖更強大的AI能力。', 'zh-CN': '从免费开始，体验核心功能，并可随时升级以解锁更强大的AI能力。', 'en': 'Start for free to experience core features, and upgrade anytime to unlock more powerful AI capabilities.' })}
        </p>
        
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={t(tier.name)}
              className={`relative rounded-3xl p-8 ring-1 xl:p-10 ${tier.isFeatured ? 'bg-gradient-to-b from-secondary to-secondary-dark ring-secondary' : 'bg-white ring-secondary/20'}`}
            >
              {tier.isFeatured && (
                <div className="absolute top-0 -translate-y-1/2 transform">
                  <span className="inline-flex items-center rounded-full bg-accent-pink px-4 py-1 text-sm font-semibold text-white">
                    {t({ 'zh-HK': '推薦', 'zh-CN': '推荐', 'en': 'Featured' })}
                  </span>
                </div>
              )}
              <h3 className={`text-lg font-semibold leading-8 ${tier.isFeatured ? 'text-white' : 'text-text-primary'}`}>{t(tier.name)}</h3>
              <p className={`mt-4 text-sm leading-6 ${tier.isFeatured ? 'text-white/80' : 'text-text-secondary'}`}>{t(tier.priceDetail)}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className={`text-4xl font-bold tracking-tight ${tier.isFeatured ? 'text-white' : 'text-text-primary'}`}>{t(tier.price)}</span>
              </p>
              <Link
                to="/auth"
                aria-describedby={t(tier.name)}
                className={`mt-6 block rounded-md py-3 px-3 text-center text-base font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.isFeatured
                    ? 'bg-primary text-white hover:bg-primary-dark focus-visible:outline-white'
                    : 'bg-primary text-white shadow-sm hover:bg-primary-dark focus-visible:outline-primary'
                }`}
              >
                {t(tier.cta)}
              </Link>
              <ul className={`mt-8 space-y-3 text-sm leading-6 xl:mt-10 ${tier.isFeatured ? 'text-white/80' : 'text-text-secondary'}`}>
                {tier.features.map((feature) => (
                  <li key={t(feature)} className="flex gap-x-3">
                    <svg className={`h-6 w-5 flex-none ${tier.isFeatured ? 'text-accent-green' : 'text-primary'}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
                    </svg>
                    {t(feature)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;

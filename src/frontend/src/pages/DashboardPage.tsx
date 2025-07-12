import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { FilledForm, FormTemplate } from '../common/types';
import { getMyForms } from '../services/form.service';
import { getTemplates } from '../services/template.service';

const DashboardPage = () => {
  const { t } = useLanguage();
  const [recentForms, setRecentForms] = useState<FilledForm[]>([]);
  const [recommendedTemplates, setRecommendedTemplates] = useState<FormTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [forms, templates] = await Promise.all([
          getMyForms(),
          getTemplates()
        ]);
        setRecentForms(forms.slice(0, 3)); // Show latest 3 forms
        setRecommendedTemplates(templates.slice(0, 3)); // Show first 3 templates as recommendations
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          {t({ 'zh-HK': '歡迎使用 SmartForm AI', 'zh-CN': '欢迎使用 SmartForm AI', 'en': 'Welcome to SmartForm AI' })}
        </h2>

        {/* Quick Start */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">
            {t({ 'zh-HK': '快速開始', 'zh-CN': '快速开始', 'en': 'Quick Start' })}
          </h3>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <Link
              to="/templates"
              className="flex-1 text-center bg-orange-500 text-white py-4 px-6 rounded-xl text-lg font-bold shadow-md hover:bg-orange-600 transition duration-300 transform hover:scale-105"
            >
              {t({ 'zh-HK': '上載表格開始填寫', 'zh-CN': '上传表格开始填写', 'en': 'Upload Form to Start' })}
            </Link>
            <Link
              to="/templates"
              className="flex-1 text-center bg-blue-500 text-white py-4 px-6 rounded-xl text-lg font-bold shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105"
            >
              {t({ 'zh-HK': '從模板庫選擇', 'zh-CN': '从模板库选择', 'en': 'Select from Template Library' })}
            </Link>
          </div>
        </div>

        {/* My Recent Forms */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">
            {t({ 'zh-HK': '我的近期表格', 'zh-CN': '我的近期表格', 'en': 'My Recent Forms' })}
          </h3>
          {isLoading ? (
            <p>{t({ 'zh-HK': '正在加載...', 'zh-CN': '正在加载...', 'en': 'Loading...' })}</p>
          ) : recentForms.length > 0 ? (
            recentForms.map((form) => (
              <div key={form.id} className="flex items-center p-4 mb-4 bg-gray-50 rounded-lg shadow-sm border transition hover:shadow-md">
                <img src={form.school.logoUrl} alt="School Logo" className="w-12 h-12 rounded-full mr-5" />
                <div className="flex-1">
                  <p className="font-semibold text-lg text-gray-800">{t(form.title)}</p>
                  <p className="text-sm text-gray-500">{form.school.name} · {t({ 'zh-HK': '最近編輯', 'zh-CN': '最近编辑', 'en': 'Last edited' })}: {new Date(form.updatedAt).toLocaleDateString()}</p>
                </div>
                <Link
                  to={`/forms/${form.id}`}
                  className="bg-blue-500 text-white py-2 px-5 rounded-lg text-sm hover:bg-blue-600 transition shadow"
                >
                  {t({ 'zh-HK': '繼續填寫', 'zh-CN': '继续填写', 'en': 'Continue Filling' })}
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500">{t({ 'zh-HK': '你還沒有任何表格。', 'zh-CN': '你还没有任何表格。', 'en': 'You don\'t have any forms yet.' })}</p>
          )}
        </div>

        {/* Recommended Templates */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">
            {t({ 'zh-HK': '推薦模板', 'zh-CN': '推荐模板', 'en': 'Recommended Templates' })}
          </h3>
          {isLoading ? (
            <p>{t({ 'zh-HK': '正在加載...', 'zh-CN': '正在加载...', 'en': 'Loading...' })}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedTemplates.map((template) => (
                <div key={template.id} className="bg-gray-50 p-5 rounded-lg shadow-sm border flex flex-col items-start transition hover:shadow-md">
                  <img src={template.schoolLogoUrl} alt="School Logo" className="w-12 h-12 rounded-full mb-3" />
                  <h4 className="font-semibold text-lg text-gray-800 mb-1">{t(template.title)}</h4>
                  <p className="text-sm text-gray-500 mb-3">{template.schoolName}</p>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">{template.description ? (typeof template.description === 'string' ? template.description : t(template.description)) : ''}</p>
                  <Link
                    to="/templates" // Navigate to library for user to find and start
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm hover:bg-gray-300 transition self-end"
                  >
                    {t({ 'zh-HK': '查看詳情', 'zh-CN': '查看详情', 'en': 'View Details' })}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

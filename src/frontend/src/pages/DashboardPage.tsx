import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { FilledForm, FormTemplate, SubscriptionPlan, UserProfile } from '../common/types';
import { getMyForms } from '../services/form.service';
import { getTemplates } from '../services/template.service';
import * as authService from '../services/auth.service';
import * as aiService from '../services/ai.service';

type SessionUser = UserProfile & { subscriptionPlan: SubscriptionPlan };

const DashboardPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [recentForms, setRecentForms] = useState<FilledForm[]>([]);
  const [recommendedTemplates, setRecommendedTemplates] = useState<FormTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user] = useState<SessionUser | null>(() => {
    const authData = authService.getAuthData();
    return authData ? (authData.user as SessionUser) : null;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [forms, templates] = await Promise.all([
          getMyForms(),
          getTemplates()
        ]);
        setRecentForms(forms.slice(0, 3));
        setRecommendedTemplates(templates.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUploadClick = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    if (user.subscriptionPlan === SubscriptionPlan.FREE) {
      alert(t({
        'zh-HK': '上傳自定義模板是專業版和家庭版功能。請升級您的帳戶。',
        'zh-CN': '上传自定义模板是专业版和家庭版功能。请升级您的帐户。',
        'en': 'Uploading custom templates is a Professional and Family feature. Please upgrade your account.'
      }));
      navigate('/pricing');
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    try {
      const newForm = await aiService.analyzeAndCreateForm(file);
      navigate(`/forms/${newForm.id}`);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-8 bg-accent min-h-full">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-text-primary mb-8">
          {t({ 'zh-HK': '歡迎使用 Form.AI', 'zh-CN': '欢迎使用 Form.AI', 'en': 'Welcome to Form.AI' })}
        </h2>

        {/* Quick Start */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-secondary/10">
          <h3 className="text-2xl font-semibold text-text-primary mb-6">
            {t({ 'zh-HK': '快速開始', 'zh-CN': '快速开始', 'en': 'Quick Start' })}
          </h3>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg, application/pdf"
            disabled={isAnalyzing}
          />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <button
              onClick={handleUploadClick}
              disabled={isAnalyzing}
              className="flex-1 text-center bg-primary text-white py-4 px-6 rounded-xl text-lg font-bold shadow-md hover:bg-primary-dark transition duration-300 transform hover:scale-105 disabled:bg-gray-400"
            >
              {isAnalyzing 
                ? t({ 'zh-HK': '分析中...', 'zh-CN': '分析中...', 'en': 'Analyzing...' })
                : t({ 'zh-HK': '上載表格開始填寫', 'zh-CN': '上传表格开始填写', 'en': 'Upload Form to Start' })}
            </button>
            <Link
              to="/templates"
              className="flex-1 text-center bg-secondary text-white py-4 px-6 rounded-xl text-lg font-bold shadow-md hover:bg-secondary-dark transition duration-300 transform hover:scale-105"
            >
              {t({ 'zh-HK': '從模板庫選擇', 'zh-CN': '从模板库选择', 'en': 'Select from Template Library' })}
            </Link>
          </div>
        </div>

        {/* My Recent Forms */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-secondary/10">
          <h3 className="text-2xl font-semibold text-text-primary mb-6">
            {t({ 'zh-HK': '我的近期表格', 'zh-CN': '我的近期表格', 'en': 'My Recent Forms' })}
          </h3>
          {isLoading ? (
            <p>{t({ 'zh-HK': '正在加載...', 'zh-CN': '正在加载...', 'en': 'Loading...' })}</p>
          ) : recentForms.length > 0 ? (
            recentForms.map((form) => (
              <div key={form.id} className="flex items-center p-4 mb-4 bg-accent rounded-lg shadow-sm border transition hover:shadow-md">
                <img src={form.school.logoUrl} alt="School Logo" className="w-12 h-12 rounded-full mr-5" />
                <div className="flex-1">
                  <p className="font-semibold text-lg text-text-primary">{t(form.title)}</p>
                  <p className="text-sm text-text-secondary">{form.school.name} · {t({ 'zh-HK': '最近編輯', 'zh-CN': '最近编辑', 'en': 'Last edited' })}: {new Date(form.updatedAt).toLocaleDateString()}</p>
                </div>
                <Link
                  to={`/forms/${form.id}`}
                  className="bg-secondary text-white py-2 px-5 rounded-lg text-sm hover:bg-blue-700 transition shadow"
                >
                  {t({ 'zh-HK': '繼續填寫', 'zh-CN': '继续填写', 'en': 'Continue Filling' })}
                </Link>
              </div>
            ))
          ) : (
            <p className="text-text-secondary">{t({ 'zh-HK': '你還沒有任何表格。', 'zh-CN': '你还没有任何表格。', 'en': 'You don\'t have any forms yet.' })}</p>
          )}
        </div>

        {/* Recommended Templates */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-secondary/10">
          <h3 className="text-2xl font-semibold text-text-primary mb-6">
            {t({ 'zh-HK': '推薦模板', 'zh-CN': '推荐模板', 'en': 'Recommended Templates' })}
          </h3>
          {isLoading ? (
            <p>{t({ 'zh-HK': '正在加載...', 'zh-CN': '正在加载...', 'en': 'Loading...' })}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedTemplates.map((template) => (
                <div key={template.id} className="bg-accent p-5 rounded-lg shadow-sm border flex flex-col items-start transition hover:shadow-md">
                  <img src={template.schoolLogoUrl} alt="School Logo" className="w-12 h-12 rounded-full mb-3" />
                  <h4 className="font-semibold text-lg text-text-primary mb-1">{t(template.title)}</h4>
                  <p className="text-sm text-text-secondary mb-3">{template.schoolName}</p>
                  <p className="text-sm text-text-secondary mb-4 flex-grow">{template.description ? (typeof template.description === 'string' ? template.description : t(template.description)) : ''}</p>
                  <Link
                    to="/templates" // Navigate to library for user to find and start
                    className="bg-secondary/10 text-secondary py-2 px-4 rounded-lg text-sm hover:bg-secondary/20 transition self-end"
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


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTemplates } from '../services/template.service';
import { createForm } from '../services/form.service';
import * as aiService from '../services/ai.service';
import * as userService from '../services/user.service';
import { FormTemplate, SubscriptionPlan, UserProfile } from '../common/types';
import { useLanguage } from '../contexts/LanguageContext';
import * as authService from '../services/auth.service';

// A more complete user type for the frontend session
type SessionUser = UserProfile & { subscriptionPlan: SubscriptionPlan };

// Helper component for the Upload button and its logic
const UploadTemplateButton = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Initialize user state directly from localStorage for instant UI feedback
  const [user, setUser] = useState<SessionUser | null>(() => {
    const authData = authService.getAuthData();
    return authData ? (authData.user as SessionUser) : null;
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);
    try {
      // This flow assumes the backend can create a form from an analyzed structure.
      // A more robust implementation might involve creating a "draft template" first.
      const newForm = await aiService.analyzeAndCreateForm(file);
      navigate(`/forms/${newForm.id}`);

    } catch (err: any) {
      setError(err.message || t({ 'zh-HK': '分析失敗', 'zh-CN': '分析失败', 'en': 'Analysis failed' }));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUploadClick = () => {
    if (!user) {
      // This case should ideally not be hit if the button is rendered for a logged-in user,
      // but as a fallback, we navigate to login.
      navigate('/auth');
      return;
    }

    const isFreeTier = user.subscriptionPlan === SubscriptionPlan.FREE;

    if (isFreeTier) {
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

  // The button is always enabled if the user is logged in.
  // The click handler enforces the business logic.
  if (!user) return null; // Don't show the button if not logged in.

  return (
    <div className="mb-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, application/pdf"
        disabled={isAnalyzing}
      />
      <button
        onClick={handleUploadClick}
        disabled={isAnalyzing}
        className="w-full flex items-center justify-center bg-accent-green text-white py-3 px-4 rounded-lg text-base font-bold shadow-md hover:bg-green-600 transition duration-300 disabled:bg-gray-400"
      >
        {isAnalyzing ? t({ 'zh-HK': '分析中...', 'zh-CN': '分析中...', 'en': 'Analyzing...' }) : `+ ${t({ 'zh-HK': '上傳自定義模板', 'zh-CN': '上传自定义模板', 'en': 'Upload Custom Template' })}`}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};


const TemplateCard = ({ template }: { template: FormTemplate }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isCreating, setIsCreating] = useState(false);

  const handleStartFilling = async () => {
    setIsCreating(true);
    try {
      const newForm = await createForm(template.id);
      navigate(`/forms/${newForm.id}`);
    } catch (error) {
      console.error('Failed to create form:', error);
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-secondary/10 flex flex-col items-start">
      <div className="flex items-center mb-4">
        <img src={template.schoolLogoUrl} alt={`${template.schoolName} Logo`} className="w-14 h-14 rounded-full mr-4" />
        <div>
          <h4 className="font-semibold text-xl text-text-primary">{t(template.title)}</h4>
          <p className="text-sm text-text-secondary">{template.schoolName}</p>
        </div>
      </div>
      <p className="text-text-secondary text-sm mb-4 flex-grow">{template.description ? (typeof template.description === 'string' ? template.description : t(template.description)) : ''}</p>
      <div className="flex justify-between items-center w-full">
        <span className="text-xs text-text-secondary/70">
          {t({ 'zh-HK': '更新於', 'zh-CN': '更新于', 'en': 'Updated on' })}: {new Date(template.lastUpdated).toLocaleDateString()}
        </span>
        <button
          onClick={handleStartFilling}
          disabled={isCreating}
          className="bg-primary text-white py-2 px-5 rounded-lg text-sm hover:bg-primary-dark shadow-md disabled:bg-gray-400"
        >
          {isCreating ? t({ 'zh-HK': '創建中...', 'zh-CN': '创建中...', 'en': 'Creating...' }) : t({ 'zh-HK': '開始填寫', 'zh-CN': '开始填写', 'en': 'Start Filling' })}
        </button>
      </div>
    </div>
  );
};

const TemplateLibraryPage = () => {
  const { t } = useLanguage();
  const [allTemplates, setAllTemplates] = useState<FormTemplate[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<FormTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const data = await getTemplates();
        setAllTemplates(data);
        setFilteredTemplates(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  useEffect(() => {
    let tempTemplates = allTemplates;

    if (selectedGrade !== 'all') {
      tempTemplates = tempTemplates.filter(template => template.gradeLevels.includes(selectedGrade));
    }

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      tempTemplates = tempTemplates.filter(template =>
        template.schoolName.toLowerCase().includes(lowercasedTerm) ||
        t(template.title).toLowerCase().includes(lowercasedTerm) ||
        (template.description && (typeof template.description === 'string' ? template.description.toLowerCase().includes(lowercasedTerm) : t(template.description).toLowerCase().includes(lowercasedTerm)))
      );
    }
    setFilteredTemplates(tempTemplates);
  }, [searchTerm, selectedGrade, allTemplates, t]);

  const gradeCategories = [
    { id: 'all', label: { 'zh-HK': '全部年級', 'zh-CN': '全部年��', 'en': 'All Grades' } },
    { id: 'P1', label: { 'zh-HK': '小一', 'zh-CN': '小一', 'en': 'P1' } },
    { id: 'S1', label: { 'zh-HK': '中一', 'zh-CN': '中一', 'en': 'S1' } },
    { id: 'S3', label: { 'zh-HK': '中三', 'zh-CN': '中三', 'en': 'S3' } },
    { id: 'S6', label: { 'zh-HK': '中六', 'zh-CN': '中六', 'en': 'S6' } },
  ];

  return (
    <div className="p-8 bg-accent min-h-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-text-primary">{t({ 'zh-HK': '模板庫', 'zh-CN': '模板库', 'en': 'Template Library' })}</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar for Filters */}
          <div className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow-lg border border-secondary/10 h-fit">
            <UploadTemplateButton />
            <h3 className="text-xl font-semibold text-text-primary mb-4 border-t pt-6 mt-6 border-secondary/10">
              {t({ 'zh-HK': '平台模板', 'zh-CN': '平台模板', 'en': 'Platform Templates' })}
            </h3>
            <input
              type="text"
              placeholder={t({ 'zh-HK': '搜索平台模板...', 'zh-CN': '搜索平台模板...', 'en': 'Search platform templates...' })}
              className="w-full p-3 mb-4 border border-secondary/30 rounded-lg focus:ring-primary focus:border-primary transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
              <p className="font-medium text-text-secondary mb-2">{t({ 'zh-HK': '按年級', 'zh-CN': '按年级', 'en': 'By Grade' })}</p>
              {gradeCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedGrade(cat.id)}
                  className={`block w-full text-left py-2 px-3 rounded-lg text-sm mb-1 transition ${selectedGrade === cat.id ? 'bg-primary text-white' : 'text-text-secondary hover:bg-accent'}`}
                >
                  {t(cat.label)}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content Area for Templates */}
          <div className="w-full md:w-3/4">
            {loading && <p className="text-center">{t({ 'zh-HK': '正在加載...', 'zh-CN': '正在加载...', 'en': 'Loading...' })}</p>}
            {error && <p className="text-center text-red-500">{t({ 'zh-HK': '錯誤', 'zh-CN': '错误', 'en': 'Error' })}: {error}</p>}
            
            {!loading && !error && (
              filteredTemplates.length === 0 ? (
                <p className="text-center text-text-secondary text-lg mt-10">
                  {t({ 'zh-HK': '沒有找到相關模板。', 'zh-CN': '没有找到相关模板。', 'en': 'No templates found.' })}
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTemplates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateLibraryPage;
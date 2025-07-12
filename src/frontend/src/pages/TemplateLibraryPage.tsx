import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTemplates } from '../services/template.service';
import { createForm } from '../services/form.service';
import { FormTemplate } from '../common/types';
import { useLanguage } from '../contexts/LanguageContext';

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
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col items-start">
      <div className="flex items-center mb-4">
        <img src={template.schoolLogoUrl} alt={`${template.schoolName} Logo`} className="w-14 h-14 rounded-full mr-4" />
        <div>
          <h4 className="font-semibold text-xl text-gray-800">{t(template.title)}</h4>
          <p className="text-sm text-gray-500">{template.schoolName}</p>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-4 flex-grow">{template.description ? (typeof template.description === 'string' ? template.description : t(template.description)) : ''}</p>
      <div className="flex justify-between items-center w-full">
        <span className="text-xs text-gray-400">
          {t({ 'zh-HK': '更新於', 'zh-CN': '更新于', 'en': 'Updated on' })}: {new Date(template.lastUpdated).toLocaleDateString()}
        </span>
        <button
          onClick={handleStartFilling}
          disabled={isCreating}
          className="bg-blue-500 text-white py-2 px-5 rounded-lg text-sm hover:bg-blue-600 shadow-md disabled:bg-gray-400"
        >
          {isCreating ? t({ 'zh-HK': '創建中...', 'zh-CN': '创建中...', 'en': 'Creating...' }) : t({ 'zh-HK': '開始填寫', 'zh-CN': '开始填写', 'en': 'Start Filling' })}
        </button>
      </div>
    </div>
  );
};

const TemplateLibraryPage = () => {
  const [templates, setTemplates] = useState<FormTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const data = await getTemplates();
        setTemplates(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">模板库</h2>
        
        {loading && <p className="text-center">加载中...</p>}
        {error && <p className="text-center text-red-500">错误: {error}</p>}
        
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateLibraryPage;

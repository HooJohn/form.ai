import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTemplates } from '../services/template.service';
import { createForm } from '../services/form.service';
import { FormTemplate } from '@common/types';
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
      // ***** FIX IS HERE *****
      // Renamed the parameter from `t` to `template` to avoid conflict with the translation function `t`
      tempTemplates = tempTemplates.filter(template =>
        template.schoolName.toLowerCase().includes(lowercasedTerm) ||
        t(template.title).toLowerCase().includes(lowercasedTerm) ||
        (template.description && (typeof template.description === 'string' ? template.description.toLowerCase().includes(lowercasedTerm) : t(template.description).toLowerCase().includes(lowercasedTerm)))
      );
    }
    setFilteredTemplates(tempTemplates);
  }, [searchTerm, selectedGrade, allTemplates, t]);

  const gradeCategories = [
    { id: 'all', label: { 'zh-HK': '全部年級', 'zh-CN': '全部年级', 'en': 'All Grades' } },
    { id: 'P1', label: { 'zh-HK': '小一', 'zh-CN': '小一', 'en': 'P1' } },
    { id: 'S1', label: { 'zh-HK': '中一', 'zh-CN': '中一', 'en': 'S1' } },
    { id: 'S3', label: { 'zh-HK': '中三', 'zh-CN': '中三', 'en': 'S3' } },
    { id: 'S6', label: { 'zh-HK': '中六', 'zh-CN': '中六', 'en': 'S6' } },
  ];

  return (
    <div className="p-8 bg-accent min-h-full">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-text-primary mb-8">{t({ 'zh-HK': '模板庫', 'zh-CN': '模板库', 'en': 'Template Library' })}</h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar for Filters */}
          <div className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow-lg border border-secondary/10 h-fit">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              {t({ 'zh-HK': '篩選與分類', 'zh-CN': '筛选与分类', 'en': 'Filters & Categories' })}
            </h3>
            <input
              type="text"
              placeholder={t({ 'zh-HK': '搜索模板...', 'zh-CN': '搜索模板...', 'en': 'Search templates...' })}
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
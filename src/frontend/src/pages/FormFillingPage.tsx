import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getForm, updateForm } from '../services/form.service';
import * as feedbackService from '../services/feedback.service';
import * as reportService from '../services/report.service';
import * as aiService from '../services/ai.service'; // <--- ADDED MISSING IMPORT
import { FilledForm, FormSection, FormField, ExtractedInfoItem, LocalizedString, FormFieldType } from './../common/types';
import ImageUploadField from '../components/feature/ImageUploadField';
import SignatureField from '../components/feature/SignatureField';
import { debounce } from 'lodash';
import SmartAssistant from '../components/feature/Form/SmartAssistant';
import Modal from '../components/shared/Modal';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLanguage } from '../contexts/LanguageContext';

const FormFillingPage = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [form, setForm] = useState<FilledForm | null>(null);
  const formRef = useRef(form);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [aiFilledFields, setAiFilledFields] = useState<Set<string>>(new Set());

  // State lifted up from SmartAssistant
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // State for AI Report
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);

  // Update ref whenever form state changes
  useEffect(() => {
    formRef.current = form;
  }, [form]);

  // Fetch form on initial load
  useEffect(() => {
    if (!formId) return;
    const fetchForm = async () => {
      try {
        setLoading(true);
        const data = await getForm(formId);
        setForm(data);
        if (data.sections && data.sections.length > 0) {
          setActiveSectionId(data.sections[0].id);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [formId]);

  // Auto-save when the user leaves the page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (formRef.current && formId) {
          const url = `/api/forms/${formId}`;
          const data = JSON.stringify({ sections: formRef.current.sections });
          // Use a Blob with the correct content type for robust saving
          const blob = new Blob([data], { type: 'application/json' });
          navigator.sendBeacon(url, blob);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [formId]);

  const debouncedSave = useCallback(
    debounce(async (updatedForm: FilledForm) => {
      if (!formId) return;
      setSaveStatus('saving');
      try {
        await updateForm(formId, { sections: updatedForm.sections });
        setSaveStatus('saved');
      } catch (err) {
        setSaveStatus('error');
      }
    }, 2000),
    [formId]
  );

  const handleFieldChange = (sectionId: string, fieldId: string, newValue: FormField['value']) => {
    if (!form) return;
    const newSections = form.sections.map(section =>
      section.id === sectionId
        ? { ...section, fields: section.fields.map(field => (field.id === fieldId ? { ...field, value: newValue } : field)) }
        : section
    );
    const updatedForm = { ...form, sections: newSections };
    setForm(updatedForm);
    setSaveStatus('idle');
    debouncedSave(updatedForm);
  };

  const handleAutoFill = (extractedInfo: ExtractedInfoItem[]) => {
    if (!form) return;
    let tempForm = { ...form };
    extractedInfo.forEach(info => {
      for (const section of tempForm.sections) {
        for (const field of section.fields) {
          if (t(field.label).toLowerCase().includes(info.label.toLowerCase())) {
            field.value = info.value;
          }
        }
      }
    });
    setForm(tempForm);
    setSaveStatus('idle');
    debouncedSave(tempForm);
  };

  // This function is now part of the parent component
  const handleAnalyzeForm = async (file: File) => {
    if (!file || !formId) return;
    setIsAnalyzing(true);
    setAnalysisError(null);
    try {
      const sections = await aiService.analyzeForm(file);
      handleFormAnalyzed(sections);
    } catch (err: any) {
      setAnalysisError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFormAnalyzed = (sections: FormSection[]) => {
    if (!form) return;
    const updatedForm = { ...form, sections };
    setForm(updatedForm);
    setSaveStatus('saving');
    debouncedSave.cancel();
    updateForm(form.id, { sections: updatedForm.sections })
      .then(() => setSaveStatus('saved'))
      .catch(() => setSaveStatus('error'));
  };

  const handleGenerateReport = async () => {
    if (!formId) return;
    setIsGeneratingReport(true);
    setReportError(null);
    try {
      const report = await reportService.generateReport(formId);
      setReportContent(report);
      setIsReportModalOpen(true);
    } catch (err: any) {
      setReportError(err.message);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const getSaveStatusMessage = () => {
    switch (saveStatus) {
      case 'saving':
        return t({ 'zh-HK': '正在儲存...', 'zh-CN': '正在保存...', 'en': 'Saving...' });
      case 'saved':
        return t({ 'zh-HK': '已儲存', 'zh-CN': '已保存', 'en': 'Saved' });
      case 'error':
        return t({ 'zh-HK': '儲存失敗', 'zh-CN': '保存失败', 'en': 'Save failed' });
      default:
        return t({ 'zh-HK': '所有變更將自動儲存', 'zh-CN': '所有变更将自动保存', 'en': 'All changes saved automatically' });
    }
  };

  if (loading) return <p className="text-center mt-10">{t({ 'zh-HK': '正在加載表單...', 'zh-CN': '正在加载表单...', 'en': 'Loading Form...' })}</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{t({ 'zh-HK': '錯誤', 'zh-CN': '错误', 'en': 'Error' })}: {error}</p>;
  if (!form) return <p className="text-center mt-10">{t({ 'zh-HK': '找不到表單', 'zh-CN': '找不到表单', 'en': 'Form not found.' })}</p>;

  return (
    <>
      <Modal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} title={t({ 'zh-HK': 'AI 升學報告', 'zh-CN': 'AI 升学报告', 'en': 'AI Admissions Report' })}>
        {isGeneratingReport && <p>{t({ 'zh-HK': '正在生成報告...', 'zh-CN': '正在生成报告...', 'en': 'Generating report...' })}</p>}
        {reportError && <p className="text-red-500">{t({ 'zh-HK': '錯誤', 'zh-CN': '错误', 'en': 'Error' })}: {reportError}</p>}
        {reportContent && !isGeneratingReport && (
          <div className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {reportContent}
            </ReactMarkdown>
          </div>
        )}
      </Modal>

      <div className="flex flex-col h-screen bg-accent font-sans">
        <header className="bg-white shadow-sm py-3 px-6 flex justify-between items-center border-b border-secondary/10">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="flex items-center text-text-secondary hover:text-primary mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {t({ 'zh-HK': '返回', 'zh-CN': '返回', 'en': 'Back' })}
            </button>
            <h2 className="text-lg font-semibold text-secondary">{t(form.title)}</h2>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-text-secondary">{getSaveStatusMessage()}</span>
            <button onClick={handleGenerateReport} disabled={isGeneratingReport} className="bg-accent-green text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors">
              {isGeneratingReport ? t({ 'zh-HK': '生成中...', 'zh-CN': '生成中...', 'en': 'Generating...' }) : t({ 'zh-HK': '生成AI報告', 'zh-CN': '生成AI报告', 'en': 'Generate AI Report' })}
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <nav className="w-1/5 bg-white p-6 border-r border-secondary/10 overflow-y-auto">
            <h3 className="text-xl font-semibold text-text-primary mb-4">{t({ 'zh-HK': '表格章節', 'zh-CN': '表格章节', 'en': 'Form Sections' })}</h3>
            {form.sections.map(section => (
              <button key={section.id} onClick={() => setActiveSectionId(section.id)} className={`w-full text-left p-3 rounded-lg text-base font-medium transition duration-200 mb-2 ${activeSectionId === section.id ? 'bg-primary text-white' : 'text-text-secondary hover:bg-accent'}`}>
                {t(section.title)}
              </button>
            ))}
          </nav>

          <main className="flex-1 p-8 overflow-y-auto bg-accent">
            <div className="max-w-3xl mx-auto">
              {form.sections.map(section => (
                section.id === activeSectionId && (
                  <div key={section.id} className="mb-8 p-8 bg-white rounded-2xl shadow-inner border border-secondary/10">
                    <h4 className="text-2xl font-semibold text-text-primary mb-6 border-b border-secondary/10 pb-4">{t(section.title)}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                      {section.fields.map(field => renderField(section.id, field))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </main>

          <aside className="w-1/4 bg-white overflow-y-auto border-l border-secondary/10">
            <SmartAssistant 
              onAutoFill={handleAutoFill} 
              onAnalyzeForm={handleAnalyzeForm}
              isAnalyzing={isAnalyzing}
              analysisError={analysisError}
            />
          </aside>
        </div>
      </div>
    </>
  );

  function renderField(sectionId: string, field: FormField) {
    const commonProps = {
      key: field.id,
      id: field.id,
      className: "w-full p-3 border border-secondary/30 rounded-lg focus:ring-primary focus:border-primary",
      value: String(field.value ?? ''),
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => handleFieldChange(sectionId, field.id, e.target.value),
    };

    const fieldWrapper = (children: React.ReactNode) => (
      <div key={field.id} className="md:col-span-2">
        <label htmlFor={field.id} className="block text-sm font-medium text-text-secondary mb-2">{t(field.label)}</label>
        {children}
      </div>
    );

    switch (field.type) {
      case FormFieldType.FILE_UPLOAD:
        return fieldWrapper(
          <ImageUploadField 
            fieldId={field.id} 
            onUploadSuccess={(filePath) => handleFieldChange(sectionId, field.id, filePath)} 
            targetWidth={field.imageWidth}
            targetHeight={field.imageHeight}
            t={t}
          />
        );

      case FormFieldType.SIGNATURE:
        return fieldWrapper(
          <SignatureField 
            fieldId={field.id} 
            onUploadSuccess={(filePath) => handleFieldChange(sectionId, field.id, filePath)} 
            t={t}
          />
        );

      case FormFieldType.TEXTAREA:
        return fieldWrapper(<textarea {...commonProps} rows={4} />);

      default:
        return fieldWrapper(<input {...commonProps} type={field.type} />);
    }
  }
};

export default FormFillingPage;

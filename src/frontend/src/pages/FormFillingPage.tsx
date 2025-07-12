import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getForm, updateForm } from '../services/form.service';
import * as feedbackService from '../services/feedback.service';
import * as reportService from '../services/report.service';
import { FilledForm, FormSection, FormField, ExtractedInfoItem, LocalizedString } from './../common/types';
import { debounce } from 'lodash';
import SmartAssistant from '../components/feature/Form/SmartAssistant';
import Modal from '../components/shared/Modal';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLanguage } from '../contexts/LanguageContext';

const FormFillingPage = () => {
  const { formId } = useParams<{ formId: string }>();
  const { language, t } = useLanguage();
  const [form, setForm] = useState<FilledForm | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [aiFilledFields, setAiFilledFields] = useState<Set<string>>(new Set());

  // State for AI Report
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);

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

    const fieldIdentifier = `${sectionId}-${fieldId}`;
    if (aiFilledFields.has(fieldIdentifier)) {
      const originalValue = form.sections.find(s => s.id === sectionId)?.fields.find(f => f.id === fieldId)?.value ?? '';
      feedbackService.submitCorrection({
        formId: form.id,
        sectionId,
        fieldId,
        originalAiValue: String(originalValue),
        userCorrectedValue: String(newValue),
      });
      const newAiFilledFields = new Set(aiFilledFields);
      newAiFilledFields.delete(fieldIdentifier);
      setAiFilledFields(newAiFilledFields);
    }

    const newSections = form.sections.map(section => {
      if (section.id === sectionId) {
        const newFields = section.fields.map(field => {
          if (field.id === fieldId) {
            return { ...field, value: newValue };
          }
          return field;
        });
        return { ...section, fields: newFields };
      }
      return section;
    });

    const updatedForm = { ...form, sections: newSections };
    setForm(updatedForm);
    setSaveStatus('idle');
    debouncedSave(updatedForm);
  };

  const handleAutoFill = (extractedInfo: ExtractedInfoItem[]) => {
    if (!form) return;
    const newAiFilledFields = new Set<string>();
    let tempForm = { ...form };

    extractedInfo.forEach(info => {
      for (const section of tempForm.sections) {
        for (const field of section.fields) {
          if (t(field.label).toLowerCase().includes(info.label.toLowerCase())) {
            field.value = info.value;
            newAiFilledFields.add(`${section.id}-${field.id}`);
          }
        }
      }
    });
    
    setAiFilledFields(newAiFilledFields);
    setForm(tempForm);
    setSaveStatus('idle');
    debouncedSave(tempForm);
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
    // Implementation is fine
    return '...';
  };

  if (loading) return <p className="text-center mt-10">Loading Form...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  if (!form) return <p className="text-center mt-10">Form not found.</p>;

  return (
    <>
      {/* <Modal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} title="AI School Report"> */}
        {/* Modal content is fine */}
      {/* </Modal> */}

      <Modal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} title="AI School Report">
        {isGeneratingReport && <p>Generating report, please wait...</p>}
        {reportError && <p className="text-red-500">Error: {reportError}</p>}
        {reportContent && !isGeneratingReport && (
          <div className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {reportContent}
            </ReactMarkdown>
          </div>
        )}
      </Modal>

      <div className="flex flex-col h-screen bg-gray-50 font-sans">
        <header className="bg-white shadow-sm py-3 px-6 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-lg font-semibold text-blue-600">{t(form.title)}</h2>
          {/* Header content is fine */}
        </header>

        <div className="flex flex-1 overflow-hidden">
          <nav className="w-1/5 bg-white p-6 border-r border-gray-200 overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Form Sections</h3>
            {form.sections.map(section => (
              <button key={section.id} onClick={() => setActiveSectionId(section.id)} className={`w-full text-left p-3 rounded-lg text-base font-medium transition duration-200 mb-2 ${activeSectionId === section.id ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                {t(section.title)}
              </button>
            ))}
          </nav>

          <main className="flex-1 p-8 overflow-y-auto bg-white shadow-lg">
            <div className="max-w-3xl mx-auto">
              {form.sections.map(section => (
                <div key={section.id} className="mb-8 p-6 bg-gray-50 rounded-lg shadow-inner">
                  <h4 className="text-xl font-semibold text-gray-700 mb-5 border-b pb-3">{t(section.title)}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-6">
                    {section.fields.map(field => (
                      <div key={field.id}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t(field.label)}</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          value={String(field.value ?? '')}
                          onChange={(e) => handleFieldChange(section.id, field.id, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </main>

          <aside className="w-1/4 bg-white overflow-y-auto">
            <SmartAssistant onAutoFill={handleAutoFill} onFormAnalyzed={handleFormAnalyzed} />
          </aside>
        </div>
      </div>
    </>
  );
};

export default FormFillingPage;


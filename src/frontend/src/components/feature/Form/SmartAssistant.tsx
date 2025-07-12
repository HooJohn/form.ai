import React, { useState } from 'react';
import { ExtractedInfoItem, FormSection } from '@common/types';
import * as aiService from '../../../services/ai.service';
import { useLanguage } from '../../../contexts/LanguageContext';

interface SmartAssistantProps {
  onAutoFill: (extractedInfo: ExtractedInfoItem[]) => void;
  onFormAnalyzed: (sections: FormSection[]) => void;
}

const FormAnalyzer = ({ onFormAnalyzed }: { onFormAnalyzed: (sections: FormSection[]) => void }) => {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setUploadError(null);
    try {
      const sections = await aiService.analyzeForm(file);
      onFormAnalyzed(sections);
    } catch (err: any) {
      setUploadError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {t({ 'zh-HK': '上傳表格以自動識別字段', 'zh-CN': '上传表格以自动识别字段', 'en': 'Upload Form to Auto-Detect Fields' })}
      </label>
      <input 
        type="file" 
        onChange={handleFileChange} 
        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        accept="image/png, image/jpeg, application/pdf"
      />
      <button
        onClick={handleAnalyze}
        disabled={isAnalyzing || !file}
        className="mt-3 w-full bg-purple-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-600 transition duration-200 shadow-md disabled:bg-gray-400"
      >
        {isAnalyzing ? t({ 'zh-HK': '分析中...', 'zh-CN': '分析中...', 'en': 'Analyzing...' }) : t({ 'zh-HK': 'AI 分析表單', 'zh-CN': 'AI 分析表单', 'en': 'Analyze Form with AI' })}
      </button>
      {uploadError && <p className="text-red-500 text-sm mt-2">{uploadError}</p>}
    </div>
  );
};


const SmartAssistant = ({ onAutoFill, onFormAnalyzed }: SmartAssistantProps) => {
  const { t } = useLanguage();
  const [text, setText] = useState('');
  const [extractedInfo, setExtractedInfo] = useState<ExtractedInfoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExtract = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await aiService.extractInfo(text);
      setExtractedInfo(result);
    } catch (err: any) {
      setError(err.message);
      setExtractedInfo([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillClick = () => {
    onAutoFill(extractedInfo);
    setExtractedInfo([]);
    setText('');
  };

  return (
    <div className="bg-white p-6 border-l border-gray-200 h-full flex flex-col">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{t({ 'zh-HK': '智能助手', 'zh-CN': '智能助手', 'en': 'Smart Assistant' })}</h3>
      
      <FormAnalyzer onFormAnalyzed={onFormAnalyzed} />
      
      <div className="border-t pt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t({ 'zh-HK': '自然語言輸入 (用於填充)', 'zh-CN': '自然语言输��� (用于填充)', 'en': 'Natural Language Input (for filling)' })}
        </label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          rows={6}
          placeholder={t({ 'zh-HK': '请描述您的信息，如：我儿子叫张伟...', 'zh-CN': '请描述您的信息，如：我儿子叫张伟...', 'en': 'Describe your info, e.g., My son is John Doe...' })}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
        />
        <button
          onClick={handleExtract}
          disabled={isLoading || !text}
          className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200 shadow-md disabled:bg-gray-400"
        >
          {isLoading ? t({ 'zh-HK': '提取中...', 'zh-CN': '提取中...', 'en': 'Extracting...' }) : t({ 'zh-HK': 'AI 提取信息用於填充', 'zh-CN': 'AI 提取信息用于填充', 'en': 'Extract Info to Fill' })}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {extractedInfo.length > 0 && (
        <div className="flex-grow mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="text-lg font-semibold text-blue-800 mb-3">
            {t({ 'zh-HK': '提取信息', 'zh-CN': '提取信息', 'en': 'Extracted Info' })}
          </h4>
          <div className="space-y-2">
            {extractedInfo.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm text-blue-700">
                <span>{item.label}:</span>
                <span className="font-medium">{String(item.value)}</span>
              </div>
            ))}
          </div>
          <button
            onClick={handleFillClick}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-200 shadow-md"
          >
            {t({ 'zh-HK': '自動填充', 'zh-CN': '自动填充', 'en': 'Auto-Fill' })}
          </button>
        </div>
      )}
    </div>
  );
};

export default SmartAssistant;


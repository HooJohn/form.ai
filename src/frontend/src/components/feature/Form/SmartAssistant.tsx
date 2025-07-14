import React, { useState } from 'react';
import { ExtractedInfoItem } from '@common/types';
import * as aiService from '../../../services/ai.service';
import { useLanguage } from '../../../contexts/LanguageContext';

interface SmartAssistantProps {
  onAutoFill: (extractedInfo: ExtractedInfoItem[]) => void;
  onAnalyzeForm: (file: File) => Promise<void>;
  isAnalyzing: boolean;
  analysisError: string | null;
}

const FormAnalyzer = ({ onAnalyzeForm, isAnalyzing, analysisError }: { 
  onAnalyzeForm: (file: File) => Promise<void>;
  isAnalyzing: boolean;
  analysisError: string | null;
}) => {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyzeClick = () => {
    if (file) {
      onAnalyzeForm(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-text-secondary mb-2">
        {t({ 'zh-HK': '上傳表格以自動識別字段', 'zh-CN': '上传表格以自动识别字段', 'en': 'Upload Form to Auto-Detect Fields' })}
      </label>
      <input 
        type="file" 
        onChange={handleFileChange} 
        className="w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 disabled:opacity-50"
        accept="image/png, image/jpeg, application/pdf"
        disabled={isAnalyzing}
      />
      <button
        onClick={handleAnalyzeClick}
        disabled={isAnalyzing || !file}
        className="mt-3 w-full flex items-center justify-center bg-secondary text-white py-2.5 rounded-lg font-semibold hover:bg-secondary-dark transition duration-200 shadow-md disabled:bg-gray-400"
      >
        {isAnalyzing && (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {isAnalyzing ? t({ 'zh-HK': '分析中...', 'zh-CN': '分析中...', 'en': 'Analyzing...' }) : t({ 'zh-HK': 'AI 分析表單', 'zh-CN': 'AI 分析表单', 'en': 'Analyze Form with AI' })}
      </button>
      {isAnalyzing && (
        <p className="text-xs text-text-secondary text-center mt-2">
          {t({ 'zh-HK': '首次分析可能需要幾分鐘，請稍候。', 'zh-CN': '首次分析可能需要几分钟，请稍候。', 'en': 'First-time analysis may take a few minutes.' })}
        </p>
      )}
      {analysisError && <p className="text-red-500 text-sm mt-2">{analysisError}</p>}
    </div>
  );
};


const SmartAssistant = ({ onAutoFill, onAnalyzeForm, isAnalyzing, analysisError }: SmartAssistantProps) => {
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
    <div className="bg-white p-6 h-full flex flex-col">
      <h3 className="text-xl font-semibold text-text-primary mb-4">{t({ 'zh-HK': '智能助手', 'zh-CN': '智能助手', 'en': 'Smart Assistant' })}</h3>
      
      <FormAnalyzer 
        onAnalyzeForm={onAnalyzeForm}
        isAnalyzing={isAnalyzing}
        analysisError={analysisError}
      />
      
      <div className="border-t border-secondary/10 pt-4">
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {t({ 'zh-HK': '自然語言輸入 (用於填充)', 'zh-CN': '自然语言输入 (用于填充)', 'en': 'Natural Language Input (for filling)' })}
        </label>
        <textarea
          className="w-full p-3 border border-secondary/30 rounded-lg focus:ring-primary focus:border-primary"
          rows={6}
          placeholder={t({ 'zh-HK': '请描述您的信息，如：我儿子叫张伟...', 'zh-CN': '请描述您的信息，如：我儿子叫张伟...', 'en': 'Describe your info, e.g., My son is John Doe...' })}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
        />
        <button
          onClick={handleExtract}
          disabled={isLoading || !text}
          className="mt-3 w-full bg-secondary text-white py-2.5 rounded-lg font-semibold hover:bg-secondary-dark transition duration-200 shadow-md disabled:bg-gray-400"
        >
          {isLoading ? t({ 'zh-HK': '提取中...', 'zh-CN': '提取中...', 'en': 'Extracting...' }) : t({ 'zh-HK': 'AI 提取信息用於填充', 'zh-CN': 'AI 提取信息用于填充', 'en': 'Extract Info to Fill' })}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm my-4">{error}</p>}

      {extractedInfo.length > 0 && (
        <div className="flex-grow mt-4 p-4 bg-accent rounded-lg border border-secondary/10">
          <h4 className="text-lg font-semibold text-text-primary mb-3">
            {t({ 'zh-HK': '提取信息', 'zh-CN': '提取信息', 'en': 'Extracted Info' })}
          </h4>
          <div className="space-y-2">
            {extractedInfo.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm text-text-secondary">
                <span>{item.label}:</span>
                <span className="font-medium text-text-primary">{String(item.value)}</span>
              </div>
            ))}
          </div>
          <button
            onClick={handleFillClick}
            className="mt-4 w-full bg-accent-green text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-200 shadow-md"
          >
            {t({ 'zh-HK': '自動填充', 'zh-CN': '自动填充', 'en': 'Auto-Fill' })}
          </button>
        </div>
      )}
    </div>
  );
};

export default SmartAssistant;


import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { uploadFile } from '../../services/file.service';
import { LocalizedString } from '../../common/types';

interface SignatureFieldProps {
  onUploadSuccess: (filePath: string) => void;
  fieldId: string;
  t: (key: LocalizedString) => string;
}

const SignatureField: React.FC<SignatureFieldProps> = ({ onUploadSuccess, fieldId, t }) => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const clear = () => {
    sigCanvas.current?.clear();
  };

  const save = async () => {
    if (sigCanvas.current?.isEmpty()) {
      setError(t({ 'zh-HK': '請先簽名', 'zh-CN': '请先签名', 'en': 'Please provide a signature first.' }));
      return;
    }

    setIsUploading(true);
    setError(null);

    const dataURL = sigCanvas.current?.getTrimmedCanvas().toDataURL('image/png');
    if (dataURL) {
      try {
        const blob = await (await fetch(dataURL)).blob();
        const file = new File([blob], 'signature.png', { type: 'image/png' });
        const result = await uploadFile(file);
        onUploadSuccess(result.filePath);
      } catch (err) {
        setError(err instanceof Error ? err.message : t({ 'zh-HK': '上傳失敗', 'zh-CN': '上传失败', 'en': 'Upload failed' }));
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-2">
        {t({ 'zh-HK': '請在下方簽名', 'zh-CN': '请在下方签名', 'en': 'Please sign below' })}
      </label>
      <div id={fieldId} className="bg-gray-100 border border-gray-300 rounded-md">
        <SignatureCanvas
          ref={sigCanvas}
          penColor='black'
          canvasProps={{ className: 'w-full h-40' }}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <div className="mt-4 space-x-4">
        <button onClick={clear} className="px-4 py-2 bg-gray-300 text-black rounded-md">
          {t({ 'zh-HK': '清除', 'zh-CN': '清除', 'en': 'Clear' })}
        </button>
        <button onClick={save} disabled={isUploading} className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400">
          {isUploading ? t({ 'zh-HK': '儲存中...', 'zh-CN': '保存中...', 'en': 'Saving...' }) : t({ 'zh-HK': '儲存簽名', 'zh-CN': '保存签名', 'en': 'Save Signature' })}
        </button>
      </div>
    </div>
  );
};

export default SignatureField;

import React, { useState, useRef } from 'react';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { uploadFile } from '../../services/file.service';
import { LocalizedString } from '../../common/types';

interface ImageUploadFieldProps {
  onUploadSuccess: (filePath: string) => void;
  fieldId: string;
  targetWidth?: number;
  targetHeight?: number;
  t: (key: LocalizedString) => string;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ 
  onUploadSuccess, 
  fieldId, 
  targetWidth, 
  targetHeight,
  t
}) => {
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const aspect = targetWidth && targetHeight ? targetWidth / targetHeight : undefined;

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Reset crop on new image
      const reader = new FileReader();
      reader.addEventListener('load', () => setSrc(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getResizedCanvas = (image: HTMLImageElement, crop: Crop, width: number, height: number): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      width,
      height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }
        resolve(blob);
      }, 'image/png');
    });
  }

  const handleUpload = async () => {
    if (completedCrop && imgRef.current) {
      setIsUploading(true);
      setError(null);
      try {
        const finalWidth = targetWidth || completedCrop.width;
        const finalHeight = targetHeight || completedCrop.height;

        const resizedImageBlob = await getResizedCanvas(imgRef.current, completedCrop, finalWidth, finalHeight);
        const imageFile = new File([resizedImageBlob], 'resized_image.png', { type: 'image/png' });
        
        const result = await uploadFile(imageFile);
        onUploadSuccess(result.filePath);
        setSrc(null); // Reset after upload
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed');
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="mb-2">
        <label htmlFor={fieldId} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer">
          {t({ 'zh-HK': '選擇圖片', 'zh-CN': '选择图片', 'en': 'Select Image' })}
        </label>
        <input id={fieldId} type="file" accept="image/*" onChange={onSelectFile} className="hidden"/>
        {targetWidth && targetHeight && <p className="text-xs text-gray-500 mt-1">{t({ 'zh-HK': `建議尺寸: ${targetWidth} x ${targetHeight}px`, 'zh-CN': `建议尺寸: ${targetWidth} x ${targetHeight}px`, 'en': `Recommended size: ${targetWidth} x ${targetHeight}px` })}</p>}
      </div>

      {src && (
        <div className="mt-4">
          <ReactCrop 
            crop={crop} 
            onChange={(_, percentCrop) => setCrop(percentCrop)} 
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
          >
            <img ref={imgRef} src={src} alt="Crop preview" style={{ maxHeight: '400px' }} />
          </ReactCrop>
          <button onClick={handleUpload} disabled={isUploading || !completedCrop} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400">
            {isUploading ? t({ 'zh-HK': '上傳中...', 'zh-CN': '上传中...', 'en': 'Uploading...' }) : t({ 'zh-HK': '裁剪並上傳', 'zh-CN': '裁剪并上传', 'en': 'Crop & Upload' })}
          </button>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default ImageUploadField;
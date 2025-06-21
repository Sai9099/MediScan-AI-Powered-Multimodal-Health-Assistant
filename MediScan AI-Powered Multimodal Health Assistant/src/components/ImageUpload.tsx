import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
  selectedImage: File | null;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, selectedImage }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageSelect(file);
    }
  };

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  React.useEffect(() => {
    if (selectedImage && !previewUrl) {
      const url = URL.createObjectURL(selectedImage);
      setPreviewUrl(url);
    }
  }, [selectedImage, previewUrl]);

  if (previewUrl) {
    return (
      <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <ImageIcon className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-gray-900">Uploaded Image</span>
          </div>
          <button
            onClick={handleRemoveImage}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        
        <div className="relative">
          <img
            src={previewUrl}
            alt="Uploaded symptom"
            className="w-full h-64 object-cover rounded-lg border border-gray-200"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center opacity-0 hover:opacity-100">
            <button
              onClick={handleRemoveImage}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mt-3 text-center">
          Image uploaded successfully. Our AI will analyze this along with your other inputs.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border-2 border-gray-200">
      <div className="flex items-center space-x-2 mb-4">
        <Camera className="h-5 w-5 text-blue-600" />
        <span className="font-medium text-gray-900">Upload Symptom Image</span>
      </div>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Upload className="h-6 w-6 text-gray-600" />
          </div>
          
          <div>
            <p className="text-gray-900 font-medium">Drop your image here, or click to browse</p>
            <p className="text-sm text-gray-600 mt-1">
              Upload photos of skin conditions, rashes, wounds, or other visible symptoms
            </p>
          </div>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Choose File
          </button>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
        className="hidden"
      />
      
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Take clear, well-lit photos focusing on the affected area. 
          Avoid blurry or overly zoomed images for better analysis.
        </p>
      </div>
    </div>
  );
};
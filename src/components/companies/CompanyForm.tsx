// src/components/companies/CompanyForm.tsx
import { useState } from 'react';
import axios from 'axios';
import CompanyFormLayout from './CompanyFormLayout';
import { API_URL } from '@/services/companyService';

type CompanyFormProps = {
  step: number;
  formData: any;
  setFormData: (data: any) => void;
};

const CompanyForm = ({ step, formData, setFormData }: CompanyFormProps) => {
  const [uploading, setUploading] = useState(false);

  const handleChange = async (field: string, value: any) => {
    if (value instanceof FileList || Array.isArray(value)) {
      setUploading(true);
      try {
        const imagePaths = await uploadImage(value);
        const multipleImageFields = ['productsImages', 'servicesImages'];
        if (multipleImageFields.includes(field)) {
          setFormData((prevData) => ({ ...prevData, [field]: imagePaths }));
        } else {
          setFormData((prevData) => ({ ...prevData, [field]: typeof imagePaths === 'string' ? imagePaths : imagePaths[0] }));
        }
      } finally {
        setUploading(false);
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [field]: value }));
    }
  };

  const handleArrayChange = (arrayField: string, index: number, value: any) => {
    setFormData((prevData) => {
      const updatedArray = [...prevData[arrayField]];
      updatedArray[index] = value;
      return {
        ...prevData,
        [arrayField]: updatedArray,
      };
    });
  };

  const handleAddToArray = (arrayField: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [arrayField]: [...prevData[arrayField], '']
    }));
  };

  const handleRemoveFromArray = (arrayField: string, index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      [arrayField]: prevData[arrayField].filter((_: any, i: number) => i !== index)
    }));
  };

  const uploadImage = async (files: FileList | File[]): Promise<string | string[]> => {
    const formData = new FormData();
    const fileArray = Array.isArray(files) ? files : Array.from(files);
    fileArray.forEach(file => formData.append('files', file));

    try {
      const response = await axios.post(`${API_URL}/file/multi`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (fileArray.length === 1) {
        return response.data[0];
      }
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      return fileArray.length === 1 ? '' : [];
    }
  };

  return (
    <CompanyFormLayout
      step={step}
      formData={formData}
      handleChange={handleChange}
      handleArrayChange={handleArrayChange}
      handleAddToArray={handleAddToArray}
      handleRemoveFromArray={handleRemoveFromArray}
    />
  );
}

export default CompanyForm;

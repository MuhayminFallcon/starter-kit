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
        setFormData((prevData) => ({ ...prevData, [field]: imagePaths[0] })); // Handle single file path
      } finally {
        setUploading(false);
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [field]: value }));
    }
  };

  const handleArrayChange = (arrayField: string, index: number, field: string, value: any) => {
    setFormData((prevData) => {
      const newArray = [...prevData[arrayField]];
      newArray[index][field] = value;
      return { ...prevData, [arrayField]: newArray };
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

  const uploadImage = async (files: FileList | File[]): Promise<string[]> => {
    const formData = new FormData();
    const fileArray = Array.isArray(files) ? files : Array.from(files);
    fileArray.forEach((file) => formData.append('files', file));
    try {
      const response = await axios.post(`${API_URL}/file/multi`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data; // Assuming this is an array of image paths or URLs
    } catch (error) {
      console.error('Error uploading image:', error);
      return [];
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

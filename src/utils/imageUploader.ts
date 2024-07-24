// src/utils/imageUploader.ts
import axios from 'axios';
import { API_URL } from '@/services/companyService';

export const uploadImage = async (files: FileList | File[]): Promise<string | string[]> => {
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

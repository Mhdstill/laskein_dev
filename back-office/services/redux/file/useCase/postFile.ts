import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'utils/axios';

export const postFile = createAsyncThunk(
  'File/postFile',
  async (data: { file: any }, thunkAPI) => {
    try {
      const base64String = data.file.split(',')[1];
      const byteCharacters = atob(base64String);
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: 'image/jpeg' });

      const file = new File([blob], 'image.jpg', {
        type: 'image/jpeg',
      });
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(`/upload-file/upload`, formData);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error);
      }
      throw error;
    }
  }
);

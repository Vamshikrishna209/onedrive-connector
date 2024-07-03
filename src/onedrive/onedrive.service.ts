import { Injectable, Req } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OneDriveService {
  async listFiles(@Req() req) {
    const accessToken = req['accessToken'];
    try {
      const response = await axios.get('https://graph.microsoft.com/v1.0/me/drive/root/children', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log('List Files Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error listing files:', error.response ? error.response.data : error.message);
      throw new Error('Failed to list files');
    }
  }

  async downloadFile(@Req() req, fileId: string) {
    const accessToken = req['accessToken'];
    try {
      const response = await axios.get(`https://graph.microsoft.com/v1.0/me/drive/items/${fileId}/content`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        responseType: 'arraybuffer',
      });
      console.log('Download File Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error downloading file:', error.response ? error.response.data : error.message);
      throw new Error('Failed to download file');
    }
  }

  async listUsers(@Req() req, fileId: string) {
    const accessToken = req['accessToken'];
    try {
      const response = await axios.get(`https://graph.microsoft.com/v1.0/me/drive/items/${fileId}/permissions`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log('List Users Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error listing users:', error.response ? error.response.data : error.message);
      throw new Error('Failed to list users');
    }
  }
}

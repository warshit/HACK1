import React, { useState } from 'react';
import axios from 'axios';

// Adjust the backend URL based on your environment (local vs deployed)
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:5000' : 'https://your-deployed-backend-url';

const TranscriptionUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobId, setJobId] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      alert('Please select a file before uploading.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setJobId(response.data.id);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('File upload failed.');
    }
  };

  const checkStatus = async () => {
    if (!jobId) return;
    try {
      const response = await axios.get(`${API_BASE_URL}/status/${jobId}`);
      setStatus(response.data.status);
    } catch (error) {
      console.error('Error checking status:', error);
      alert('Status check failed.');
    }
  };

  const getResult = async () => {
    if (!jobId) return;
    try {
      const response = await axios.get(`${API_BASE_URL}/result/${jobId}`);
      setResult(response.data.text);
    } catch (error) {
      console.error('Error fetching result:', error);
      alert('Failed to get transcription result.');
    }
  };

  return (
    <div>
      <h2>Transcription Uploader</h2>
      <input type="file" accept="audio/*,video/*" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload File</button>
      {jobId && (
        <div>
          <p>Job ID: {jobId}</p>
          <button onClick={checkStatus}>Check Status</button>
          <button onClick={getResult}>Get Result</button>
          {status && <p>Status: {status}</p>}
          {result && <p>Transcription: {result}</p>}
        </div>
      )}
    </div>
  );
};

export default TranscriptionUploader;
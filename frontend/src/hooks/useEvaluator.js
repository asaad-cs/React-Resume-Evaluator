import { useState } from 'react';
import client from '../api/client';

export function useEvaluator() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const evaluate = async (jobDescription, prompt = '', resumeFile) => {
    setLoading(true);
    setError('');
    setResult('');
    try {
      const formData = new FormData();
      formData.append('job_description', jobDescription);
      formData.append('prompt', prompt);
      formData.append('resume', resumeFile);

      // Do NOT set Content-Type — axios sets it automatically with
      // the correct multipart boundary when given a FormData object.
      const res = await client.post('/evaluate/', formData);
      setResult(res.data.result);
    } catch (err) {
      setError(err.response?.data?.detail || 'Evaluation failed. Are you logged in?');
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, evaluate };
}

import axios from 'axios';
import { Report, Feedback, ReportFilters } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getReports = async (filters?: ReportFilters): Promise<Report[]> => {
  const response = await api.get('/reports', { params: filters });
  return response.data;
};

export const getReport = async (id: string): Promise<Report> => {
  const response = await api.get(`/reports/${id}`);
  return response.data;
};

export const getReportTypes = async (): Promise<string[]> => {
  const response = await api.get('/reports/types/all');
  return response.data;
};

export const getIndustries = async (): Promise<string[]> => {
  const response = await api.get('/reports/industries/all');
  return response.data;
};

export const submitFeedback = async (feedback: Feedback): Promise<Feedback> => {
  const response = await api.post('/feedback', feedback);
  return response.data;
};

export default {
  getReports,
  getReport,
  getReportTypes,
  getIndustries,
  submitFeedback,
}; 
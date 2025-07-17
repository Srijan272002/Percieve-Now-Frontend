// Report types
export interface Report {
  id: string;
  title: string;
  reportType: ReportType;
  confidenceScore: number;
  industry: Industry;
  summary: string;
  createdAt: string;
  sources: Source[];
}

export type ReportType = 
  | 'Market Analysis'
  | 'Company Profile'
  | 'Competitive Analysis'
  | 'Investment Opportunity'
  | 'Risk Assessment'
  | 'Trend Forecast';

export type Industry = 
  | 'Technology'
  | 'Healthcare'
  | 'Finance'
  | 'Retail'
  | 'Manufacturing'
  | 'Energy'
  | 'Education';

export interface Source {
  id: string;
  type: SourceType;
  title: string;
  description: string;
  reliability: number; // 0-100
  url?: string;
}

export type SourceType = 
  | 'Research Paper'
  | 'News Article'
  | 'Expert Interview'
  | 'Financial Report'
  | 'Market Data'
  | 'Internal Analysis';

// Feedback types
export interface Feedback {
  id?: string;
  reportId: string;
  userComment: string;
  flaggedSection?: string;
  createdAt?: string;
}

// Filter types
export interface ReportFilters {
  reportType?: string;
  industry?: string;
  confidenceScoreMin?: number;
  confidenceScoreMax?: number;
} 
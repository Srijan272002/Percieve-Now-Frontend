import { useState, useEffect } from 'react';
import { getReports, getReportTypes, getIndustries } from '../api/api';
import { Report, ReportFilters } from '../types';
import ReportCard from './ReportCard.tsx';
import ReportDetail from './ReportDetail.tsx';
import FilterPanel from './FilterPanel.tsx';

const ReportList = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reportTypes, setReportTypes] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [filters, setFilters] = useState<ReportFilters>({
    confidenceScoreMin: 0,
    confidenceScoreMax: 100,
  });

  // Fetch reports
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getReports(filters);
        setReports(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch reports. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  // Fetch report types and industries
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [typesData, industriesData] = await Promise.all([
          getReportTypes(),
          getIndustries(),
        ]);
        setReportTypes(typesData);
        setIndustries(industriesData);
      } catch (err) {
        console.error('Failed to fetch filter options:', err);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleReportClick = (report: Report) => {
    setSelectedReport(report);
  };

  const handleCloseDetail = () => {
    setSelectedReport(null);
  };

  const handleFilterChange = (newFilters: ReportFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
        Intelligence Reports
      </h2>

      {/* Filter Panel */}
      <FilterPanel
        reportTypes={reportTypes}
        industries={industries}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Report List */}
      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-perceive-purple"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <p>{error}</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
            <p>No reports found matching your filters.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onClick={() => handleReportClick(report)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Report Detail Slide-out */}
      {selectedReport && (
        <ReportDetail report={selectedReport} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default ReportList; 
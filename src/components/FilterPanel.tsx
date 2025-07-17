import { useState, useEffect } from 'react';
import { ReportFilters } from '../types';

interface FilterPanelProps {
  reportTypes: string[];
  industries: string[];
  filters: ReportFilters;
  onFilterChange: (filters: ReportFilters) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  reportTypes,
  industries,
  filters,
  onFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<ReportFilters>(filters);

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = e.target.type === 'number' ? Number(value) : value;
    
    setLocalFilters({
      ...localFilters,
      [name]: newValue,
    });
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      reportType: undefined,
      industry: undefined,
      confidenceScoreMin: 0,
      confidenceScoreMax: 100,
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  // Get confidence score values with defaults
  const minScore = filters.confidenceScoreMin ?? 0;
  const maxScore = filters.confidenceScoreMax ?? 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Filter Reports
        </h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {isOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {isOpen && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Report Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Report Type
              </label>
              <select
                name="reportType"
                value={localFilters.reportType || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All Types</option>
                {reportTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Industry Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Industry
              </label>
              <select
                name="industry"
                value={localFilters.industry || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All Industries</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            {/* Confidence Score Min Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Min Confidence Score
              </label>
              <input
                type="number"
                name="confidenceScoreMin"
                min="0"
                max="100"
                value={localFilters.confidenceScoreMin ?? 0}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Confidence Score Max Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Max Confidence Score
              </label>
              <input
                type="number"
                name="confidenceScoreMax"
                min="0"
                max="100"
                value={localFilters.confidenceScoreMax ?? 100}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 text-sm bg-perceive-purple text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      <div className="flex flex-wrap gap-2 mt-2">
        {filters.reportType && (
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Type: {filters.reportType}
            <button
              onClick={() => onFilterChange({ ...filters, reportType: undefined })}
              className="ml-1 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
            >
              ✕
            </button>
          </div>
        )}
        {filters.industry && (
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Industry: {filters.industry}
            <button
              onClick={() => onFilterChange({ ...filters, industry: undefined })}
              className="ml-1 text-green-600 dark:text-green-300 hover:text-green-800 dark:hover:text-green-100"
            >
              ✕
            </button>
          </div>
        )}
        {(minScore > 0 || maxScore < 100) && (
          <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            Confidence: {minScore}% - {maxScore}%
            <button
              onClick={() =>
                onFilterChange({ ...filters, confidenceScoreMin: 0, confidenceScoreMax: 100 })
              }
              className="ml-1 text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-100"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel; 
import { Report } from '../types';
import ConfidenceBadge from './ConfidenceBadge';

interface ReportCardProps {
  report: Report;
  onClick: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, onClick }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {report.reportType}
          </span>
          <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
            {report.industry}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
          {report.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {report.summary}
        </p>
        <div className="flex justify-between items-center">
          <ConfidenceBadge score={report.confidenceScore} />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(report.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportCard; 
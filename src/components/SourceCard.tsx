import { useState } from 'react';
import { Source } from '../types';
import { motion } from 'framer-motion';

interface SourceCardProps {
  source: Source;
}

const SourceCard: React.FC<SourceCardProps> = ({ source }) => {
  const [expanded, setExpanded] = useState(false);

  // Get reliability color
  const getReliabilityColor = () => {
    if (source.reliability >= 90) return 'bg-green-500';
    if (source.reliability >= 80) return 'bg-green-400';
    if (source.reliability >= 70) return 'bg-yellow-400';
    if (source.reliability >= 60) return 'bg-yellow-500';
    if (source.reliability >= 50) return 'bg-orange-400';
    return 'bg-red-500';
  };

  // Get source type icon
  const getSourceTypeIcon = () => {
    switch (source.type) {
      case 'Research Paper':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      case 'News Article':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        );
      case 'Expert Interview':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        );
      case 'Financial Report':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      case 'Market Data':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={`border rounded-lg overflow-hidden ${
        expanded ? 'border-perceive-purple dark:border-perceive-gold' : 'border-gray-200 dark:border-gray-700'
      }`}
    >
      <div
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3 text-gray-500 dark:text-gray-400">
            {getSourceTypeIcon()}
          </div>
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white">{source.title}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{source.type}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-3 text-right">
            <div className="text-sm font-medium">Reliability</div>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${getReliabilityColor()} mr-1`}></div>
              <span className="font-medium">{source.reliability}%</span>
            </div>
          </div>
          <svg
            className={`w-5 h-5 transform transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {expanded && (
        <motion.div
          className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-700 dark:text-gray-300 mb-3">{source.description}</p>
          {source.url && (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-perceive-purple dark:text-perceive-gold hover:underline text-sm inline-flex items-center"
            >
              View Source
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default SourceCard; 
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Report, Feedback } from '../types';
import { submitFeedback } from '../api/api';
import ConfidenceMeter from './ConfidenceMeter.tsx';
import SourceCard from './SourceCard.tsx';

interface ReportDetailProps {
  report: Report;
  onClose: () => void;
}

const ReportDetail: React.FC<ReportDetailProps> = ({ report, onClose }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'trust' | 'feedback'>('summary');
  const [feedback, setFeedback] = useState<Partial<Feedback>>({
    reportId: report.id,
    userComment: '',
    flaggedSection: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.userComment) return;

    try {
      setSubmitting(true);
      setSubmitError(null);
      await submitFeedback(feedback as Feedback);
      setSubmitSuccess(true);
      setFeedback({
        ...feedback,
        userComment: '',
        flaggedSection: '',
      });
    } catch (err) {
      setSubmitError('Failed to submit feedback. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-2xl bg-white dark:bg-gray-800 h-full overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white truncate">
              {report.title}
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === 'summary'
                  ? 'text-perceive-purple dark:text-perceive-gold border-b-2 border-perceive-purple dark:border-perceive-gold'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === 'trust'
                  ? 'text-perceive-purple dark:text-perceive-gold border-b-2 border-perceive-purple dark:border-perceive-gold'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('trust')}
            >
              Why We Trust This
            </button>
            <button
              className={`flex-1 py-3 text-center font-medium ${
                activeTab === 'feedback'
                  ? 'text-perceive-purple dark:text-perceive-gold border-b-2 border-perceive-purple dark:border-perceive-gold'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('feedback')}
            >
              Feedback
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Summary Tab */}
          {activeTab === 'summary' && (
            <div>
              <div className="flex flex-wrap justify-between mb-6">
                <div className="mb-4 mr-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Report Type</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{report.reportType}</p>
                </div>
                <div className="mb-4 mr-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Industry</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{report.industry}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {formatDate(report.createdAt)}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <ConfidenceMeter score={report.confidenceScore} />
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Summary</h3>
                <p className="text-gray-800 dark:text-gray-200">{report.summary}</p>
              </div>
            </div>
          )}

          {/* Trust Tab */}
          {activeTab === 'trust' && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Source Reliability</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                This report is based on {report.sources.length} sources with varying levels of reliability.
              </p>

              <div className="space-y-4">
                {report.sources.map((source) => (
                  <SourceCard key={source.id} source={source} />
                ))}
              </div>
            </div>
          )}

          {/* Feedback Tab */}
          {activeTab === 'feedback' && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Submit Feedback</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Help us improve our reports by providing feedback. Your input is valuable to us.
              </p>

              {submitSuccess ? (
                <div className="bg-green-100 dark:bg-green-900 p-4 rounded-md mb-6">
                  <p className="text-green-800 dark:text-green-200">
                    Thank you for your feedback! It has been submitted successfully.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit}>
                  {submitError && (
                    <div className="bg-red-100 dark:bg-red-900 p-4 rounded-md mb-4">
                      <p className="text-red-800 dark:text-red-200">{submitError}</p>
                    </div>
                  )}

                  <div className="mb-4">
                    <label
                      htmlFor="flaggedSection"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Section to Flag (Optional)
                    </label>
                    <input
                      type="text"
                      id="flaggedSection"
                      name="flaggedSection"
                      value={feedback.flaggedSection || ''}
                      onChange={handleFeedbackChange}
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="E.g., 'Market share statistics' or 'Competitor analysis'"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="userComment"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Feedback*
                    </label>
                    <textarea
                      id="userComment"
                      name="userComment"
                      value={feedback.userComment || ''}
                      onChange={handleFeedbackChange}
                      rows={4}
                      required
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Please provide your feedback or suggestions..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || !feedback.userComment}
                    className={`px-4 py-2 rounded-md text-white ${
                      submitting || !feedback.userComment
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-perceive-purple hover:bg-opacity-90'
                    }`}
                  >
                    {submitting ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReportDetail; 
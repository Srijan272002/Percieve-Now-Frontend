import { motion } from 'framer-motion';

interface ConfidenceMeterProps {
  score: number;
}

const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({ score }) => {
  // Determine color based on confidence score
  const getColor = () => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 50) return 'text-orange-400';
    return 'text-red-500';
  };

  // Determine background gradient
  const getGradient = () => {
    if (score >= 90) return 'from-green-500 to-green-300';
    if (score >= 80) return 'from-green-400 to-green-200';
    if (score >= 70) return 'from-yellow-400 to-yellow-200';
    if (score >= 60) return 'from-yellow-500 to-yellow-300';
    if (score >= 50) return 'from-orange-400 to-orange-200';
    return 'from-red-500 to-red-300';
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Confidence Score</h3>
      <div className="flex items-center mb-2">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 mr-4">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${getGradient()}`}
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <div className={`text-2xl font-bold ${getColor()}`}>{score}%</div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Low Confidence</span>
        <span>Medium Confidence</span>
        <span>High Confidence</span>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {score >= 80
          ? 'High confidence: This report is based on reliable sources and strong evidence.'
          : score >= 60
          ? 'Medium confidence: This report is based on credible sources, but some data points may have limitations.'
          : 'Low confidence: This report is based on limited sources or contains uncertain information.'}
      </p>
    </div>
  );
};

export default ConfidenceMeter; 
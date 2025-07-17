import { motion } from 'framer-motion';

interface ConfidenceBadgeProps {
  score: number;
}

const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ score }) => {
  // Determine color based on confidence score
  const getColor = () => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-green-400';
    if (score >= 70) return 'bg-yellow-400';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 50) return 'bg-orange-400';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center">
      <span className="text-sm font-medium mr-2">Confidence:</span>
      <div className="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${getColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <span className="ml-2 text-sm font-medium">{score}%</span>
    </div>
  );
};

export default ConfidenceBadge; 
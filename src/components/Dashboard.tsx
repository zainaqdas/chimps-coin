import React from 'react';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface DashboardProps {
  balance: number;
  nextClaimTime: number;
  currentAPR: number;
  pendingRewards: number;
  onClaim: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  balance,
  nextClaimTime,
  currentAPR,
  pendingRewards,
  onClaim
}) => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      if (nextClaimTime > now) {
        setTimeLeft(formatDistanceToNow(nextClaimTime, { addSuffix: true }));
        setProgress(((nextClaimTime - now) / (3 * 60 * 60 * 1000)) * 100);
      } else {
        setTimeLeft('Ready to claim!');
        setProgress(100);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [nextClaimTime]);

  return (
    <div className="space-y-6">
      {/* Farming Stats */}
      <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-xl font-bold mb-4">Farming Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400">Current APR</p>
            <p className="text-2xl font-bold">{currentAPR.toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-gray-400">Total Balance</p>
            <p className="text-2xl font-bold">{balance.toLocaleString()} CHIMPS</p>
          </div>
        </div>
      </div>

      {/* Claim Section */}
      <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Pending Rewards</h3>
          <p className="text-xl font-bold">{pendingRewards.toFixed(2)} CHIMPS</p>
        </div>

        {/* Progress Bar */}
        <div className="h-4 bg-gray-700 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${100 - progress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-gray-400 mb-4">
          <span>{timeLeft}</span>
          <span>Next claim</span>
        </div>

        <button
          onClick={onClaim}
          disabled={nextClaimTime > Date.now()}
          className={`w-full py-3 px-4 rounded-lg font-bold ${
            nextClaimTime > Date.now()
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          Claim Rewards
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
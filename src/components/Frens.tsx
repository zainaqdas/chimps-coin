import React from 'react';
import { Share2 } from 'lucide-react';

const Frens: React.FC = () => {
  const referralCode = 'CHIMP123'; // This would normally come from the user's data
  const referralLink = `https://t.me/yourbot?start=${referralCode}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    // You could add a toast notification here
  };

  return (
    <div className="space-y-6">
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Invite Frens</h2>
        <p className="text-gray-300 mb-6">
          Earn 200 CHIMPS for each friend who joins using your referral link!
        </p>
        
        <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-400 mb-2">Your Referral Link</p>
          <div className="flex items-center justify-between">
            <code className="text-sm">{referralLink}</code>
            <button
              onClick={copyToClipboard}
              className="ml-2 p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-gray-400">Total Referrals</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-2xl font-bold">0 CHIMPS</p>
            <p className="text-sm text-gray-400">Total Earned</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frens;
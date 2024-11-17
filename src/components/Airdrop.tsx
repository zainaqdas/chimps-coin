import React from 'react';
import { Sparkles } from 'lucide-react';

const Airdrop: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <Sparkles size={48} className="text-blue-400 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Airdrop Coming Soon!</h2>
      <p className="text-gray-400">
        Stay tuned for exclusive CHIMPS token airdrops. Make sure to complete all tasks and invite frens to increase your chances!
      </p>
    </div>
  );
};

export default Airdrop;
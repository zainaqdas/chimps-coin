import React from 'react';
import { useState, useEffect } from 'react';
import { Home, Users, Gift, Layout } from 'lucide-react';
import StarryBackground from './components/StarryBackground';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
import Frens from './components/Frens';
import Airdrop from './components/Airdrop';
import { useGameState } from './hooks/useGameState';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { 
    balance, 
    username, 
    nextClaimTime, 
    currentAPR,
    pendingRewards,
    initializeUser,
    claimRewards
  } = useGameState();

  useEffect(() => {
    initializeUser();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard 
          balance={balance}
          nextClaimTime={nextClaimTime}
          currentAPR={currentAPR}
          pendingRewards={pendingRewards}
          onClaim={claimRewards}
        />;
      case 'tasks':
        return <Tasks />;
      case 'frens':
        return <Frens />;
      case 'airdrop':
        return <Airdrop />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <StarryBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="p-4 bg-black/30 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{username}</h2>
              <p className="text-sm text-gray-300">Welcome back!</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{balance.toLocaleString()}</p>
              <p className="text-sm text-gray-300">CHIMPS</p>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 max-w-2xl mx-auto">
          {renderContent()}
        </main>

        {/* Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm">
          <div className="flex justify-around p-4 max-w-2xl mx-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex flex-col items-center ${
                activeTab === 'dashboard' ? 'text-blue-400' : 'text-gray-400'
              }`}
            >
              <Home size={24} />
              <span className="text-xs mt-1">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex flex-col items-center ${
                activeTab === 'tasks' ? 'text-blue-400' : 'text-gray-400'
              }`}
            >
              <Layout size={24} />
              <span className="text-xs mt-1">Tasks</span>
            </button>
            <button
              onClick={() => setActiveTab('frens')}
              className={`flex flex-col items-center ${
                activeTab === 'frens' ? 'text-blue-400' : 'text-gray-400'
              }`}
            >
              <Users size={24} />
              <span className="text-xs mt-1">Frens</span>
            </button>
            <button
              onClick={() => setActiveTab('airdrop')}
              className={`flex flex-col items-center ${
                activeTab === 'airdrop' ? 'text-blue-400' : 'text-gray-400'
              }`}
            >
              <Gift size={24} />
              <span className="text-xs mt-1">Airdrop</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;
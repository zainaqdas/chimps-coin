import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const Tasks: React.FC = () => {
  const tasks = [
    { id: 1, title: 'Join our Telegram group', reward: 100, completed: false },
    { id: 2, title: 'Follow us on Twitter', reward: 150, completed: false },
    { id: 3, title: 'Share with 3 friends', reward: 200, completed: false },
    { id: 4, title: 'Complete KYC', reward: 500, completed: false },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-6">Complete Tasks to Earn CHIMPS</h2>
      
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-black/30 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              {task.completed ? (
                <CheckCircle2 className="text-green-500" />
              ) : (
                <Circle className="text-gray-400" />
              )}
              <span>{task.title}</span>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-400">Reward</span>
              <p className="font-bold">{task.reward} CHIMPS</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'chimpsGameState';
const INITIAL_BALANCE = 1000;
const BASE_APR = 100; // 100% annual APR
const CLAIM_COOLDOWN = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

interface GameState {
  balance: number;
  username: string;
  lastClaimTime: number;
  referralCount: number;
  completedTasks: number[];
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    balance: INITIAL_BALANCE,
    username: 'Telegram User',
    lastClaimTime: Date.now(),
    referralCount: 0,
    completedTasks: [],
  });

  // Calculate current APR based on balance
  const calculateAPR = (balance: number) => {
    // APR increases with balance but has diminishing returns
    return BASE_APR * (1 + Math.log10(balance / INITIAL_BALANCE + 1));
  };

  // Calculate pending rewards
  const calculatePendingRewards = () => {
    const now = Date.now();
    const timeElapsed = (now - gameState.lastClaimTime) / (365 * 24 * 60 * 60 * 1000); // in years
    const apr = calculateAPR(gameState.balance);
    return gameState.balance * (apr / 100) * timeElapsed;
  };

  // Initialize user data
  const initializeUser = () => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      setGameState(JSON.parse(savedState));
    }
  };

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  // Claim rewards
  const claimRewards = () => {
    const now = Date.now();
    if (now - gameState.lastClaimTime >= CLAIM_COOLDOWN) {
      const rewards = calculatePendingRewards();
      setGameState(prev => ({
        ...prev,
        balance: prev.balance + rewards,
        lastClaimTime: now,
      }));
    }
  };

  return {
    balance: gameState.balance,
    username: gameState.username,
    nextClaimTime: gameState.lastClaimTime + CLAIM_COOLDOWN,
    currentAPR: calculateAPR(gameState.balance),
    pendingRewards: calculatePendingRewards(),
    initializeUser,
    claimRewards,
  };
};
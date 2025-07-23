export interface User {
  id: number;
  firstName: string;
  lastName: string;
  photo?: string;
}

export interface Challenge {
  id: number;
  day: number;
  question: string;
  category: 'self-reflection' | 'emotions' | 'relationships' | 'goals' | 'gratitude';
  completed: boolean;
  answer?: string;
  completedAt?: Date;
}

export interface TreeProgress {
  level: number;
  experience: number;
  streak: number;
  totalChallenges: number;
  completedChallenges: number;
  lastActivity: Date;
  treeType: 'birch' | 'pine' | 'sakura' | 'oak';
}

export interface Friend {
  id: number;
  name: string;
  photo?: string;
  treeProgress: TreeProgress;
  canWater: boolean;
  lastWatered?: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
}

export interface GameState {
  user: User | null;
  currentChallenge: Challenge | null;
  treeProgress: TreeProgress;
  friends: Friend[];
  badges: Badge[];
  dailyChallenges: Challenge[];
  currentDay: number;
}
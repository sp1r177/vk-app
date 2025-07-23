import { useState, useEffect } from 'react';
import { GameState, Challenge, Friend, Badge } from '../types';
import { dailyChallenges } from '../data/challenges';

const defaultBadges: Badge[] = [
  {
    id: 'first-step',
    name: 'Первый шаг',
    description: 'Прошёл первое испытание',
    icon: '🌱',
    earned: false
  },
  {
    id: 'week-warrior',
    name: 'Недельный воин',
    description: '7 дней подряд',
    icon: '🔥',
    earned: false
  },
  {
    id: 'deep-thinker',
    name: 'Глубокий мыслитель',
    description: '5 испытаний самопознания',
    icon: '🧠',
    earned: false
  },
  {
    id: 'heart-opener',
    name: 'Открытое сердце',
    description: '3 испытания об эмоциях',
    icon: '❤️',
    earned: false
  },
  {
    id: 'connector',
    name: 'Связующий',
    description: '5 испытаний об отношениях',
    icon: '🤝',
    earned: false
  },
  {
    id: 'dream-chaser',
    name: 'Ловец мечты',
    description: '3 испытания о целях',
    icon: '⭐',
    earned: false
  },
  {
    id: 'grateful-soul',
    name: 'Благодарная душа',
    description: '3 испытания благодарности',
    icon: '🙏',
    earned: false
  },
  {
    id: 'tree-bloomer',
    name: 'Дерево зацвело',
    description: '15 испытаний пройдено',
    icon: '🌸',
    earned: false
  },
  {
    id: 'month-master',
    name: 'Хозяин месяца',
    description: '30 дней подряд',
    icon: '🏆',
    earned: false
  },
  {
    id: 'fruit-bearer',
    name: 'Плодоносящее дерево',
    description: '25 испытаний пройдено',
    icon: '🍎',
    earned: false
  }
];

const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('tree-of-me-game-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        treeProgress: {
          ...parsed.treeProgress,
          lastActivity: new Date(parsed.treeProgress.lastActivity)
        },
        badges: defaultBadges.map(badge => {
          const savedBadge = parsed.badges?.find((b: Badge) => b.id === badge.id);
          return savedBadge ? { ...badge, ...savedBadge } : badge;
        })
      };
    }

    return {
      user: null,
      currentChallenge: null,
      treeProgress: {
        level: 1,
        experience: 0,
        streak: 0,
        totalChallenges: dailyChallenges.length,
        completedChallenges: 0,
        lastActivity: new Date(),
        treeType: 'oak'
      },
      friends: [],
      badges: defaultBadges,
      dailyChallenges: dailyChallenges.map((challenge, index) => ({
        ...challenge,
        id: index + 1,
        completed: false
      })),
      currentDay: 1
    };
  });

  // Сохранение состояния
  useEffect(() => {
    localStorage.setItem('tree-of-me-game-state', JSON.stringify(gameState));
  }, [gameState]);

  // Получение текущего испытания
  const getCurrentChallenge = (): Challenge | null => {
    const today = new Date();
    const daysSinceStart = Math.floor((today.getTime() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24));
    const challengeIndex = daysSinceStart % dailyChallenges.length;
    
    const challenge = gameState.dailyChallenges[challengeIndex];
    return challenge && !challenge.completed ? challenge : null;
  };

  // Проверка бейджей
  const checkBadges = (newState: GameState): Badge[] => {
    const updatedBadges = [...newState.badges];
    
    // Первый шаг
    if (newState.treeProgress.completedChallenges >= 1 && !updatedBadges.find(b => b.id === 'first-step')?.earned) {
      const badgeIndex = updatedBadges.findIndex(b => b.id === 'first-step');
      if (badgeIndex !== -1) {
        updatedBadges[badgeIndex] = { ...updatedBadges[badgeIndex], earned: true, earnedAt: new Date() };
      }
    }

    // Недельный воин
    if (newState.treeProgress.streak >= 7 && !updatedBadges.find(b => b.id === 'week-warrior')?.earned) {
      const badgeIndex = updatedBadges.findIndex(b => b.id === 'week-warrior');
      if (badgeIndex !== -1) {
        updatedBadges[badgeIndex] = { ...updatedBadges[badgeIndex], earned: true, earnedAt: new Date() };
      }
    }

    // Дерево зацвело
    if (newState.treeProgress.completedChallenges >= 15 && !updatedBadges.find(b => b.id === 'tree-bloomer')?.earned) {
      const badgeIndex = updatedBadges.findIndex(b => b.id === 'tree-bloomer');
      if (badgeIndex !== -1) {
        updatedBadges[badgeIndex] = { ...updatedBadges[badgeIndex], earned: true, earnedAt: new Date() };
      }
    }

    // Хозяин месяца
    if (newState.treeProgress.streak >= 30 && !updatedBadges.find(b => b.id === 'month-master')?.earned) {
      const badgeIndex = updatedBadges.findIndex(b => b.id === 'month-master');
      if (badgeIndex !== -1) {
        updatedBadges[badgeIndex] = { ...updatedBadges[badgeIndex], earned: true, earnedAt: new Date() };
      }
    }

    // Плодоносящее дерево
    if (newState.treeProgress.completedChallenges >= 25 && !updatedBadges.find(b => b.id === 'fruit-bearer')?.earned) {
      const badgeIndex = updatedBadges.findIndex(b => b.id === 'fruit-bearer');
      if (badgeIndex !== -1) {
        updatedBadges[badgeIndex] = { ...updatedBadges[badgeIndex], earned: true, earnedAt: new Date() };
      }
    }

    return updatedBadges;
  };

  // Завершение испытания
  const completeChallenge = (challengeId: number, answer: string) => {
    setGameState(prevState => {
      const updatedChallenges = prevState.dailyChallenges.map(challenge =>
        challenge.id === challengeId
          ? { ...challenge, completed: true, answer, completedAt: new Date() }
          : challenge
      );

      const completedCount = updatedChallenges.filter(c => c.completed).length;
      const newExperience = prevState.treeProgress.experience + 20;
      const newLevel = Math.floor(newExperience / 100) + 1;
      
      // Проверяем стрик
      const today = new Date();
      const lastActivity = new Date(prevState.treeProgress.lastActivity);
      const daysDiff = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
      
      let newStreak = prevState.treeProgress.streak;
      if (daysDiff === 1) {
        newStreak += 1;
      } else if (daysDiff === 0) {
        // Тот же день, стрик не изменяется
      } else {
        newStreak = 1; // Сброс стрика
      }

      const newState: GameState = {
        ...prevState,
        dailyChallenges: updatedChallenges,
        currentChallenge: null,
        treeProgress: {
          ...prevState.treeProgress,
          experience: newExperience,
          level: newLevel,
          completedChallenges: completedCount,
          streak: newStreak,
          lastActivity: today
        }
      };

      // Проверяем бейджи
      newState.badges = checkBadges(newState);

      return newState;
    });
  };

  // Полить дерево друга
  const waterFriend = (friendId: number) => {
    setGameState(prevState => ({
      ...prevState,
      friends: prevState.friends.map(friend =>
        friend.id === friendId
          ? {
              ...friend,
              canWater: false,
              lastWatered: new Date(),
              treeProgress: {
                ...friend.treeProgress,
                experience: friend.treeProgress.experience + 10
              }
            }
          : friend
      )
    }));
  };

  // Добавить друга (демо)
  const addDemoFriend = () => {
    const demoFriends: Friend[] = [
      {
        id: Date.now(),
        name: 'Алексей',
        treeProgress: {
          level: 2,
          experience: 150,
          streak: 5,
          totalChallenges: 35,
          completedChallenges: 8,
          lastActivity: new Date(),
          treeType: 'birch'
        },
        canWater: true
      },
      {
        id: Date.now() + 1,
        name: 'Мария',
        treeProgress: {
          level: 3,
          experience: 220,
          streak: 12,
          totalChallenges: 35,
          completedChallenges: 15,
          lastActivity: new Date(),
          treeType: 'sakura'
        },
        canWater: true
      }
    ];

    setGameState(prevState => ({
      ...prevState,
      friends: [...prevState.friends, ...demoFriends.slice(0, 1)]
    }));
  };

  return {
    gameState,
    getCurrentChallenge,
    completeChallenge,
    waterFriend,
    addDemoFriend,
    setGameState
  };
};

export default useGameState;
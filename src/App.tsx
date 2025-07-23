import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, Award, Calendar } from 'lucide-react';
import TreeVisualization from './components/TreeVisualization';
import DailyChallenge from './components/DailyChallenge';
import FriendGarden from './components/FriendGarden';
import ProgressScreen from './components/ProgressScreen';
import useGameState from './hooks/useGameState';
import { initApp, inviteFriends, shareOnWall, showNotification } from './utils/vkBridge';

type Screen = 'home' | 'challenge' | 'friends' | 'progress';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [showGrowthAnimation, setShowGrowthAnimation] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const {
    gameState,
    getCurrentChallenge,
    completeChallenge,
    waterFriend,
    addDemoFriend
  } = useGameState();

  // Инициализация VK приложения
  useEffect(() => {
    const initialize = async () => {
      const vkUser = await initApp();
      if (vkUser) {
        setUser({
          id: vkUser.id,
          firstName: vkUser.first_name,
          lastName: vkUser.last_name,
          photo: vkUser.photo_200
        });
      }
    };
    
    initialize();
  }, []);

  // Получение текущего испытания
  const currentChallenge = getCurrentChallenge();

  // Обработка ответа на испытание
  const handleChallengeAnswer = (answer: string) => {
    if (currentChallenge) {
      completeChallenge(currentChallenge.id, answer);
      setShowGrowthAnimation(true);
      showNotification('Дерево выросло! 🌱');
      
      // Убираем анимацию через 3 секунды
      setTimeout(() => {
        setShowGrowthAnimation(false);
        setCurrentScreen('home');
      }, 3000);
    }
  };

  // Приглашение друзей
  const handleInviteFriends = async () => {
    try {
      await inviteFriends();
    } catch (error) {
      // Fallback для демо
      addDemoFriend();
      showNotification('Добавлен демо-друг!');
    }
  };

  // Поделиться прогрессом
  const handleShare = async () => {
    const message = `🌳 Мое дерево выросло до ${gameState.treeProgress.level} уровня! ${gameState.treeProgress.completedChallenges} дней личностного роста. Присоединяйся к игре "Дерево Я"!`;
    try {
      await shareOnWall(message);
    } catch (error) {
      showNotification('Поделись прогрессом с друзьями!');
    }
  };

  // Навигация
  const navigationItems = [
    { id: 'home' as Screen, icon: Home, label: 'Дерево' },
    { id: 'challenge' as Screen, icon: Calendar, label: 'Испытание' },
    { id: 'friends' as Screen, icon: Users, label: 'Друзья' },
    { id: 'progress' as Screen, icon: Award, label: 'Прогресс' }
  ];

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-6">
            {/* Приветствие */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-white text-2xl font-bold mb-2">
                Дерево Я
              </h1>
              <p className="text-white/70 text-sm">
                {user ? `Привет, ${user.firstName}!` : 'Твоё путешествие самопознания'}
              </p>
            </motion.div>

            {/* Дерево */}
            <TreeVisualization 
              progress={gameState.treeProgress} 
              showGrowthAnimation={showGrowthAnimation}
            />

            {/* Статистика */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect rounded-2xl p-6 mt-8 w-full max-w-sm"
            >
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-white text-xl font-bold">
                    {gameState.treeProgress.level}
                  </div>
                  <div className="text-white/60 text-xs">Уровень</div>
                </div>
                <div>
                  <div className="text-white text-xl font-bold">
                    {gameState.treeProgress.streak}
                  </div>
                  <div className="text-white/60 text-xs">Стрик</div>
                </div>
                <div>
                  <div className="text-white text-xl font-bold">
                    {gameState.treeProgress.completedChallenges}
                  </div>
                  <div className="text-white/60 text-xs">Испытаний</div>
                </div>
              </div>
            </motion.div>

            {/* Кнопки действий */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-3 mt-6 w-full max-w-sm"
            >
              {currentChallenge && (
                <motion.button
                  onClick={() => setCurrentScreen('challenge')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white py-3 px-4 rounded-xl font-medium"
                >
                  Новое испытание
                </motion.button>
              )}
              
              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 bg-white/20 backdrop-blur-md text-white rounded-xl"
              >
                Поделиться
              </motion.button>
            </motion.div>
          </div>
        );

      case 'challenge':
        return currentChallenge ? (
          <DailyChallenge
            challenge={currentChallenge}
            onAnswer={handleChallengeAnswer}
            onSkip={() => setCurrentScreen('home')}
          />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-white text-xl font-semibold mb-2">
                Испытание на сегодня выполнено!
              </h2>
              <p className="text-white/70 text-sm mb-6">
                Возвращайся завтра за новым вызовом
              </p>
              <motion.button
                onClick={() => setCurrentScreen('home')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-xl font-medium"
              >
                К дереву
              </motion.button>
            </motion.div>
          </div>
        );

      case 'friends':
        return (
          <FriendGarden
            friends={gameState.friends}
            onWaterFriend={waterFriend}
            onInviteFriends={handleInviteFriends}
          />
        );

      case 'progress':
        return (
          <ProgressScreen
            progress={gameState.treeProgress}
            badges={gameState.badges}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-blue to-grass-green">
      {/* Облака в фоне */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [-100, window.innerWidth + 100] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 w-16 h-8 bg-white/20 rounded-full"
        />
        <motion.div
          animate={{ x: [-150, window.innerWidth + 150] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 w-12 h-6 bg-white/15 rounded-full"
        />
        <motion.div
          animate={{ x: [-80, window.innerWidth + 80] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-32 w-20 h-10 bg-white/10 rounded-full"
        />
      </div>

      {/* Основной контент */}
      <main className="relative z-10 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Навигация */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20">
        <div className="flex justify-around py-2">
          {navigationItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                currentScreen === item.id
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
              {item.id === 'challenge' && currentChallenge && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              )}
            </motion.button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default App;
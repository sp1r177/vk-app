import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Users, Plus } from 'lucide-react';
import { Friend } from '../types';

interface FriendGardenProps {
  friends: Friend[];
  onWaterFriend: (friendId: number) => void;
  onInviteFriends: () => void;
}

const FriendGarden: React.FC<FriendGardenProps> = ({ 
  friends, 
  onWaterFriend,
  onInviteFriends 
}) => {
  const renderMiniTree = (progress: Friend['treeProgress']) => {
    const { completedChallenges } = progress;
    
    return (
      <svg width="60" height="80" viewBox="0 0 60 80" className="mx-auto">
        {/* Ствол */}
        <rect x="28" y="50" width="4" height="20" fill="#8b5a3c" />
        
        {/* Ветки */}
        {completedChallenges >= 3 && (
          <path
            d="M30 55 Q25 50 20 48 M30 55 Q35 50 40 48"
            stroke="#8b5a3c"
            strokeWidth="2"
            fill="none"
          />
        )}
        
        {/* Листья */}
        {completedChallenges >= 5 && (
          <>
            <circle cx="20" cy="48" r="3" fill="#4ade80" />
            <circle cx="40" cy="48" r="3" fill="#4ade80" />
            <circle cx="30" cy="45" r="4" fill="#4ade80" />
          </>
        )}
        
        {/* Цветы */}
        {completedChallenges >= 10 && (
          <>
            <circle cx="25" cy="50" r="2" fill="#fbbf24" />
            <circle cx="35" cy="50" r="2" fill="#fbbf24" />
          </>
        )}
        
        {/* Плоды */}
        {completedChallenges >= 15 && (
          <>
            <circle cx="22" cy="46" r="2" fill="#ef4444" />
            <circle cx="38" cy="46" r="2" fill="#ef4444" />
          </>
        )}
      </svg>
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-4">
          <Users className="w-5 h-5 text-white" />
          <h2 className="text-white text-lg font-semibold">Сад друзей</h2>
        </div>
        <p className="text-white/70 text-sm">
          Поддержи друзей и помоги их деревьям расти
        </p>
      </motion.div>

      {friends.length === 0 ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-12"
        >
          <div className="glass-effect rounded-2xl p-8 mb-6">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-white text-xl font-semibold mb-2">
              Пригласи друзей!
            </h3>
            <p className="text-white/70 mb-6">
              Растите ваши деревья вместе и поддерживайте друг друга
            </p>
            <motion.button
              onClick={onInviteFriends}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Пригласить друзей
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {friends.map((friend, index) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-xl p-4"
            >
              {/* Аватар и имя */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  {friend.photo ? (
                    <img
                      src={friend.photo}
                      alt={friend.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-semibold text-sm">
                      {friend.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    {friend.name}
                  </p>
                  <p className="text-white/60 text-xs">
                    {friend.treeProgress.completedChallenges} испытаний
                  </p>
                </div>
              </div>

              {/* Мини-дерево */}
              <div className="mb-3">
                {renderMiniTree(friend.treeProgress)}
              </div>

              {/* Прогресс */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-white/60 mb-1">
                  <span>Стрик: {friend.treeProgress.streak} дней</span>
                  <span>Уровень {friend.treeProgress.level}</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all"
                    style={{ 
                      width: `${Math.min((friend.treeProgress.experience / 100) * 100, 100)}%` 
                    }}
                  />
                </div>
              </div>

              {/* Кнопка полива */}
              <motion.button
                onClick={() => onWaterFriend(friend.id)}
                disabled={!friend.canWater}
                whileHover={{ scale: friend.canWater ? 1.05 : 1 }}
                whileTap={{ scale: friend.canWater ? 0.95 : 1 }}
                className={`w-full py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all ${
                  friend.canWater
                    ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white'
                    : 'bg-white/10 text-white/50 cursor-not-allowed'
                }`}
              >
                <Droplets className="w-4 h-4" />
                {friend.canWater ? 'Полить дерево' : 'Уже полито'}
              </motion.button>

              {friend.lastWatered && (
                <p className="text-white/50 text-xs text-center mt-2">
                  Полито: {new Date(friend.lastWatered).toLocaleDateString()}
                </p>
              )}
            </motion.div>
          ))}

          {/* Кнопка добавления друзей */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: friends.length * 0.1 }}
            className="glass-effect rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-white/20 transition-all"
            onClick={onInviteFriends}
          >
            <Plus className="w-8 h-8 text-white/60 mb-2" />
            <p className="text-white/60 text-sm text-center">
              Пригласить<br />ещё друзей
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FriendGarden;
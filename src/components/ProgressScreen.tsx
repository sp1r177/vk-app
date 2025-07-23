import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, Target, TrendingUp, Star } from 'lucide-react';
import { TreeProgress, Badge } from '../types';

interface ProgressScreenProps {
  progress: TreeProgress;
  badges: Badge[];
}

const ProgressScreen: React.FC<ProgressScreenProps> = ({ progress, badges }) => {
  const statsCards = [
    {
      icon: Calendar,
      title: 'Стрик',
      value: progress.streak,
      suffix: 'дней',
      color: 'from-orange-400 to-red-400'
    },
    {
      icon: Target,
      title: 'Испытания',
      value: progress.completedChallenges,
      suffix: `из ${progress.totalChallenges}`,
      color: 'from-blue-400 to-cyan-400'
    },
    {
      icon: TrendingUp,
      title: 'Уровень',
      value: progress.level,
      suffix: '',
      color: 'from-green-400 to-emerald-400'
    },
    {
      icon: Star,
      title: 'Опыт',
      value: progress.experience,
      suffix: 'XP',
      color: 'from-purple-400 to-pink-400'
    }
  ];

  const earnedBadges = badges.filter(badge => badge.earned);
  const availableBadges = badges.filter(badge => !badge.earned);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-4">
          <Award className="w-5 h-5 text-white" />
          <h2 className="text-white text-lg font-semibold">Твой прогресс</h2>
        </div>
        <p className="text-white/70 text-sm">
          Следи за своим ростом и достижениями
        </p>
      </motion.div>

      {/* Статистика */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {statsCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-effect rounded-xl p-4"
          >
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r ${card.color} mb-3`}>
              <card.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white/70 text-sm font-medium mb-1">
              {card.title}
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="text-white text-2xl font-bold">
                {card.value}
              </span>
              {card.suffix && (
                <span className="text-white/60 text-sm">
                  {card.suffix}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Прогресс бар */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-effect rounded-xl p-6 mb-8"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-white font-semibold">Прогресс путешествия</h3>
          <span className="text-white/70 text-sm">
            {Math.round((progress.completedChallenges / progress.totalChallenges) * 100)}%
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3 mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ 
              width: `${(progress.completedChallenges / progress.totalChallenges) * 100}%` 
            }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full"
          />
        </div>
        <p className="text-white/60 text-sm">
          {progress.completedChallenges} из {progress.totalChallenges} испытаний пройдено
        </p>
      </motion.div>

      {/* Заработанные бейджи */}
      {earnedBadges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Твои достижения ({earnedBadges.length})
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {earnedBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="glass-effect rounded-xl p-4 border border-yellow-400/30"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h4 className="text-white font-medium text-sm mb-1">
                    {badge.name}
                  </h4>
                  <p className="text-white/60 text-xs">
                    {badge.description}
                  </p>
                  {badge.earnedAt && (
                    <p className="text-yellow-400 text-xs mt-2">
                      {new Date(badge.earnedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Доступные бейджи */}
      {availableBadges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-white/70 font-medium mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Будущие достижения
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {availableBadges.slice(0, 6).map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="glass-effect rounded-xl p-3 opacity-60"
              >
                <div className="text-center">
                  <div className="text-2xl mb-1 grayscale">{badge.icon}</div>
                  <h4 className="text-white/60 font-medium text-xs mb-1">
                    {badge.name}
                  </h4>
                  <p className="text-white/40 text-xs">
                    {badge.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Последняя активность */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="glass-effect rounded-xl p-4 mt-8"
      >
        <div className="text-center">
          <p className="text-white/60 text-sm">
            Последняя активность: {progress.lastActivity.toLocaleDateString()}
          </p>
          <p className="text-white/40 text-xs mt-1">
            Продолжай растить своё дерево каждый день 🌱
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressScreen;
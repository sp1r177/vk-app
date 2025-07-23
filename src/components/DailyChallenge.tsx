import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send } from 'lucide-react';
import { Challenge } from '../types';

interface DailyChallengeProps {
  challenge: Challenge;
  onAnswer: (answer: string) => void;
  onSkip?: () => void;
}

const DailyChallenge: React.FC<DailyChallengeProps> = ({ 
  challenge, 
  onAnswer,
  onSkip 
}) => {
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (answer.trim().length < 10) {
      alert('Напишите более развернутый ответ (минимум 10 символов)');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onAnswer(answer);
      setIsSubmitting(false);
    }, 1000);
  };

  const getCategoryColor = (category: Challenge['category']) => {
    switch (category) {
      case 'self-reflection': return 'from-purple-400 to-pink-400';
      case 'emotions': return 'from-blue-400 to-cyan-400';
      case 'relationships': return 'from-green-400 to-emerald-400';
      case 'goals': return 'from-orange-400 to-yellow-400';
      case 'gratitude': return 'from-rose-400 to-pink-400';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getCategoryName = (category: Challenge['category']) => {
    switch (category) {
      case 'self-reflection': return 'Самопознание';
      case 'emotions': return 'Эмоции';
      case 'relationships': return 'Отношения';
      case 'goals': return 'Цели';
      case 'gratitude': return 'Благодарность';
      default: return 'Размышления';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="w-full max-w-md mx-auto p-6"
    >
      {/* Заголовок с днем */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-3">
          <Heart className="w-4 h-4 text-red-400" />
          <span className="text-white font-medium">День {challenge.day}</span>
        </div>
        <div className={`inline-block bg-gradient-to-r ${getCategoryColor(challenge.category)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
          {getCategoryName(challenge.category)}
        </div>
      </motion.div>

      {/* Карточка с вопросом */}
      <motion.div
        initial={{ rotateY: -90 }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-effect rounded-2xl p-6 mb-6 shadow-xl"
      >
        <h2 className="text-white text-lg font-semibold leading-relaxed text-center">
          {challenge.question}
        </h2>
      </motion.div>

      {/* Поле для ответа */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-6"
      >
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Поделись своими мыслями... Здесь безопасно 💙"
          className="w-full h-32 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 resize-none focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          disabled={isSubmitting}
        />
        <div className="text-right mt-2">
          <span className={`text-sm ${answer.length >= 10 ? 'text-green-300' : 'text-white/60'}`}>
            {answer.length}/10 мин.
          </span>
        </div>
      </motion.div>

      {/* Кнопки */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex gap-3"
      >
        <motion.button
          onClick={handleSubmit}
          disabled={answer.trim().length < 10 || isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium transition-all ${
            answer.trim().length >= 10 && !isSubmitting
              ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg'
              : 'bg-white/20 text-white/50 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <>
              <Send className="w-4 h-4" />
              Ответить
            </>
          )}
        </motion.button>

        {onSkip && (
          <motion.button
            onClick={onSkip}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-3 bg-white/10 backdrop-blur-md text-white/70 rounded-xl hover:bg-white/20 transition-all"
          >
            Позже
          </motion.button>
        )}
      </motion.div>

      {/* Мотивационное сообщение */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-6"
      >
        <p className="text-white/60 text-sm">
          🌱 Каждый честный ответ растит твоё дерево
        </p>
      </motion.div>
    </motion.div>
  );
};

export default DailyChallenge;
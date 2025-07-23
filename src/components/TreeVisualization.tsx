import React from 'react';
import { motion } from 'framer-motion';
import { TreeProgress } from '../types';

interface TreeVisualizationProps {
  progress: TreeProgress;
  showGrowthAnimation?: boolean;
}

const TreeVisualization: React.FC<TreeVisualizationProps> = ({ 
  progress, 
  showGrowthAnimation = false 
}) => {
  const getTreeElements = () => {
    const elements = [];
    const { level, completedChallenges } = progress;

    // Ствол дерева
    elements.push(
      <motion.rect
        key="trunk"
        x="145"
        y="180"
        width="10"
        height="60"
        fill="#8b5a3c"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ transformOrigin: 'bottom' }}
      />
    );

    // Корни
    if (completedChallenges >= 2) {
      elements.push(
        <motion.path
          key="roots"
          d="M145 240 Q135 250 125 245 M155 240 Q165 250 175 245"
          stroke="#8b5a3c"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        />
      );
    }

    // Основные ветки
    if (completedChallenges >= 5) {
      elements.push(
        <motion.path
          key="main-branches"
          d="M150 200 Q130 180 120 170 M150 200 Q170 180 180 170 M150 190 Q140 175 135 165 M150 190 Q160 175 165 165"
          stroke="#8b5a3c"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        />
      );
    }

    // Малые ветки
    if (completedChallenges >= 10) {
      elements.push(
        <motion.path
          key="small-branches"
          d="M120 170 Q115 165 110 160 M180 170 Q185 165 190 160 M135 165 Q130 160 125 155 M165 165 Q170 160 175 155"
          stroke="#8b5a3c"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        />
      );
    }

    // Листья
    if (completedChallenges >= 8) {
      const leafPositions = [
        { x: 110, y: 160 }, { x: 125, y: 155 }, { x: 175, y: 155 }, { x: 190, y: 160 },
        { x: 115, y: 170 }, { x: 135, y: 165 }, { x: 165, y: 165 }, { x: 185, y: 170 },
        { x: 120, y: 175 }, { x: 140, y: 180 }, { x: 160, y: 180 }, { x: 180, y: 175 }
      ];

      leafPositions.slice(0, Math.min(completedChallenges - 7, 12)).forEach((pos, index) => {
        elements.push(
          <motion.ellipse
            key={`leaf-${index}`}
            cx={pos.x}
            cy={pos.y}
            rx="4"
            ry="6"
            fill="#4ade80"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: Math.random() * 30 - 15 }}
            transition={{ 
              duration: 0.8, 
              delay: 2.2 + index * 0.1,
              type: "spring",
              stiffness: 200
            }}
          />
        );
      });
    }

    // Цветы
    if (completedChallenges >= 15) {
      const flowerPositions = [
        { x: 115, y: 165 }, { x: 175, y: 165 }, { x: 135, y: 170 }, { x: 165, y: 170 }
      ];

      flowerPositions.slice(0, Math.min(completedChallenges - 14, 4)).forEach((pos, index) => {
        elements.push(
          <motion.g key={`flower-${index}`}>
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r="3"
              fill="#fbbf24"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 3 + index * 0.2 }}
            />
            <motion.circle
              cx={pos.x - 2}
              cy={pos.y - 2}
              r="2"
              fill="#f59e0b"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 3.2 + index * 0.2 }}
            />
          </motion.g>
        );
      });
    }

    // Плоды
    if (completedChallenges >= 25) {
      const fruitPositions = [
        { x: 125, y: 160 }, { x: 175, y: 160 }
      ];

      fruitPositions.slice(0, Math.min(completedChallenges - 24, 2)).forEach((pos, index) => {
        elements.push(
          <motion.circle
            key={`fruit-${index}`}
            cx={pos.x}
            cy={pos.y}
            r="5"
            fill="#ef4444"
            initial={{ scale: 0, y: pos.y - 20 }}
            animate={{ scale: 1, y: pos.y }}
            transition={{ 
              duration: 1.2, 
              delay: 4 + index * 0.3,
              type: "spring",
              stiffness: 100
            }}
          />
        );
      });
    }

    return elements;
  };

  return (
    <div className="flex justify-center items-center w-full h-64">
      <svg
        width="300"
        height="280"
        viewBox="0 0 300 280"
        className="tree-shadow"
      >
        {/* Фон - земля */}
        <motion.ellipse
          cx="150"
          cy="250"
          rx="120"
          ry="15"
          fill="#8b5a3c"
          opacity="0.3"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Элементы дерева */}
        {getTreeElements()}
        
        {/* Эффект роста - светящиеся частицы */}
        {showGrowthAnimation && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.circle
                key={`particle-${i}`}
                cx={150 + Math.random() * 60 - 30}
                cy={200 + Math.random() * 40}
                r="2"
                fill="#4ade80"
                opacity="0.8"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                  y: [0, -20, -40]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.2,
                  repeat: 2
                }}
              />
            ))}
          </>
        )}
      </svg>
    </div>
  );
};

export default TreeVisualization;
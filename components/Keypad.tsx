import React from 'react';

interface KeypadProps {
  onPress: (val: string) => void;
  onDelete: () => void;
  className?: string;
}

export const Keypad: React.FC<KeypadProps> = ({ onPress, onDelete, className = '' }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'];

  return (
    <div className={`grid grid-cols-3 gap-3 p-4 ${className}`}>
      {keys.map((key) => (
        <button
          key={key}
          onClick={() => onPress(key)}
          className="h-14 rounded-xl bg-white text-2xl font-bold text-text-main shadow-sm border border-gray-100 active:bg-gray-100 transition-colors"
        >
          {key}
        </button>
      ))}
      <button
        onClick={onDelete}
        className="h-14 rounded-xl bg-gray-200 text-text-main flex items-center justify-center active:bg-gray-300 transition-colors"
      >
        <span className="material-symbols-outlined">backspace</span>
      </button>
    </div>
  );
};
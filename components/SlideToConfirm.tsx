import React, { useState, useRef } from 'react';

interface SlideToConfirmProps {
  onConfirm: () => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export const SlideToConfirm: React.FC<SlideToConfirmProps> = ({ 
  onConfirm, 
  label = "Trượt để xác nhận", 
  className = "",
  disabled = false
}) => {
  const [dragX, setDragX] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleStart = (clientX: number) => {
    if (confirmed || disabled) return;
    isDragging.current = true;
    startX.current = clientX;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging.current || confirmed || !containerRef.current) return;
    
    const containerWidth = containerRef.current.clientWidth;
    const maxDrag = containerWidth - 56; // 56 is handle width (h-14)
    
    const diff = clientX - startX.current;
    const newX = Math.max(0, Math.min(diff, maxDrag));
    
    setDragX(newX);
  };

  const handleEnd = () => {
    if (confirmed || !isDragging.current) return;
    isDragging.current = false;
    
    const containerWidth = containerRef.current?.clientWidth || 0;
    const maxDrag = containerWidth - 56;
    
    // Threshold to confirm (90%)
    if (dragX >= maxDrag * 0.9) {
        handleConfirm();
    } else {
        setDragX(0); // Snap back
    }
  };
  
  const handleConfirm = () => {
      setConfirmed(true);
      const containerWidth = containerRef.current?.clientWidth || 0;
      setDragX(containerWidth - 56);
      if (navigator.vibrate) navigator.vibrate([50]);
      setTimeout(() => {
          onConfirm();
      }, 300);
  };

  // Mouse/Touch Handlers
  const onTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);
  const onTouchEnd = () => handleEnd();
  
  const onMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => {
      if (isDragging.current) {
          handleMove(e.clientX);
      }
  };
  const onMouseUp = () => handleEnd();
  const onMouseLeave = () => handleEnd();

  return (
    <div 
        ref={containerRef}
        className={`relative h-14 bg-gray-100 rounded-xl overflow-hidden select-none touch-none ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
    >
        {/* Background Fill */}
        <div 
            className={`absolute left-0 top-0 h-full bg-primary/20 transition-all duration-75 ease-out`}
            style={{ width: `${dragX + 28}px` }} 
        ></div>
        
        {/* Text Label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <span className={`font-bold text-sm uppercase tracking-wider transition-opacity duration-300 ${confirmed ? 'text-primary' : 'text-gray-400'} ${dragX > 50 ? 'opacity-0' : 'opacity-100'}`}>
                {confirmed ? 'Đã xác nhận' : label}
            </span>
             {/* Shimmer effect */}
            {!confirmed && !disabled && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-full -translate-x-full animate-shimmer"></div>}
        </div>

        {/* Handle */}
        <div 
            className="absolute top-0 bottom-0 w-14 bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-gray-200 flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
            style={{ 
                transform: `translateX(${dragX}px)`, 
                transition: isDragging.current ? 'none' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
        >
            <span className={`material-symbols-outlined text-primary transition-transform ${confirmed ? 'scale-125' : ''}`}>
                {confirmed ? 'check' : 'chevron_right'}
            </span>
        </div>
    </div>
  );
};
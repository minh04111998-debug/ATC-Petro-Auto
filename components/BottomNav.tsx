import React from 'react';
import { ScreenName } from '../types';

interface BottomNavProps {
  currentScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const NavIcon = ({ icon, label, target, active }: { icon: string; label: string; target: ScreenName; active: boolean }) => (
    <button 
      onClick={() => onNavigate(target)}
      className={`flex flex-col items-center gap-1 w-16 transition-colors ${active ? 'text-primary' : 'text-gray-300 hover:text-gray-500'}`}
    >
      <span className={`material-symbols-outlined text-2xl ${active ? 'filled' : ''}`}>{icon}</span>
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );

  return (
    <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center pb-8 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <NavIcon 
        icon="home" 
        label="Trang chủ" 
        target={ScreenName.HOME} 
        active={currentScreen === ScreenName.HOME} 
      />
      <NavIcon 
        icon="account_balance_wallet" 
        label="Ví" 
        target={ScreenName.WALLET} 
        active={currentScreen === ScreenName.WALLET || currentScreen === ScreenName.WALLET_TOPUP} 
      />
      <NavIcon 
        icon="history" 
        label="Hoạt động" 
        target={ScreenName.ACTIVITY} 
        active={currentScreen === ScreenName.ACTIVITY} 
      />
      <NavIcon 
        icon="person" 
        label="Cá nhân" 
        target={ScreenName.PROFILE} 
        active={currentScreen === ScreenName.PROFILE} 
      />
    </div>
  );
};
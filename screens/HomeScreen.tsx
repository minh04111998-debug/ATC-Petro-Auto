import React, { useState, useRef, useEffect } from 'react';
import { ScreenName } from '../types';
import { BottomNav } from '../components/BottomNav';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  balance: number;
}

export const HomeScreen: React.FC<Props> = ({ onNavigate, balance }) => {
  // Pull to Refresh State
  const [refreshing, setRefreshing] = useState(false);
  const [pullY, setPullY] = useState(0);
  const startY = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const MAX_PULL = 120;
  const THRESHOLD = 60;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scrollContainerRef.current && scrollContainerRef.current.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
    } else {
      startY.current = 0;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === 0) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;

    if (diff > 0 && !refreshing) {
       // Add resistance
       const newPull = Math.min(diff * 0.5, MAX_PULL);
       setPullY(newPull);
    }
  };

  const handleTouchEnd = () => {
    if (pullY > THRESHOLD) {
      setRefreshing(true);
      setPullY(60); // Keep visual indicator visible
      
      // Simulate API Refresh
      setTimeout(() => {
        setRefreshing(false);
        setPullY(0);
      }, 1500);
    } else {
      setPullY(0);
    }
    startY.current = 0;
  };

  return (
    <div className="flex flex-col h-full bg-bg-light relative select-none">
      {/* Header */}
      <div className="px-6 pt-10 pb-4 flex justify-between items-center bg-white z-20 relative shadow-sm">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden border-2 border-primary/20">
            <img src="https://ui-avatars.com/api/?name=Alex+Nguyen&background=random" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-lg font-bold text-text-main">Trang chủ</h2>
        </div>
        <button className="w-8 h-8 flex items-center justify-center relative active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-black filled">notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>

      {/* Pull to Refresh Indicator */}
      <div 
        className="absolute top-24 left-0 w-full flex justify-center z-10 pointer-events-none"
        style={{ 
          transform: `translateY(${pullY > 0 ? pullY - 40 : -50}px)`,
          opacity: pullY > 0 ? 1 : 0,
          transition: refreshing ? 'transform 0.3s' : 'none'
        }}
      >
        <div className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
          {refreshing ? (
             <span className="material-symbols-outlined text-primary animate-spin text-xl">progress_activity</span>
          ) : (
             <span 
                className="material-symbols-outlined text-primary text-xl"
                style={{ transform: `rotate(${pullY * 3}deg)` }}
             >refresh</span>
          )}
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto pb-24 no-scrollbar bg-bg-light relative z-10"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ 
          transform: `translateY(${pullY}px)`, 
          transition: 'transform 0.2s cubic-bezier(0,0,0.2,1)' 
        }}
      >
        <div className="px-6 pt-4 pb-2 bg-white rounded-b-[32px] shadow-sm mb-6">
            <h1 className="text-2xl font-black text-text-main mb-1">Xin chào, Alex!</h1>
            <p className="text-gray-500 text-sm mb-6">Bạn đã sẵn sàng nạp nhiên liệu chưa?</p>

            {/* Wallet Card - Orange Style */}
            <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex justify-between items-center transition-transform active:scale-[0.99]">
                <div>
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Số dư ví</p>
                    <h3 className="text-2xl font-black text-text-main">{balance.toLocaleString('vi-VN')}đ</h3>
                    <button onClick={() => onNavigate(ScreenName.WALLET_TOPUP)} className="mt-2 bg-orange-50 text-primary px-3 py-1.5 rounded-lg flex items-center gap-1 text-xs font-bold hover:bg-orange-100 transition-colors">
                        <span className="material-symbols-outlined text-sm filled">add_circle</span> Nạp tiền
                    </button>
                </div>
                <div className="w-24 h-24 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 relative overflow-hidden">
                    <span className="material-symbols-outlined text-white/40 text-6xl absolute -right-2 -bottom-2">account_balance_wallet</span>
                    <span className="material-symbols-outlined text-white text-3xl relative z-10">wallet</span>
                </div>
            </div>
        </div>

        {/* Big Scan Button Area - UPDATED DESIGN */}
        <div className="px-4 flex flex-col items-center gap-4 my-8 relative z-0">
          <button 
            onClick={() => onNavigate(ScreenName.SCAN_QR)}
            className="w-64 h-64 rounded-full bg-primary flex flex-col items-center justify-center text-white shadow-[0_20px_60px_rgba(242,127,13,0.4)] border-[8px] border-white active:scale-95 transition-transform relative z-10"
          >
             <span className="material-symbols-outlined text-[72px] mb-3">qr_code_2</span>
             <h3 className="font-black text-2xl uppercase tracking-wide">Quét mã QR</h3>
             <p className="text-xs font-medium text-white/90 uppercase tracking-widest mt-1">để bắt đầu</p>
          </button>

          {/* NEW: Scan License Plate Button - Updated position */}
          <button 
            onClick={() => onNavigate(ScreenName.LICENSE_REGISTER)} 
            className="w-full h-14 bg-white border-2 border-primary rounded-2xl flex items-center justify-center gap-3 text-primary shadow-lg shadow-orange-100 active:bg-orange-50 transition-all mt-6"
          >
             <span className="material-symbols-outlined text-2xl filled">directions_car</span>
             <span className="font-bold text-base uppercase">Quét biển số xe</span>
          </button>
        </div>

        {/* Recent Transactions */}
        <div className="px-6">
          <div className="flex justify-between items-end mb-4">
            <h3 className="font-bold text-lg text-text-main">Giao dịch gần đây</h3>
            <button onClick={() => onNavigate(ScreenName.ACTIVITY)} className="text-primary text-xs font-bold hover:underline">Xem tất cả</button>
          </div>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 active:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined filled">local_gas_station</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-text-main">Trạm xăng #42 - Premium</h4>
                  <p className="text-gray-400 text-[10px]">Hôm nay, 10:24 AM</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-text-main text-sm">320.000đ</p>
                  <p className="text-gray-400 text-[10px] font-bold">12.5 LÍT</p>
                </div>
            </div>

             <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 active:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
                  <span className="material-symbols-outlined filled">local_gas_station</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-text-main">Trạm xăng #18 - Regular</h4>
                  <p className="text-gray-400 text-[10px]">12 tháng 5, 06:45 PM</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-text-main text-sm">410.000đ</p>
                  <p className="text-gray-400 text-[10px] font-bold">15.8 LÍT</p>
                </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav currentScreen={ScreenName.HOME} onNavigate={onNavigate} />
    </div>
  );
};
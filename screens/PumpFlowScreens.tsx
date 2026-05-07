import React, { useState, useEffect, useRef } from 'react';
import { ScreenName, PumpMode } from '../types';
import { Button } from '../components/Button';
import { BottomNav } from '../components/BottomNav';

interface NavProps {
  onNavigate: (screen: ScreenName) => void;
}

// 1. Scan QR Screen with realistic animation
export const ScanQRScreen: React.FC<NavProps> = ({ onNavigate }) => {
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    // Simulate scan delay
    const timer = setTimeout(() => {
      setScanned(true);
      // Vibrate if supported
      if (navigator.vibrate) navigator.vibrate(200);
      
      setTimeout(() => {
          onNavigate(ScreenName.CONFIRM_PUMP);
      }, 500);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="h-full w-full bg-black relative flex flex-col">
      <div className="absolute top-0 w-full p-4 flex justify-between items-center z-10 pt-10">
        <button onClick={() => onNavigate(ScreenName.HOME)} className="w-10 h-10 bg-white/20 rounded-full text-white flex items-center justify-center backdrop-blur-md">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="bg-black/60 px-4 py-2 rounded-full backdrop-blur-md">
          <p className="text-white text-xs font-bold">Quét mã QR tại trụ bơm</p>
        </div>
        <button className="w-10 h-10 bg-white/20 rounded-full text-white flex items-center justify-center backdrop-blur-md">
          <span className="material-symbols-outlined">flashlight_on</span>
        </button>
      </div>
      
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Camera Feed Simulator */}
        <img 
            src="https://images.unsplash.com/photo-1626863905192-37508677bbdd?q=80&w=1000&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover opacity-60" 
            alt="Camera Feed"
        />
        
        {/* Scan Overlay */}
        <div className={`w-72 h-72 relative transition-transform duration-300 ${scanned ? 'scale-95 border-green-500' : ''}`}>
             {/* Corner Markers */}
            <div className={`absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 rounded-tl-xl ${scanned ? 'border-green-500' : 'border-white'}`}></div>
            <div className={`absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 rounded-tr-xl ${scanned ? 'border-green-500' : 'border-white'}`}></div>
            <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 rounded-bl-xl ${scanned ? 'border-green-500' : 'border-white'}`}></div>
            <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 rounded-br-xl ${scanned ? 'border-green-500' : 'border-white'}`}></div>
            
            {/* Laser Line */}
            {!scanned && (
                <div className="absolute top-0 left-4 right-4 h-0.5 bg-primary shadow-[0_0_15px_rgba(242,127,13,1)] animate-scan"></div>
            )}

            {/* Scanned Success Icon */}
            {scanned && (
                <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-white text-3xl">check</span>
                    </div>
                </div>
            )}
        </div>

        <div className="absolute bottom-20 text-white text-center opacity-80 text-sm">
            Di chuyển camera đến mã QR
        </div>
      </div>
    </div>
  );
};

// 2. Confirm Pump Details
export const ConfirmPumpScreen: React.FC<NavProps> = ({ onNavigate }) => {
  return (
    <div className="h-full flex flex-col bg-bg-light relative">
      <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1626863905192-37508677bbdd?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover filter blur-sm brightness-50" />
      </div>

      <div className="relative z-10 flex flex-col h-full animate-slide-up">
         <div className="p-4 pt-10 flex items-center">
            <button onClick={() => onNavigate(ScreenName.SCAN_QR)} className="w-10 h-10 flex items-center justify-center">
            <span className="material-symbols-outlined text-white">arrow_back</span>
            </button>
            <h2 className="text-lg font-bold flex-1 text-center pr-10 text-white">Xác nhận trụ bơm</h2>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 pb-24">
            <div className="w-full bg-white rounded-3xl p-6 shadow-2xl">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Đã nhận diện</span>
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined filled">local_gas_station</span>
                    </div>
                </div>
                
                <h1 className="text-3xl font-black text-text-main leading-tight mb-6">Trụ bơm #04 -<br/>Vòi A</h1>

                <div className="flex gap-3 mb-6">
                    <div className="flex-1 bg-gray-50 p-4 rounded-xl">
                        <p className="text-gray-500 text-xs font-medium mb-1">Loại nhiên liệu</p>
                        <p className="font-bold text-text-main text-lg leading-tight">Xăng RON 95</p>
                    </div>
                    <div className="flex-1 bg-gray-50 p-4 rounded-xl">
                        <p className="text-gray-500 text-xs font-medium mb-1">Đơn giá / Lít</p>
                        <p className="font-bold text-text-main text-lg leading-tight">23.500đ</p>
                    </div>
                </div>

                <div className="mb-4">
                    <Button onClick={() => onNavigate(ScreenName.SELECT_MODE)}>Xác nhận</Button>
                </div>
                
                <p className="text-center text-sm text-gray-500">Sai trụ bơm? <button onClick={() => onNavigate(ScreenName.SCAN_QR)} className="text-text-main font-bold hover:underline">Quét lại</button></p>
            </div>
        </div>
         <BottomNav currentScreen={ScreenName.HOME} onNavigate={onNavigate} />
      </div>
    </div>
  );
};

// 3. Main Selection Screen (Handles Full, Amount, Liters in one place)
interface ModeProps extends NavProps {
  setPumpConfig: (config: any) => void;
  balance: number;
}

export const SelectModeScreen: React.FC<ModeProps> = ({ onNavigate, setPumpConfig, balance }) => {
  const [activeTab, setActiveTab] = useState<PumpMode>(PumpMode.FULL);
  const [inputValue, setInputValue] = useState('0');
  const PRICE_PER_LITER = 23500;

  // Handle Tab Change
  const handleTabChange = (mode: PumpMode) => {
      setActiveTab(mode);
      // Reset input when switching modes for better UX
      if (mode === PumpMode.AMOUNT) {
          setInputValue('0'); // Default to 0 instead of suggestion
      } else if (mode === PumpMode.LITERS) {
          setInputValue('0');
      }
  };

  // Keypad Logic
  const handlePress = (key: string) => {
    if (inputValue.length > 9) return;
    if (key === '.' && inputValue.includes('.')) return;
    
    setInputValue(prev => {
        if (prev === '0' && key !== '.') return key;
        return prev + key;
    });
  };

  const handleBackspace = () => {
    setInputValue(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  };

  const handleConfirm = () => {
      let targetValue = 0;
      if (activeTab === PumpMode.FULL) {
          targetValue = 0; // Signal for full tank
      } else {
          targetValue = parseFloat(inputValue);
          if (targetValue <= 0) return; // Prevent zero value
      }

      setPumpConfig({ mode: activeTab, targetValue });
      onNavigate(ScreenName.PUMPING);
  };

  // Calculations
  const estimatedLiters = activeTab === PumpMode.AMOUNT ? (parseInt(inputValue || '0') / PRICE_PER_LITER) : 0;
  const estimatedPrice = activeTab === PumpMode.LITERS ? (parseFloat(inputValue || '0') * PRICE_PER_LITER) : 0;
  
  // Dynamic Title
  const getTitle = () => {
      if(activeTab === PumpMode.FULL) return "Chọn phương thức bơm";
      if(activeTab === PumpMode.AMOUNT) return "Chọn phương thức bơm";
      if(activeTab === PumpMode.LITERS) return "Chọn bơm Theo số lít";
      return "Chọn phương thức bơm";
  };

  return (
    <div className="h-full flex flex-col bg-bg-light animate-fade-in relative">
      {/* Header */}
      <div className="p-4 pt-10 flex items-center bg-white shadow-sm z-20">
        <button onClick={() => onNavigate(ScreenName.CONFIRM_PUMP)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-full transition-colors">
          <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10">{getTitle()}</h2>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="p-4 space-y-4">
            
            {/* Wallet Info Card */}
            <div className="bg-gray-100 rounded-2xl p-5 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-sm filled">account_balance_wallet</span>
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Số dư ví hiện tại</span>
                </div>
                <p className="text-2xl font-black text-text-main ml-8">{balance.toLocaleString()} VND</p>
            </div>

            {/* Tabs */}
            <div className="bg-gray-100 p-1.5 rounded-xl flex gap-1">
                <button 
                    onClick={() => handleTabChange(PumpMode.FULL)}
                    className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all duration-200 ${activeTab === PumpMode.FULL ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Đầy bình
                </button>
                <button 
                    onClick={() => handleTabChange(PumpMode.AMOUNT)}
                    className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all duration-200 ${activeTab === PumpMode.AMOUNT ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Theo số tiền
                </button>
                <button 
                    onClick={() => handleTabChange(PumpMode.LITERS)}
                    className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all duration-200 ${activeTab === PumpMode.LITERS ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Theo số lít
                </button>
            </div>

            {/* Dynamic Content Area */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 min-h-[320px] flex flex-col items-center justify-center relative overflow-hidden transition-all">
                
                {/* 1. FULL TANK UI */}
                {activeTab === PumpMode.FULL && (
                    <div className="flex flex-col items-center text-center animate-fade-in w-full">
                        <div className="relative mb-6">
                            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-5xl text-primary filled">local_gas_station</span>
                            </div>
                            <div className="absolute -top-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                                <span className="material-symbols-outlined text-white text-sm font-bold">check</span>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-text-main mb-2">Xác nhận để bơm đầy bình</h3>
                        <p className="text-gray-400 text-sm font-medium max-w-[200px] mb-8">Hệ thống sẽ tự động dừng khi bình đầy</p>
                    </div>
                )}

                {/* 2. BY AMOUNT UI */}
                {activeTab === PumpMode.AMOUNT && (
                    <div className="flex flex-col items-center text-center animate-fade-in w-full">
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">Số tiền muốn bơm</p>
                        <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-5xl font-black text-text-main tracking-tight">{parseInt(inputValue).toLocaleString()}</span>
                            <span className="text-xl font-bold text-primary">VND</span>
                        </div>
                        <div className="bg-orange-50 text-primary px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 mb-2">
                             <span className="material-symbols-outlined text-lg filled">local_gas_station</span>
                             ~ {estimatedLiters.toFixed(2)} Lít
                        </div>
                    </div>
                )}

                {/* 3. BY LITERS UI */}
                {activeTab === PumpMode.LITERS && (
                    <div className="flex flex-col items-center text-center animate-fade-in w-full">
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2">Số lít muốn bơm</p>
                        <div className="flex items-baseline gap-1 mb-4">
                             <span className="text-6xl font-black text-text-main tracking-tight">{inputValue}</span>
                             <span className="text-2xl font-bold text-primary">Lít</span>
                        </div>
                        <p className="text-gray-500 text-sm font-bold">
                            Ước tính: <span className="text-text-main">{estimatedPrice.toLocaleString()} VND</span>
                        </p>
                    </div>
                )}
            </div>

            {/* Keypad (Only for Amount & Liters) */}
            {activeTab !== PumpMode.FULL && (
                <div className="bg-white rounded-3xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 animate-slide-up">
                    <div className="grid grid-cols-3 gap-3">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <button 
                                key={num}
                                onClick={() => handlePress(num.toString())}
                                className="h-14 bg-gray-50 rounded-xl text-xl font-bold text-text-main active:bg-gray-200 active:scale-95 transition-all"
                            >
                                {num}
                            </button>
                        ))}
                        <button 
                             onClick={() => handlePress('.')}
                             className="h-14 bg-gray-50 rounded-xl text-2xl font-bold text-text-main active:bg-gray-200 active:scale-95 transition-all pb-3 flex items-end justify-center"
                        >
                            .
                        </button>
                        <button 
                             onClick={() => handlePress('0')}
                             className="h-14 bg-gray-50 rounded-xl text-xl font-bold text-text-main active:bg-gray-200 active:scale-95 transition-all"
                        >
                            0
                        </button>
                        <button 
                            onClick={handleBackspace}
                            className="h-14 bg-gray-200 rounded-xl flex items-center justify-center text-text-main active:bg-gray-300 active:scale-95 transition-all"
                        >
                            <span className="material-symbols-outlined filled text-xl">backspace</span>
                        </button>
                    </div>
                </div>
            )}
            
            {/* Spacer */}
            <div className="h-10"></div>
        </div>
      </div>

      {/* Floating Bottom Button - Fixed Position */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-white via-white to-white/90 z-50 border-t border-gray-50">
        <Button 
            onClick={handleConfirm}
            className="h-14 rounded-xl shadow-xl shadow-primary/30 flex items-center justify-center gap-2 text-lg w-full"
        >
             Xác nhận và bắt đầu bơm
             <span className="material-symbols-outlined filled">local_gas_station</span>
        </Button>
      </div>
    </div>
  );
};

// 4. Input Amount/Liters Screen - Pass-through to SelectModeScreen logic
export const InputAmountScreen: React.FC<ModeProps & { pumpConfig: any }> = (props) => {
    return <SelectModeScreen {...props} />;
};


// 5. Pumping Screen with INSUFFICIENT FUNDS CHECK
export const PumpingScreen: React.FC<NavProps & { onComplete: (val: number) => void, pumpConfig: any, balance: number }> = ({ onNavigate, onComplete, pumpConfig, balance }) => {
  const [status, setStatus] = useState<'UNLOCKED' | 'PUMPING' | 'LOCKED' | 'ERROR'>('UNLOCKED');
  
  // Real-time counter simulation
  const [currentLiters, setCurrentLiters] = useState(0);
  const [currentCost, setCurrentCost] = useState(0);
  
  const PRICE_PER_LITER = 23500;
  
  // Determine final target
  let targetLiters = 0;
  let targetCost = 0;
  
  if (pumpConfig.mode === PumpMode.FULL) {
      targetLiters = 12.45; // Simulated full tank
      targetCost = targetLiters * PRICE_PER_LITER;
  } else if (pumpConfig.mode === PumpMode.AMOUNT) {
      targetCost = pumpConfig.targetValue;
      targetLiters = targetCost / PRICE_PER_LITER;
  } else {
      targetLiters = pumpConfig.targetValue;
      targetCost = targetLiters * PRICE_PER_LITER;
  }

  // Simulation Sequence
  useEffect(() => {
    // Check balance first
    if (balance < targetCost) {
        setStatus('ERROR');
        return;
    }

    // 1. Show "Unlock Success" for 2.5 seconds
    const t1 = setTimeout(() => {
        setStatus('PUMPING');
    }, 2500);
    
    return () => clearTimeout(t1);
  }, []);

  // Pumping Counter Effect
  useEffect(() => {
    if (status === 'PUMPING') {
        const duration = 5000; // 5 seconds to pump
        const intervalTime = 20; // update every 20ms
        const steps = duration / intervalTime;
        const incrementLiters = targetLiters / steps;

        const timer = setInterval(() => {
            setCurrentLiters(prev => {
                const next = prev + incrementLiters;
                if (next >= targetLiters) {
                    clearInterval(timer);
                    // Finish
                    setTimeout(() => {
                        onComplete(targetCost);
                        onNavigate(ScreenName.SUCCESS);
                    }, 500);
                    return targetLiters;
                }
                return next;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }
  }, [status]);

  // Sync cost with liters
  useEffect(() => {
      setCurrentCost(currentLiters * PRICE_PER_LITER);
  }, [currentLiters]);


  // --- INSUFFICIENT FUNDS ERROR UI ---
  if (status === 'ERROR') {
      return (
        <div className="h-full flex flex-col bg-bg-light animate-fade-in relative">
            <div className="p-4 pt-10 flex items-center">
                 <button onClick={() => onNavigate(ScreenName.SELECT_MODE)} className="w-10 h-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
                 </button>
                 <h2 className="text-lg font-bold flex-1 text-center pr-10">Thông báo lỗi</h2>
            </div>

            <div className="flex-1 flex flex-col items-center p-6 text-center">
                 <h1 className="text-2xl font-black text-text-main mb-8">Vòi bơm vẫn khóa</h1>

                 {/* Error Icon */}
                 <div className="w-56 h-56 relative flex items-center justify-center mb-6">
                     {/* Red Ring SVG */}
                     <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#fee2e2" strokeWidth="6" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#dc2626" strokeWidth="6" strokeDasharray="220" strokeDashoffset="0" strokeLinecap="round" />
                     </svg>
                     
                     <div className="w-40 h-40 bg-red-50 rounded-full flex flex-col items-center justify-center shadow-inner relative z-10">
                         <div className="w-20 h-20 bg-[#dc2626] rounded-full flex items-center justify-center text-white mb-2 shadow-lg shadow-red-200">
                             <span className="material-symbols-outlined text-4xl">lock</span>
                         </div>
                         <span className="text-[10px] font-bold text-[#dc2626] bg-red-100 px-2 py-0.5 rounded-full uppercase tracking-wider">Chưa mở khóa</span>
                     </div>
                 </div>

                 <h3 className="text-sm font-bold text-text-main mb-2">Số dư ví không đủ để thực hiện bơm xăng theo yêu cầu.</h3>
                 <p className="text-gray-500 text-xs px-4 mb-8">Vui lòng nạp thêm tiền để mở khóa vòi bơm.</p>

                 <div className="w-full bg-white rounded-2xl p-4 flex justify-between items-center shadow-sm border border-gray-100 mb-8">
                     <span className="text-sm font-bold text-text-main">Số dư hiện tại</span>
                     <span className="text-xl font-black text-[#dc2626]">{balance.toLocaleString()} đ</span>
                 </div>
            </div>

            <div className="p-6 pb-8 space-y-3 bg-white border-t border-gray-50">
                 <Button onClick={() => onNavigate(ScreenName.WALLET_TOPUP)}>Nạp tiền ngay</Button>
                 <Button variant="secondary" className="bg-gray-100 border-none" onClick={() => onNavigate(ScreenName.HOME)}>Quay về trang chủ</Button>
            </div>
        </div>
      )
  }

  // --- UNLOCK SUCCESS UI ---
  if (status === 'UNLOCKED') {
    return (
        <div className="h-full flex flex-col bg-bg-light animate-fade-in">
            <div className="p-4 pt-10 flex items-center">
                 <button onClick={() => onNavigate(ScreenName.HOME)} className="w-10 h-10 flex items-center justify-center"><span className="material-symbols-outlined">arrow_back</span></button>
                 <h2 className="text-lg font-bold flex-1 text-center pr-10">Trạng thái bơm</h2>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                 <h1 className="text-2xl font-black text-text-main mb-8">Mở khóa vòi bơm<br/>thành công</h1>
                 
                 <div className="w-64 h-64 relative flex items-center justify-center mb-8">
                      <div className="absolute inset-0 border-4 border-primary rounded-full opacity-20"></div>
                      <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin duration-[3s]"></div>
                      <div className="w-48 h-48 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/30 relative animate-pulse-fast">
                          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-4xl text-primary font-bold">check</span>
                          </div>
                      </div>
                      <div className="absolute bottom-10 bg-orange-100 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          Trụm #04
                      </div>
                 </div>

                 <p className="text-text-main font-medium mb-2 px-8">Vòi bơm đã sẵn sàng. Bạn có thể bắt đầu tiếp nhiên liệu ngay bây giờ.</p>
                 <p className="text-gray-400 text-xs">Vui lòng nhấc vòi và nhấn lẫy để bắt đầu.</p>
            </div>

            <div className="p-4 space-y-3 pb-8">
                 <div className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm">
                     <span className="font-bold text-sm uppercase">Trạng thái</span>
                     <span className="text-primary font-bold text-sm">Hoàn tất</span>
                 </div>
                 <div className="h-1 bg-primary w-full rounded-full"></div>
            </div>
             <BottomNav currentScreen={ScreenName.HOME} onNavigate={onNavigate} />
        </div>
    )
  }

  // Pumping State - MATCHING NEW DESIGN
  return (
      <div className="h-full flex flex-col bg-bg-light animate-fade-in">
           <div className="p-4 pt-10 flex items-center">
                <button className="w-10 h-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-black font-bold">arrow_back</span>
                </button>
                <h2 className="text-lg font-bold flex-1 text-center pr-10">Trạm #04 - Trụ 2</h2>
           </div>

           <div className="flex-1 flex flex-col items-center px-4 pt-4">
                <div className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Đang hoạt động
                </div>
                
                <h1 className="text-3xl font-black text-text-main mb-1">Đang bơm xăng</h1>
                <p className="text-gray-500 text-sm font-medium mb-8">RON 95 Cao Cấp</p>
                
                {/* Liters Card */}
                <div className="w-full bg-white rounded-2xl p-6 mb-3 text-center shadow-sm border border-gray-100">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">SỐ LÍT ĐÃ BƠM</p>
                    <p className="text-6xl font-black text-text-main font-mono leading-none tracking-tight">
                        {currentLiters.toFixed(2)}<span className="text-primary text-2xl font-bold ml-1 font-sans">L</span>
                    </p>
                </div>

                {/* Cost Card */}
                 <div className="w-full bg-white rounded-2xl p-6 mb-6 text-center shadow-sm border border-gray-100">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">TỔNG TIỀN</p>
                    <p className="text-5xl font-black text-text-main font-mono leading-none tracking-tight">
                        {Math.floor(currentCost).toLocaleString()}<span className="text-primary text-xl font-bold ml-1 font-sans">VNĐ</span>
                    </p>
                </div>
                
                {/* Progress Section */}
                <div className="w-full px-2">
                    <div className="flex justify-between mb-2">
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mục tiêu thiết lập</span>
                         <span className="font-bold text-primary text-lg">
                            {targetCost > 0 ? Math.min(100, (currentCost / targetCost) * 100).toFixed(0) : 0}%
                         </span>
                    </div>
                    <div className="flex justify-between items-end mb-3">
                        <p className="font-black text-2xl text-text-main">{targetCost > 0 ? targetCost.toLocaleString() + ' VNĐ' : 'Đầy bình'}</p>
                    </div>
                    
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-6">
                        <div 
                            className="h-full bg-primary rounded-full transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(242,127,13,0.5)]"
                            style={{ width: `${targetCost > 0 ? (currentCost / targetCost) * 100 : 0}%` }}
                        ></div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-text-main text-sm font-bold">
                        <span className="material-symbols-outlined text-gray-500">schedule</span> Ước tính còn lại 0:45
                    </div>
                </div>
           </div>

           {/* Footer Buttons */}
           <div className="p-6 pb-8">
               <button className="w-full h-16 bg-[#dc2626] rounded-2xl flex items-center justify-center gap-3 text-white shadow-xl shadow-red-500/20 active:scale-95 transition-transform">
                   <span className="material-symbols-outlined text-3xl filled">stop_circle</span> 
                   <span className="text-xl font-bold">DỪNG BƠM</span>
               </button>
               <p className="text-[10px] text-gray-400 text-center font-bold mt-4 uppercase tracking-widest">Nhấn và giữ trong trường hợp khẩn cấp</p>
           </div>
      </div>
  )
};

// 6. Success Screen - MATCHING NEW DESIGN
export const SuccessScreen: React.FC<NavProps & { amount: number }> = ({ onNavigate, amount }) => {
  // Mock data if amount is 0 for preview purposes, or use passed amount
  const displayAmount = amount || 1125000;
  const liters = (displayAmount / 25000).toFixed(2); // Assuming price 25000 for calculation

  return (
    <div className="h-full flex flex-col bg-white relative">
       {/* Header */}
       <div className="pt-6 pb-2 text-center relative z-10 bg-white">
           <h2 className="text-lg font-bold text-text-main">Thông báo</h2>
       </div>

       <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-24">
           {/* Success Icon */}
           <div className="flex justify-center mb-4 mt-4">
               <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center">
                    <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                        <span className="material-symbols-outlined text-white text-3xl font-bold">check</span>
                    </div>
               </div>
           </div>
           
           {/* Title & Description */}
           <div className="text-center mb-8">
               <h1 className="text-2xl font-black text-text-main mb-2">Giao dịch thành công</h1>
               <p className="text-gray-500 text-sm px-4 leading-relaxed max-w-[300px] mx-auto">
                   Thanh toán của bạn đã được xử lý. Bạn có thể rời trạm bây giờ.
               </p>
           </div>

           {/* Receipt Card */}
           <div className="bg-[#F9F9F9] rounded-2xl p-5 mb-6 border border-gray-100">
               <div className="flex justify-between items-center py-2.5">
                   <span className="text-gray-500 text-sm">Vị trí bơm</span>
                   <span className="font-bold text-text-main text-sm">Trụ 04</span>
               </div>
                <div className="flex justify-between items-center py-2.5">
                   <span className="text-gray-500 text-sm">Loại xăng</span>
                   <span className="font-bold text-text-main text-sm">RON 95-III</span>
               </div>
                <div className="flex justify-between items-center py-2.5">
                   <span className="text-gray-500 text-sm">Tổng số lít</span>
                   <span className="font-bold text-text-main text-sm">{liters} L</span>
               </div>
                <div className="flex justify-between items-center pt-2 mt-2">
                   <span className="text-gray-500 text-base font-bold">Tổng tiền</span>
                   <span className="font-black text-primary text-2xl">{displayAmount.toLocaleString()}đ</span>
               </div>
           </div>

           {/* Map Image */}
           <div className="w-full h-32 bg-gray-200 rounded-2xl overflow-hidden relative mb-6">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/OpenStreetMap_fr.png/640px-OpenStreetMap_fr.png" 
                    className="w-full h-full object-cover grayscale opacity-50" 
                    alt="Map Location" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
           </div>
           
           {/* Action Buttons */}
           <div className="space-y-3 pb-4">
               <Button onClick={() => onNavigate(ScreenName.HOME)} className="bg-primary text-white shadow-none h-12 text-sm font-bold rounded-xl">
                   Về trang chủ
               </Button>
               <Button onClick={() => onNavigate(ScreenName.ACTIVITY_DETAIL)} className="bg-gray-100 text-text-main border-none h-12 text-sm font-bold hover:bg-gray-200 rounded-xl">
                   Xem hóa đơn
               </Button>
           </div>
       </div>

       {/* Bottom Navigation */}
       <BottomNav currentScreen={ScreenName.HOME} onNavigate={onNavigate} />
    </div>
  );
};
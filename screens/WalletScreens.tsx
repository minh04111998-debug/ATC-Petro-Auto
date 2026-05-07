import React, { useState } from 'react';
import { ScreenName } from '../types';
import { Button } from '../components/Button';
import { Keypad } from '../components/Keypad';

interface WalletFlowProps {
  onNavigate: (screen: ScreenName) => void;
  currentBalance: number;
  onUpdateBalance: (amount: number) => void; // Positive for TopUp, Negative for Withdraw
}

// --------------------------------------------------------------------------------
// 1. TOP UP SCREEN
// Flows: Input -> Auth Overlay -> Success/Fail
// --------------------------------------------------------------------------------
export const WalletTopupScreen: React.FC<WalletFlowProps> = ({ onNavigate, currentBalance, onUpdateBalance }) => {
  const [amountStr, setAmountStr] = useState('');
  // Steps: 'input' -> 'auth' (overlay) -> 'success' | 'fail'
  const [step, setStep] = useState<'input' | 'auth' | 'success' | 'fail'>('input');
  
  const handlePress = (key: string) => {
    if (amountStr.length >= 9) return;
    setAmountStr(prev => prev + key);
  };

  const handleDelete = () => {
    setAmountStr(prev => prev.slice(0, -1));
  };

  const handleAuth = () => {
    // Simulate API call
    setTimeout(() => {
        // Mock success for demonstration
        onUpdateBalance(parseInt(amountStr));
        setStep('success');
    }, 1500);
  };

  // --- RENDER: SUCCESS STATE (Image 18) ---
  if (step === 'success') {
      return (
          <div className="h-full flex flex-col bg-bg-light p-6 items-center justify-center text-center animate-fade-in relative">
               {/* Header like image */}
               <div className="absolute top-0 left-0 w-full p-4 pt-10 flex items-center">
                    <button onClick={() => onNavigate(ScreenName.WALLET)} className="w-10 h-10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-lg font-bold flex-1 text-center pr-10">Nạp tiền thành công</h2>
               </div>

               <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-200">
                    <span className="material-symbols-outlined text-white text-5xl font-bold">check</span>
               </div>
               
               <h1 className="text-2xl font-black text-text-main mb-2">Nạp tiền thành công</h1>
               <p className="text-gray-500 text-sm mb-8 px-4">Giao dịch của bạn đã được thực hiện thành công.</p>
               
               <div className="bg-white rounded-3xl p-6 w-full shadow-sm mb-8">
                   <p className="text-gray-400 text-xs font-bold uppercase mb-2">SỐ DƯ MỚI</p>
                   <p className="text-4xl font-black text-primary mb-6">{(currentBalance + (parseInt(amountStr) || 0)).toLocaleString()}đ</p>
                   <p className="text-gray-400 text-xs">Mã giao dịch: ATC882910442</p>
               </div>

               <Button onClick={() => onNavigate(ScreenName.WALLET)}>Quay lại Ví</Button>
          </div>
      )
  }

   // --- RENDER: FAIL STATE (Image 19) ---
   if (step === 'fail') {
    return (
        <div className="h-full flex flex-col bg-bg-light p-6 items-center justify-center text-center animate-fade-in relative">
             <div className="absolute top-0 left-0 w-full p-4 pt-10 flex items-center">
                  <button onClick={() => onNavigate(ScreenName.WALLET)} className="w-10 h-10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-black font-bold">close</span>
                  </button>
                  <h2 className="text-lg font-bold flex-1 text-center pr-10">Nạp tiền thất bại</h2>
             </div>

             <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white">
                     <span className="material-symbols-outlined text-3xl font-bold">close</span>
                  </div>
             </div>
             
             <h1 className="text-2xl font-black text-text-main mb-2">Giao dịch thất bại</h1>
             <p className="text-red-500 text-sm font-bold bg-red-50 px-3 py-1 rounded-lg mb-4">Lý do: Ngân hàng đang bảo trì</p>
             <p className="text-gray-500 text-sm mb-8 px-8">Vui lòng thử lại sau hoặc sử dụng phương thức thanh toán khác.</p>
             
             <div className="w-full space-y-3">
                 <Button onClick={() => setStep('input')}>Thử lại</Button>
                 <Button variant="secondary" onClick={() => onNavigate(ScreenName.WALLET)}>Quay lại Ví</Button>
             </div>
        </div>
    )
}

  // --- RENDER: INPUT & AUTH STATE ---
  return (
    <div className="h-full flex flex-col bg-bg-light relative">
      {/* Header */}
      <div className="p-4 pt-10 flex items-center bg-white shadow-sm z-10 shrink-0">
        <button onClick={() => onNavigate(ScreenName.WALLET)} className="w-10 h-10 flex items-center justify-center">
          <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10">Nhập số tiền nạp</h2>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Balance & Input - Scrollable Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar min-h-0">
            <div className="flex flex-col items-center p-4 pt-6">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">SỐ DƯ HIỆN TẠI</p>
                <p className="text-lg font-black text-text-main mb-6">{currentBalance.toLocaleString()}đ</p>
                
                <p className="text-gray-500 text-sm font-medium mb-1">Số tiền muốn nạp</p>
                <div className="flex items-baseline gap-1 mb-6">
                    <span className={`font-black text-text-main ${amountStr.length > 6 ? 'text-4xl' : 'text-5xl'}`}>
                        {amountStr ? parseInt(amountStr).toLocaleString('vi-VN') : '0'}
                    </span>
                    <span className="text-3xl font-bold text-primary">đ</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 w-full mb-4">
                    {[50000, 100000, 200000, 500000].map(val => (
                        <button 
                            key={val}
                            onClick={() => setAmountStr(val.toString())}
                            className={`h-12 rounded-xl border border-gray-200 text-sm font-bold transition-all ${amountStr === val.toString() ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30' : 'bg-white text-text-main hover:bg-gray-50'}`}
                        >
                            {val.toLocaleString()}đ
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Keypad Area - Fixed Bottom */}
        <div className="bg-bg-light pb-6 pt-2 shrink-0 z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.03)] border-t border-gray-100/50">
          <Keypad onPress={handlePress} onDelete={handleDelete} className="pb-0 pt-0" />
          <div className="px-6 mt-4">
            <Button onClick={() => setStep('auth')} disabled={!amountStr || parseInt(amountStr) < 10000}>Tiếp tục</Button>
          </div>
        </div>
      </div>

      {/* --- AUTH OVERLAY (Image 17) --- */}
      {step === 'auth' && (
          <div className="absolute inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center animate-fade-in p-4">
              <div className="bg-white w-full rounded-3xl p-6 shadow-2xl animate-slide-up relative">
                  {/* Drag Handle */}
                  <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
                  
                  <h3 className="text-lg font-black text-center mb-8">Xác thực vân tay nạp tiền</h3>
                  
                  <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-center">
                          <span className="text-gray-500 font-medium text-sm">Nội dung</span>
                          <span className="font-bold text-text-main text-sm">Nạp tiền vào ví</span>
                      </div>
                      <div className="flex justify-between items-center">
                          <span className="text-gray-500 font-medium text-sm">Số tiền</span>
                          <span className="font-black text-primary text-lg">{parseInt(amountStr).toLocaleString()}đ</span>
                      </div>
                      <div className="flex justify-between items-center">
                          <span className="text-gray-500 font-medium text-sm">Nguồn</span>
                          <div className="flex items-center gap-2">
                              <div className="w-5 h-5 bg-blue-700 rounded text-[8px] text-white flex items-center justify-center font-bold">V</div>
                              <span className="font-bold text-text-main text-sm">Vietcombank</span>
                          </div>
                      </div>
                  </div>

                  <div className="flex flex-col items-center mb-6">
                      <button onClick={handleAuth} className="w-16 h-16 rounded-full bg-orange-50 text-primary border border-orange-100 flex items-center justify-center mb-4 active:scale-95 transition-transform">
                           <span className="material-symbols-outlined text-4xl">fingerprint</span>
                      </button>
                      <p className="text-center text-xs font-bold text-gray-500 max-w-[200px]">Chạm vào cảm biến vân tay để xác nhận</p>
                  </div>

                  <button onClick={() => setStep('input')} className="w-full py-3 text-gray-400 font-bold text-sm hover:text-gray-600">HỦY BỎ</button>
              </div>
          </div>
      )}
    </div>
  );
};

// --------------------------------------------------------------------------------
// 2. WITHDRAW SCREEN
// Flows: Input -> Select Bank -> Auth -> Success/Fail
// --------------------------------------------------------------------------------
export const WalletWithdrawScreen: React.FC<WalletFlowProps> = ({ onNavigate, currentBalance, onUpdateBalance }) => {
  const [amountStr, setAmountStr] = useState('');
  const [selectedBank, setSelectedBank] = useState('VCB');
  const [step, setStep] = useState<'input' | 'auth' | 'success' | 'fail'>('input');
  const [showKeypad, setShowKeypad] = useState(false);

  const handlePress = (key: string) => {
    const nextVal = amountStr + key;
    if (parseInt(nextVal) > currentBalance) return;
    setAmountStr(nextVal);
  };

  const handleDelete = () => {
    setAmountStr(prev => prev.slice(0, -1));
  };

  const handleAuth = () => {
      // Simulate Processing
      setTimeout(() => {
          onUpdateBalance(-parseInt(amountStr));
          setStep('success');
      }, 1500);
  }

  // --- RENDER: SUCCESS STATE (Image 22) ---
  if (step === 'success') {
      return (
        <div className="h-full flex flex-col bg-bg-light p-6 items-center justify-center text-center animate-fade-in relative">
            <div className="absolute top-0 left-0 w-full p-4 pt-10 flex items-center">
                <button onClick={() => onNavigate(ScreenName.WALLET)} className="w-10 h-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-black font-bold">close</span>
                </button>
                <h2 className="text-lg font-bold flex-1 text-center pr-10">Rút tiền</h2>
            </div>

            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-200">
                <span className="material-symbols-outlined text-white text-5xl font-bold">check</span>
            </div>
            
            <h1 className="text-2xl font-black text-text-main mb-2">Rút tiền thành công</h1>
            <p className="text-gray-500 text-sm mb-8 px-8">Tiền sẽ được chuyển vào tài khoản của bạn trong giây lát.</p>
            
            <div className="bg-white rounded-3xl p-6 w-full shadow-sm mb-8">
                <p className="text-gray-400 text-xs font-bold uppercase mb-2">SỐ DƯ CÒN LẠI</p>
                <p className="text-3xl font-black text-text-main">{(currentBalance - (parseInt(amountStr) || 0)).toLocaleString()}đ</p>
            </div>

            <Button onClick={() => onNavigate(ScreenName.WALLET)}>Quay lại Ví</Button>
        </div>
      )
  }

  // --- RENDER: FAIL STATE (Image 23) ---
  if (step === 'fail') {
       return (
           <div className="h-full flex flex-col bg-bg-light p-6 items-center justify-center text-center animate-fade-in relative">
                <div className="absolute top-0 left-0 w-full p-4 pt-10 flex items-center">
                     <button onClick={() => onNavigate(ScreenName.WALLET)} className="w-10 h-10 flex items-center justify-center">
                         <span className="material-symbols-outlined text-black font-bold">arrow_back</span>
                     </button>
                     <h2 className="text-lg font-bold flex-1 text-center pr-10">Rút tiền</h2>
                </div>
   
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                     <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-3xl font-bold">close</span>
                     </div>
                </div>
                
                <h1 className="text-2xl font-black text-text-main mb-2">Rút tiền thất bại</h1>
                <p className="text-gray-500 text-sm mb-8 px-8">Số dư không đủ hoặc ngân hàng đang bảo trì</p>
                
                <div className="w-full space-y-3">
                    <Button onClick={() => setStep('input')}>Thử lại</Button>
                    <Button variant="secondary" onClick={() => onNavigate(ScreenName.WALLET)}>Quay lại Ví</Button>
                </div>
           </div>
       )
   }

  return (
    <div className="h-full flex flex-col bg-bg-light relative">
      <div className="p-4 pt-10 flex items-center bg-white shadow-sm z-10 shrink-0">
        <button onClick={() => onNavigate(ScreenName.WALLET)} className="w-10 h-10 flex items-center justify-center">
          <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10">Nhập số tiền rút</h2>
      </div>

      <div className="flex-1 overflow-y-auto pb-4 no-scrollbar">
          <div className="p-6">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">SỐ DƯ CÓ THỂ RÚT</p>
                <p className="text-lg font-black text-text-main mb-6">{currentBalance.toLocaleString()}đ</p>

                <div 
                    onClick={() => setShowKeypad(true)}
                    className={`bg-white rounded-2xl border ${showKeypad ? 'border-primary ring-2 ring-primary/20' : 'border-primary'} p-4 mb-6 shadow-sm relative transition-all cursor-pointer`}
                >
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 text-center">SỐ TIỀN CẦN RÚT</p>
                    <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-black text-text-main">
                             {amountStr ? parseInt(amountStr).toLocaleString('vi-VN') : '0'}
                        </span>
                        <span className="text-2xl font-bold text-primary">đ</span>
                    </div>
                    {showKeypad && <div className="absolute inset-0 bg-transparent z-10"></div>}
                </div>

                <p className="text-xs font-bold text-text-main mb-3">Chọn tài khoản nhận tiền</p>
                <div className="space-y-3">
                    <div 
                        onClick={() => setSelectedBank('VCB')}
                        className={`bg-white p-4 rounded-xl border ${selectedBank === 'VCB' ? 'border-primary bg-orange-50/20' : 'border-gray-200'} flex items-center gap-3 cursor-pointer`}
                    >
                        <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-[10px]">Vietin</div>
                        <div className="flex-1">
                            <p className="font-bold text-sm">VietinBank</p>
                            <p className="text-[10px] text-gray-400">•••• 4412 - NGUYEN VAN A</p>
                        </div>
                        {selectedBank === 'VCB' ? (
                             <span className="material-symbols-outlined text-primary filled">check_circle</span>
                        ) : (
                             <div className="w-5 h-5 rounded-full border border-gray-300"></div>
                        )}
                    </div>

                    <div 
                        onClick={() => setSelectedBank('HDB')}
                        className={`bg-white p-4 rounded-xl border ${selectedBank === 'HDB' ? 'border-primary bg-orange-50/20' : 'border-gray-200'} flex items-center gap-3 cursor-pointer`}
                    >
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-[10px]">HDB</div>
                        <div className="flex-1">
                            <p className="font-bold text-sm">HDBank</p>
                            <p className="text-[10px] text-gray-400">•••• 8890 - NGUYEN VAN A</p>
                        </div>
                         {selectedBank === 'HDB' ? (
                             <span className="material-symbols-outlined text-primary filled">check_circle</span>
                        ) : (
                             <div className="w-5 h-5 rounded-full border border-gray-300"></div>
                        )}
                    </div>

                    <button className="w-full py-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center gap-2 text-primary font-bold text-xs hover:bg-white hover:border-primary transition-colors">
                        <span className="material-symbols-outlined text-sm filled">add_circle</span> Thêm tài khoản ngân hàng
                    </button>
                </div>
          </div>
      </div>
      
      <div className="px-6 pb-6 pt-2 bg-bg-light z-10 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
          <Button onClick={() => setStep('auth')} disabled={!amountStr || parseInt(amountStr) < 50000}>Tiếp tục</Button>
      </div>

       {/* --- KEYPAD OVERLAY --- */}
       {showKeypad && (
            <div className="absolute inset-0 z-40 flex flex-col justify-end animate-fade-in">
                <div className="flex-1 bg-black/30" onClick={() => setShowKeypad(false)}></div>
                <div className="bg-bg-light rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] pb-4 animate-slide-up">
                    <div className="flex justify-center p-2">
                        <div className="w-12 h-1 bg-gray-300 rounded-full my-1"></div>
                    </div>
                    <Keypad onPress={handlePress} onDelete={handleDelete} className="pb-0" />
                    <div className="px-6 mt-4">
                        <Button onClick={() => setShowKeypad(false)}>Xác nhận số tiền</Button>
                    </div>
                </div>
            </div>
       )}

       {/* --- AUTH OVERLAY (Image 21) --- */}
       {step === 'auth' && (
          <div className="absolute inset-0 z-50 bg-black/60 flex items-center justify-center animate-fade-in p-6">
              <div className="bg-white w-full rounded-3xl p-6 shadow-2xl animate-slide-up relative text-center">
                  <h3 className="text-lg font-black mb-6">Xác nhận rút tiền</h3>
                  
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3 mb-8 text-left">
                      <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-bold">Giao dịch</span>
                          <span className="font-bold text-text-main">Rút tiền về tài khoản</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-bold">Số tiền</span>
                          <span className="font-bold text-primary">{parseInt(amountStr).toLocaleString()}đ</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-500 font-bold">Đến</span>
                          <span className="font-bold text-text-main">VietinBank - **** 4412</span>
                      </div>
                  </div>

                  <div className="flex flex-col items-center mb-4">
                       <button onClick={handleAuth} className="w-16 h-16 rounded-full bg-orange-50 text-primary border border-orange-100 flex items-center justify-center mb-4 active:scale-95 transition-transform">
                           <span className="material-symbols-outlined text-4xl">fingerprint</span>
                      </button>
                      <h4 className="font-bold text-sm mb-1">Xác nhận để rút tiền</h4>
                      <p className="text-[10px] text-gray-500">Sử dụng vân tay hoặc FaceID</p>
                  </div>

                  <button onClick={() => setStep('input')} className="text-xs font-bold text-gray-400 hover:text-gray-600 mt-2">Hủy bỏ</button>
              </div>
          </div>
      )}
    </div>
  );
};

// --------------------------------------------------------------------------------
// 3. LINK BANK SCREEN
// Flows: Select -> Input -> OTP -> Success/Fail
// --------------------------------------------------------------------------------
export const WalletLinkBankScreen: React.FC<{ onNavigate: (screen: ScreenName) => void }> = ({ onNavigate }) => {
    // Steps: 'select' -> 'input' -> 'otp' -> 'success' | 'fail'
    const [step, setStep] = useState<'select' | 'input' | 'otp' | 'success' | 'fail'>('select');
    const [otp, setOtp] = useState('');

    const handleKeypadPress = (key: string) => {
        if (otp.length >= 6) return;
        setOtp(prev => prev + key);
    };

    const handleKeypadDelete = () => {
        setOtp(prev => prev.slice(0, -1));
    };

    const handleLinkConfirm = () => {
        // Simulate
        setTimeout(() => {
            setStep('success');
        }, 1500);
    }
    
    // --- RENDER: SUCCESS (Image 27) ---
    if (step === 'success') {
         return (
            <div className="h-full flex flex-col bg-bg-light p-6 items-center justify-center text-center animate-fade-in relative">
                <div className="absolute top-0 left-0 w-full p-4 pt-10 flex items-center">
                    <button onClick={() => onNavigate(ScreenName.WALLET)} className="w-10 h-10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-black font-bold">close</span>
                    </button>
                    <h2 className="text-lg font-bold flex-1 text-center pr-10">Liên kết ngân hàng</h2>
                </div>

                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-200">
                    <span className="material-symbols-outlined text-white text-5xl font-bold">check</span>
                </div>
                
                <h1 className="text-2xl font-black text-text-main mb-2">Liên kết thành công</h1>
                <p className="text-gray-500 text-sm mb-8 px-8">Tài khoản Vietcombank của bạn đã được liên kết với ATC Petro.</p>
                
                <div className="bg-white rounded-2xl p-4 w-full shadow-sm mb-8 flex items-center gap-4 border border-gray-100">
                     <div className="w-12 h-12 bg-green-800 rounded-lg text-white flex items-center justify-center font-bold text-xs">VCB</div>
                     <div className="flex-1 text-left">
                         <p className="font-bold text-sm text-text-main uppercase">NGUYEN VAN A</p>
                         <p className="text-[10px] text-gray-500">Vietcombank</p>
                         <p className="text-xs font-bold text-gray-400 mt-0.5">•••• 4412</p>
                     </div>
                     <span className="text-green-500 text-[10px] font-bold flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                         <span className="material-symbols-outlined text-sm filled">check_circle</span> ĐÃ XÁC THỰC
                     </span>
                </div>

                <Button onClick={() => onNavigate(ScreenName.WALLET)}>Bắt đầu sử dụng</Button>
            </div>
         )
    }

    // --- RENDER: OTP (Image 26) ---
    if (step === 'otp') {
        return (
            <div className="h-full flex flex-col bg-bg-light relative">
                 <div className="p-4 pt-10 flex items-center bg-white shadow-sm z-10">
                    <button onClick={() => setStep('input')} className="w-10 h-10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-lg font-bold flex-1 text-center pr-10">Xác thực liên kết</h2>
                </div>
                
                <div className="flex-1 p-6 text-center flex flex-col items-center pt-10">
                    <p className="text-sm text-gray-500 mb-8 max-w-[280px]">Vui lòng nhập mã OTP đã được gửi đến số điện thoại liên kết với ngân hàng của bạn</p>
                    
                    {/* 6 Digit OTP Display */}
                    <div className="flex gap-2 mb-6">
                        {[0,1,2,3,4,5].map(idx => (
                            <div key={idx} className={`w-12 h-14 rounded-lg border-2 flex items-center justify-center text-2xl font-bold ${otp[idx] ? 'border-primary text-primary bg-white' : 'border-gray-200 bg-white'}`}>
                                {otp[idx]}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-1 text-xs mb-8">
                        <span className="text-gray-400">Chưa nhận được mã?</span>
                        <button className="font-bold text-primary hover:underline">Gửi lại mã</button>
                        <span className="font-bold text-primary ml-1 flex items-center"><span className="material-symbols-outlined text-sm mr-0.5">timer</span> 01:59</span>
                    </div>

                    <div className="w-full mt-auto">
                        {/* Keypad */}
                        <Keypad onPress={handleKeypadPress} onDelete={handleKeypadDelete} className="px-0 pb-4" />
                        <Button onClick={handleLinkConfirm} disabled={otp.length < 6}>Xác nhận</Button>
                    </div>
                </div>
            </div>
        )
    }

    // --- RENDER: INPUT (Image 25) ---
    if (step === 'input') {
        return (
            <div className="h-full flex flex-col bg-bg-light relative">
                <div className="p-4 pt-10 flex items-center bg-white shadow-sm z-10">
                    <button onClick={() => setStep('select')} className="w-10 h-10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-lg font-bold flex-1 text-center pr-10">Nhập số tài khoản ngân hàng</h2>
                </div>

                <div className="flex-1 p-6">
                     <p className="text-xs text-gray-500 mb-6">Vui lòng nhập chính xác thông tin để thực hiện liên kết tài khoản ngân hàng của bạn.</p>
                     
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">SỐ TÀI KHOẢN / SỐ THẺ</p>
                     <input type="text" placeholder="Nhập số tài khoản hoặc số thẻ" className="w-full bg-white h-14 rounded-xl px-4 font-bold border border-gray-200 focus:border-primary outline-none transition-colors mb-4" />
                     
                     <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
                         <span className="material-symbols-outlined text-blue-600 text-lg filled mt-0.5">verified_user</span>
                         <p className="text-[10px] text-blue-800 leading-tight">Thông tin của bạn được bảo mật theo tiêu chuẩn quốc tế PCI DSS. Chúng tôi không lưu trữ thông tin thẻ của bạn.</p>
                     </div>
                </div>

                <div className="p-6">
                    <Button onClick={() => setStep('otp')}>Xác nhận liên kết</Button>
                </div>
            </div>
        )
    }

    // --- RENDER: SELECT (Image 24) ---
    return (
        <div className="h-full flex flex-col bg-bg-light relative">
            <div className="p-4 pt-10 flex items-center bg-white shadow-sm z-10">
                <button onClick={() => onNavigate(ScreenName.WALLET)} className="w-10 h-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold flex-1 text-center pr-10">Chọn ngân hàng liên kết</h2>
            </div>

            <div className="flex-1 p-6 overflow-y-auto pb-24">
                <div className="relative mb-6">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                    <input type="text" placeholder="Tìm kiếm ngân hàng..." className="w-full h-12 pl-10 pr-4 rounded-xl bg-white border border-gray-200 text-sm focus:border-primary outline-none" />
                </div>

                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">NGÂN HÀNG PHỔ BIẾN</p>
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setStep('input')} className="bg-white p-4 rounded-xl border-2 border-primary shadow-sm flex flex-col items-center justify-center gap-2 relative">
                        <span className="material-symbols-outlined text-primary text-sm filled absolute top-2 right-2">check_circle</span>
                        <div className="w-12 h-8 bg-blue-900 text-white flex items-center justify-center text-[10px] font-bold rounded">VCB</div>
                        <span className="text-xs font-bold text-text-main">Vietcombank</span>
                    </button>
                    <button onClick={() => setStep('input')} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors">
                        <div className="w-12 h-8 bg-red-600 text-white flex items-center justify-center text-[10px] font-bold rounded">TCB</div>
                        <span className="text-xs font-bold text-text-main">Techcombank</span>
                    </button>
                    <button onClick={() => setStep('input')} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors">
                        <div className="w-12 h-8 bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold rounded">BIDV</div>
                        <span className="text-xs font-bold text-text-main">BIDV</span>
                    </button>
                    <button onClick={() => setStep('input')} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors">
                        <div className="w-12 h-8 bg-green-700 text-white flex items-center justify-center text-[10px] font-bold rounded">VARB</div>
                        <span className="text-xs font-bold text-text-main">Agribank</span>
                    </button>
                     <button onClick={() => setStep('input')} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors">
                        <div className="w-12 h-8 bg-blue-900 text-white flex items-center justify-center text-[10px] font-bold rounded">CTG</div>
                        <span className="text-xs font-bold text-text-main">VietinBank</span>
                    </button>
                    <button onClick={() => setStep('input')} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-primary transition-colors">
                        <div className="w-12 h-8 bg-blue-800 text-white flex items-center justify-center text-[10px] font-bold rounded">MB</div>
                        <span className="text-xs font-bold text-text-main">MB Bank</span>
                    </button>
                </div>
            </div>
            
             <div className="p-6 border-t border-gray-100">
                <Button onClick={() => setStep('input')}>Tiếp tục</Button>
            </div>
        </div>
    );
}
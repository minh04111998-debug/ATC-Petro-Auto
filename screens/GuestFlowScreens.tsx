import React, { useState, useEffect } from 'react';
import { ScreenName, PumpMode } from '../types';
import { Button } from '../components/Button';
import { Keypad } from '../components/Keypad';

interface GuestProps {
  onNavigate: (screen: ScreenName) => void;
  guestConfig?: {mode: PumpMode, value: number} | null;
  setGuestConfig?: (config: any) => void;
}

// Helper to get amount from config
const getAmount = (config: any) => {
    if (!config) return 500000; // Default fallback
    if (config.mode === PumpMode.AMOUNT) return config.value;
    if (config.mode === PumpMode.LITERS) return config.value * 25000;
    return 500000;
}

// 1. Guest Scan QR (Simplified)
export const GuestScanScreen: React.FC<GuestProps> = ({ onNavigate }) => {
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setScanned(true);
            setTimeout(() => {
                onNavigate(ScreenName.GUEST_CONFIRM_PUMP);
            }, 800);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-full flex flex-col bg-black relative">
            <div className="absolute top-0 w-full p-4 pt-10 flex justify-between items-center z-10 text-white">
                 <button onClick={() => onNavigate(ScreenName.LOGIN)} className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full backdrop-blur-md">
                     <span className="material-symbols-outlined">arrow_back</span>
                 </button>
                 <div className="bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md">
                    <span className="text-xs font-bold">Đang quét mã QR vòi bơm</span>
                 </div>
                 <button className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full backdrop-blur-md">
                     <span className="material-symbols-outlined">flashlight_on</span>
                 </button>
            </div>

            <div className="flex-1 relative flex items-center justify-center">
                 {/* Camera Placeholder */}
                 <div className="absolute inset-0 bg-gray-900">
                    <img src="https://images.unsplash.com/photo-1626863905192-37508677bbdd?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" />
                 </div>

                 {/* Scan Frame */}
                 <div className={`w-72 h-72 border-4 rounded-3xl relative transition-all duration-300 ${scanned ? 'border-primary scale-95' : 'border-primary/50'}`}>
                      {/* Corner Accents */}
                      <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-2xl"></div>
                      <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-2xl"></div>
                      <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-2xl"></div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-2xl"></div>
                      
                      {/* Scanning Animation */}
                      {!scanned && <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_20px_rgba(242,127,13,0.8)] animate-scan"></div>}
                      
                      {/* Scan Icon/Text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80">
                           <span className="material-symbols-outlined text-5xl mb-2 opacity-50">qr_code_scanner</span>
                           <p className="text-xs font-medium">Đang tìm mã QR...</p>
                      </div>
                 </div>
            </div>

            <div className="bg-white rounded-t-3xl p-6 pb-8 animate-slide-up relative z-10">
                <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
                <div className="flex flex-col items-center text-center">
                     <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                        <span className="material-symbols-outlined">info</span>
                     </div>
                     <p className="text-sm text-gray-600 max-w-[250px] mb-6">Vui lòng đưa camera lại gần mã QR dán trên vòi bơm để bắt đầu</p>
                     <Button disabled className="bg-gray-200 text-gray-400 shadow-none">XÁC NHẬN VÒI BƠM</Button>
                </div>
            </div>
        </div>
    );
}

// 2. Guest Confirm Pump
export const GuestConfirmPumpScreen: React.FC<GuestProps> = ({ onNavigate }) => {
    return (
        <div className="h-full flex flex-col bg-black relative">
            <div className="absolute top-0 w-full p-4 pt-10 flex justify-between items-center z-10 text-white">
                 <button onClick={() => onNavigate(ScreenName.GUEST_SCAN)} className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full backdrop-blur-md">
                     <span className="material-symbols-outlined">arrow_back</span>
                 </button>
                 <div className="bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md">
                    <span className="text-xs font-bold">Xác nhận vòi bơm thành công</span>
                 </div>
                 <button className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full backdrop-blur-md">
                     <span className="material-symbols-outlined">flashlight_on</span>
                 </button>
            </div>
            
             <div className="flex-1 relative flex items-center justify-center">
                 <div className="absolute inset-0 bg-gray-900">
                    <img src="https://images.unsplash.com/photo-1626863905192-37508677bbdd?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" />
                 </div>

                 <div className={`w-72 h-72 border-4 border-primary rounded-3xl relative flex items-center justify-center`}>
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg animate-fade-in">
                          <span className="material-symbols-outlined text-white text-3xl font-bold">check</span>
                      </div>
                      
                      <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-2xl"></div>
                      <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-2xl"></div>
                      <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-2xl"></div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-2xl"></div>
                 </div>
            </div>

            <div className="bg-white rounded-t-3xl p-6 pb-8 animate-slide-up relative z-10">
                <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
                
                <div className="flex items-center gap-2 mb-4">
                     <span className="material-symbols-outlined text-green-500 filled">check_circle</span>
                     <span className="text-xs font-bold text-green-600 uppercase tracking-wider">ĐÃ NHẬN DIỆN THIẾT BỊ</span>
                </div>
                
                <h2 className="text-xl font-black text-text-main mb-6">Trạm xăng: ATC Petro #01</h2>

                <div className="flex gap-3 mb-6">
                    <div className="flex-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
                         <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">TRỤ BƠM</p>
                         <p className="text-lg font-black text-text-main">04</p>
                    </div>
                     <div className="flex-1 bg-gray-50 p-3 rounded-xl border border-gray-100">
                         <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">VÒI BƠM</p>
                         <p className="text-lg font-black text-text-main">A</p>
                    </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-xl flex justify-between items-center mb-6">
                    <div>
                         <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">LOẠI NHIÊN LIỆU</p>
                         <p className="text-base font-bold text-primary">Xăng RON 95-V</p>
                    </div>
                    <div className="text-right">
                         <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">ĐƠN GIÁ</p>
                         <p className="text-base font-bold text-text-main">25.000đ<span className="text-xs font-normal text-gray-400">/Lít</span></p>
                    </div>
                </div>

                <Button onClick={() => onNavigate(ScreenName.GUEST_INPUT_AMOUNT)}>XÁC NHẬN VÒI BƠM</Button>
            </div>
        </div>
    )
}

// 3. Guest Input Amount
export const GuestInputAmountScreen: React.FC<GuestProps> = ({ onNavigate, setGuestConfig }) => {
    const [mode, setMode] = useState<PumpMode>(PumpMode.AMOUNT);
    const [inputValue, setInputValue] = useState('0');

    // Handle Tab Switch
    const switchMode = (newMode: PumpMode) => {
        setMode(newMode);
        setInputValue('0');
    };

    // Keypad Handlers
    const handlePress = (key: string) => {
        if (inputValue.length > 9) return;
        if (key === '.' && inputValue.includes('.')) return;
        
        setInputValue(prev => {
            if (prev === '0' && key !== '.') return key;
            return prev + key;
        });
    };

    const handleDelete = () => {
        setInputValue(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    };

    // Handle Suggestion Click
    const handleSuggestion = (val: string) => {
        setInputValue(val);
    };

    const handleConfirm = () => {
        const val = parseFloat(inputValue);
        if (val <= 0) return;

        if(setGuestConfig) {
             setGuestConfig({
                 mode: mode,
                 value: val
             });
        }
        onNavigate(ScreenName.GUEST_INVOICE_INFO);
    }
    
    // Formatting for Display
    const formattedValue = mode === PumpMode.AMOUNT 
        ? parseInt(inputValue).toLocaleString() 
        : inputValue;

    const estimatedValue = mode === PumpMode.AMOUNT 
        ? (parseInt(inputValue) / 25000).toFixed(2) + ' Lít'
        : (parseFloat(inputValue) * 25000).toLocaleString() + ' VND';

    return (
        <div className="h-full flex flex-col bg-bg-light">
             <div className="p-4 pt-10 flex items-center bg-white shadow-sm z-10 shrink-0">
                <button onClick={() => onNavigate(ScreenName.GUEST_CONFIRM_PUMP)} className="w-10 h-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold flex-1 text-center pr-10">Nhập nhu cầu đổ nhiên liệu</h2>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto no-scrollbar p-6 pb-2">
                    {/* Tabs */}
                    <div className="bg-white p-1.5 rounded-xl flex gap-1 shadow-sm border border-gray-100 mb-6">
                        <button 
                            onClick={() => switchMode(PumpMode.AMOUNT)}
                            className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${mode === PumpMode.AMOUNT ? 'bg-gray-100 text-text-main' : 'text-gray-400'}`}
                        >
                            Nhập số tiền
                        </button>
                        <button 
                            onClick={() => switchMode(PumpMode.LITERS)}
                            className={`flex-1 py-3 text-xs font-bold rounded-lg transition-all ${mode === PumpMode.LITERS ? 'bg-gray-100 text-text-main' : 'text-gray-400'}`}
                        >
                            Nhập số lít
                        </button>
                    </div>

                    {/* Main Display */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 text-center">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-gray-400 uppercase">
                                {mode === PumpMode.AMOUNT ? 'Số tiền muốn đổ' : 'Số lít muốn đổ'}
                            </span>
                            <span className="text-[10px] font-bold text-primary bg-orange-50 px-2 py-1 rounded">
                                {mode === PumpMode.AMOUNT ? 'VND' : 'LÍT'}
                            </span>
                        </div>
                        
                        <div className="flex items-baseline justify-center gap-1 mb-2">
                             <h1 className="text-4xl font-black text-text-main tracking-tight">
                                {formattedValue}
                             </h1>
                             <span className="text-lg font-bold text-gray-400">
                                {mode === PumpMode.LITERS && 'L'}
                             </span>
                        </div>
                        
                        <p className="text-sm font-bold text-gray-400">
                            ~ {estimatedValue}
                        </p>
                    </div>

                    {/* Suggestions */}
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Gợi ý nhanh</p>
                    <div className="flex gap-3 mb-4">
                        {mode === PumpMode.AMOUNT ? (
                            <>
                                <button onClick={() => handleSuggestion('200000')} className="flex-1 py-3 rounded-xl text-sm font-bold border border-gray-200 bg-white text-gray-600 active:bg-orange-50 active:border-primary active:text-primary transition-colors">200k</button>
                                <button onClick={() => handleSuggestion('500000')} className="flex-1 py-3 rounded-xl text-sm font-bold border border-gray-200 bg-white text-gray-600 active:bg-orange-50 active:border-primary active:text-primary transition-colors">500k</button>
                                <button onClick={() => handleSuggestion('1000000')} className="flex-1 py-3 rounded-xl text-sm font-bold border border-gray-200 bg-white text-gray-600 active:bg-orange-50 active:border-primary active:text-primary transition-colors">1Tr</button>
                            </>
                        ) : (
                             <>
                                <button onClick={() => handleSuggestion('2')} className="flex-1 py-3 rounded-xl text-sm font-bold border border-gray-200 bg-white text-gray-600 active:bg-orange-50 active:border-primary active:text-primary transition-colors">2L</button>
                                <button onClick={() => handleSuggestion('5')} className="flex-1 py-3 rounded-xl text-sm font-bold border border-gray-200 bg-white text-gray-600 active:bg-orange-50 active:border-primary active:text-primary transition-colors">5L</button>
                                <button onClick={() => handleSuggestion('10')} className="flex-1 py-3 rounded-xl text-sm font-bold border border-gray-200 bg-white text-gray-600 active:bg-orange-50 active:border-primary active:text-primary transition-colors">10L</button>
                            </>
                        )}
                    </div>

                    <p className="text-center text-[10px] text-gray-400 italic px-4 leading-relaxed">
                        "Nếu đổ không hết tiền, hệ thống sẽ hoàn lại phần dư vào tài khoản của bạn"
                    </p>
                </div>

                {/* Keypad & Confirm */}
                <div className="bg-bg-light shadow-[0_-5px_20px_rgba(0,0,0,0.03)] border-t border-gray-100 z-20 pb-6 pt-2">
                    <Keypad onPress={handlePress} onDelete={handleDelete} className="pb-4 pt-0" />
                    <div className="px-6">
                        <Button onClick={handleConfirm} disabled={parseFloat(inputValue) <= 0}>Xác nhận nhu cầu</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// 4. Guest Invoice Info
export const GuestInvoiceInfoScreen: React.FC<GuestProps> = ({ onNavigate }) => {
    return (
        <div className="h-full flex flex-col bg-bg-light">
             <div className="p-4 pt-10 flex items-center bg-white shadow-sm z-10">
                <button onClick={() => onNavigate(ScreenName.GUEST_INPUT_AMOUNT)} className="w-10 h-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold flex-1 text-center pr-10">Thông tin hóa đơn</h2>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                     <div className="flex justify-between items-start mb-4">
                         <h3 className="font-bold text-text-main">Thông tin hóa đơn chi tiết</h3>
                         <span className="text-[10px] text-gray-400">(Tùy chọn)</span>
                     </div>
                     <p className="text-xs text-gray-500 mb-6">Vui lòng nhập thông tin bên dưới để nhận hóa đơn VAT cho giao dịch của bạn tại hệ thống.</p>

                     <div className="space-y-4">
                         <div>
                             <label className="block text-[10px] font-bold text-gray-500 mb-1.5 ml-1">Tên đơn vị</label>
                             <input type="text" placeholder="Nhập tên công ty/đơn vị" className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-primary" />
                         </div>
                         <div>
                             <label className="block text-[10px] font-bold text-gray-500 mb-1.5 ml-1">Địa chỉ</label>
                             <input type="text" placeholder="Số nhà, tên đường, phường/xã..." className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-primary" />
                         </div>
                         <div>
                             <label className="block text-[10px] font-bold text-gray-500 mb-1.5 ml-1">Mã số thuế</label>
                             <input type="text" placeholder="Nhập mã số thuế" className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-primary" />
                         </div>
                         <div>
                             <label className="block text-[10px] font-bold text-gray-500 mb-1.5 ml-1">Người mua hàng</label>
                             <input type="text" placeholder="Họ và tên người mua" className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-primary" />
                         </div>
                          <div>
                             <label className="block text-[10px] font-bold text-gray-500 mb-1.5 ml-1">Email nhận hóa đơn</label>
                             <input type="email" placeholder="example@gmail.com" className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-primary" />
                         </div>
                         <div>
                             <label className="block text-[10px] font-bold text-gray-500 mb-1.5 ml-1">Biển số xe</label>
                             <input type="text" defaultValue="51H - 123.45" className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-primary font-bold" />
                         </div>
                     </div>
                </div>
                <div className="h-4"></div>
                <p className="text-[10px] text-gray-400 text-center px-6 leading-tight">
                    Bằng cách nhấn tiếp tục, bạn đồng ý với các điều khoản về bảo mật thông tin của chúng tôi.
                </p>
            </div>

            <div className="p-6 pb-8 bg-white border-t border-gray-50">
                <Button onClick={() => onNavigate(ScreenName.GUEST_PAYMENT_METHOD)}>Tiếp tục</Button>
            </div>
        </div>
    );
}

// 5. Guest Payment Method
export const GuestPaymentMethodScreen: React.FC<GuestProps> = ({ onNavigate }) => {
    const [selected, setSelected] = useState<'QR' | 'BANK' | 'EWALLET'>('QR');

    const handleContinue = () => {
        if (selected === 'QR') onNavigate(ScreenName.GUEST_PAYMENT_QR);
        else if (selected === 'BANK') onNavigate(ScreenName.GUEST_PAYMENT_BANK_LIST);
        else if (selected === 'EWALLET') onNavigate(ScreenName.GUEST_PAYMENT_WALLET);
    };

    return (
        <div className="h-full flex flex-col bg-bg-light">
             <div className="p-4 pt-10 flex items-center bg-white shadow-sm z-10">
                <button onClick={() => onNavigate(ScreenName.GUEST_INVOICE_INFO)} className="w-10 h-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold flex-1 text-center pr-10">Chọn phương thức thanh toán</h2>
            </div>

            <div className="flex-1 p-6">
                <p className="text-xs text-gray-500 mb-4">Phương thức thanh toán</p>
                <p className="text-[10px] text-gray-400 mb-4">Vui lòng chọn một phương thức để tiếp tục</p>

                <div className="space-y-3">
                    <div 
                        onClick={() => setSelected('QR')}
                        className={`bg-white p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${selected === 'QR' ? 'border-primary ring-1 ring-primary shadow-sm' : 'border-gray-200'}`}
                    >
                        <div className="w-10 h-10 bg-orange-50 text-primary rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined filled">qr_code_scanner</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-sm text-text-main">QR Code</h4>
                            <p className="text-[10px] text-gray-400">Thanh toán qua mã QR</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selected === 'QR' ? 'border-primary' : 'border-gray-300'}`}>
                            {selected === 'QR' && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                        </div>
                    </div>

                    <div 
                        onClick={() => setSelected('BANK')}
                        className={`bg-white p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${selected === 'BANK' ? 'border-primary ring-1 ring-primary shadow-sm' : 'border-gray-200'}`}
                    >
                        <div className="w-10 h-10 bg-gray-50 text-gray-600 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined">account_balance</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-sm text-text-main">Internet Banking</h4>
                            <p className="text-[10px] text-gray-400">Chuyển khoản ngân hàng</p>
                        </div>
                         <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selected === 'BANK' ? 'border-primary' : 'border-gray-300'}`}>
                            {selected === 'BANK' && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                        </div>
                    </div>

                     <div 
                        onClick={() => setSelected('EWALLET')}
                        className={`bg-white p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${selected === 'EWALLET' ? 'border-primary ring-1 ring-primary shadow-sm' : 'border-gray-200'}`}
                    >
                        <div className="w-10 h-10 bg-gray-50 text-gray-600 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined">wallet</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-sm text-text-main">Ví điện tử</h4>
                            <p className="text-[10px] text-gray-400">Ứng dụng VNPay hoặc MoMo</p>
                        </div>
                         <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selected === 'EWALLET' ? 'border-primary' : 'border-gray-300'}`}>
                            {selected === 'EWALLET' && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 pb-8 bg-white border-t border-gray-50">
                <Button onClick={handleContinue}>Thanh toán</Button>
            </div>
        </div>
    )
}

// 6. Guest Payment QR Code
export const GuestPaymentQRScreen: React.FC<GuestProps> = ({ onNavigate, guestConfig }) => {
    const amount = getAmount(guestConfig);
    
    useEffect(() => {
        // Simulate waiting for payment
        const timer = setTimeout(() => {
            onNavigate(ScreenName.GUEST_PAYMENT_PROCESS);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
         <div className="h-full flex flex-col bg-bg-light">
             <div className="p-4 pt-10 flex items-center bg-white shadow-sm z-10 shrink-0">
                <button onClick={() => onNavigate(ScreenName.GUEST_PAYMENT_METHOD)} className="w-10 h-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold flex-1 text-center pr-10">Thanh toán QR Code</h2>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-6">
                <div className="min-h-full flex flex-col items-center justify-center text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">TỔNG THANH TOÁN</p>
                    <h1 className="text-4xl font-black text-text-main mb-2">{amount.toLocaleString()}đ</h1>
                    <span className="bg-gray-200 text-gray-500 text-[10px] font-bold px-2 py-1 rounded mb-8">Mã đơn hàng: #ATC98210</span>

                    <div className="bg-green-500 p-6 rounded-3xl shadow-lg relative mb-6">
                        <div className="bg-white p-4 rounded-xl">
                            {/* QR Placeholder */}
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ExamplePayment" alt="Payment QR" className="w-48 h-48 mix-blend-multiply" />
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border border-gray-100 px-3 py-1 rounded-full shadow-sm">
                            <span className="text-[10px] font-black text-green-600">VietQR</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-red-500 font-bold text-sm mb-2">
                        <span className="material-symbols-outlined text-base">timer</span> Mã QR hết hạn trong: 04:59
                    </div>
                    <p className="text-xs text-gray-400 max-w-[250px]">Mở ứng dụng ngân hàng hoặc ví điện tử để quét mã thanh toán này.</p>
                
                    <div className="bg-[#FFF8E1] p-4 rounded-xl text-left flex gap-3 mt-8 w-full border border-[#FFE082]">
                        <span className="material-symbols-outlined text-yellow-600">info</span>
                        <div>
                            <h4 className="font-bold text-sm text-yellow-800 mb-1">Hướng dẫn thanh toán</h4>
                            <ol className="text-[10px] text-yellow-700 list-decimal pl-3 space-y-1">
                                <li>Mở ứng dụng ngân hàng bất kỳ</li>
                                <li>Chọn tính năng quét mã QR Pay</li>
                                <li>Kiểm tra thông tin & xác nhận</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

             <div className="p-6 pb-8 bg-white border-t border-gray-50 shrink-0">
                <Button variant="secondary" className="bg-gray-900 text-white border-none" onClick={() => onNavigate(ScreenName.GUEST_PAYMENT_PROCESS)}>
                    <span className="material-symbols-outlined text-base mr-2">download</span> Lưu mã QR
                </Button>
            </div>
         </div>
    )
}

// 7. NEW: Guest Payment Bank List Screen (Image 1)
export const GuestPaymentBankListScreen: React.FC<GuestProps> = ({ onNavigate, guestConfig }) => {
    const amount = getAmount(guestConfig);

    return (
        <div className="h-full flex flex-col bg-bg-light">
             <div className="p-4 pt-10 flex items-center bg-white shadow-sm z-10">
                <button onClick={() => onNavigate(ScreenName.GUEST_PAYMENT_METHOD)} className="w-10 h-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold flex-1 text-center pr-10">Thanh toán Internet Banking</h2>
            </div>

            <div className="flex-1 p-6 overflow-y-auto no-scrollbar pb-32">
                <div className="text-center mb-6">
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">TỔNG THANH TOÁN</p>
                     <h1 className="text-3xl font-black text-text-main">{amount.toLocaleString()}đ</h1>
                </div>

                <div className="relative mb-6">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                    <input type="text" placeholder="Tìm kiếm ngân hàng..." className="w-full h-12 pl-10 pr-4 rounded-xl bg-white border border-gray-200 text-sm focus:border-primary outline-none" />
                </div>

                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">NGÂN HÀNG PHỔ BIẾN</p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                    {['Vietcombank', 'Techcombank', 'BIDV', 'VietinBank', 'MB Bank', 'TPBank'].map((bank, i) => (
                        <button key={i} onClick={() => onNavigate(ScreenName.GUEST_PAYMENT_BANK_DETAIL)} className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-primary transition-all aspect-square">
                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-[8px] font-bold text-gray-600">LOGO</div>
                            <span className="text-[10px] font-bold text-text-main text-center leading-tight">{bank}</span>
                        </button>
                    ))}
                </div>

                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">DANH SÁCH NGÂN HÀNG KHÁC</p>
                <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
                    {['Agribank', 'ACB', 'Sacombank'].map((bank, i) => (
                        <button key={i} onClick={() => onNavigate(ScreenName.GUEST_PAYMENT_BANK_DETAIL)} className="w-full flex items-center p-4 hover:bg-gray-50">
                             <div className="w-8 h-8 bg-gray-100 rounded mr-3 flex items-center justify-center text-[8px] font-bold text-gray-600">ICON</div>
                             <span className="flex-1 text-left text-sm font-bold text-text-main">{bank}</span>
                             <span className="material-symbols-outlined text-gray-300 text-sm">chevron_right</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6 pb-8 bg-white border-t border-gray-50">
                <Button onClick={() => onNavigate(ScreenName.GUEST_PAYMENT_BANK_DETAIL)}>Tiếp tục <span className="material-symbols-outlined text-lg">arrow_forward</span></Button>
            </div>
        </div>
    )
}

// 8. NEW: Guest Payment Bank Detail Screen (Image 2)
export const GuestPaymentBankDetailScreen: React.FC<GuestProps> = ({ onNavigate, guestConfig }) => {
    const amount = getAmount(guestConfig);

    return (
        <div className="h-full flex flex-col bg-bg-light">
             <div className="p-4 pt-10 flex items-center bg-white shadow-sm z-10">
                <button onClick={() => onNavigate(ScreenName.GUEST_PAYMENT_BANK_LIST)} className="w-10 h-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold flex-1 text-center pr-10">Chi tiết chuyển khoản</h2>
            </div>

            <div className="flex-1 p-6 overflow-y-auto no-scrollbar pb-32">
                <div className="text-center mb-6">
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">SỐ TIỀN CẦN THANH TOÁN</p>
                     <h1 className="text-3xl font-black text-primary">{amount.toLocaleString()}đ</h1>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 flex flex-col items-center mb-6">
                    <div className="w-full aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=BankTransfer" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
                    </div>
                    <p className="text-[10px] text-gray-400 text-center">Quét mã QR để thanh toán nhanh qua ứng dụng ngân hàng</p>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                        <div className="w-10 h-10 bg-blue-900 rounded text-white flex items-center justify-center text-[10px] font-bold">VCB</div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">NGÂN HÀNG</p>
                            <p className="font-bold text-text-main">Vietcombank</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                             <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">TÊN CHỦ TÀI KHOẢN</p>
                             <p className="font-bold text-text-main text-sm">CONG TY CO PHAN ATC PETRO</p>
                        </div>
                        <div>
                             <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">SỐ TÀI KHOẢN</p>
                             <div className="flex justify-between items-center">
                                 <p className="font-black text-text-main text-lg tracking-wide">1234567890</p>
                                 <button className="bg-gray-100 hover:bg-gray-200 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 text-text-main transition-colors">
                                     <span className="material-symbols-outlined text-xs">content_copy</span> Sao chép
                                 </button>
                             </div>
                        </div>
                         <div>
                             <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">NỘI DUNG CHUYỂN KHOẢN</p>
                             <div className="flex justify-between items-center">
                                 <p className="font-bold text-text-main text-sm">ATCPETRO 998877</p>
                                 <button className="bg-primary text-white hover:bg-primary-dark text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 transition-colors">
                                     <span className="material-symbols-outlined text-xs">content_copy</span> Sao chép
                                 </button>
                             </div>
                        </div>
                    </div>
                </div>
                
                 <div className="mt-6 flex gap-2 items-start px-2">
                     <span className="material-symbols-outlined text-primary text-sm mt-0.5">info</span>
                     <p className="text-[10px] text-gray-500 leading-tight">Vui lòng nhập <span className="font-bold">chính xác</span> nội dung chuyển khoản để hệ thống tự động xác nhận giao dịch trong 30 giây.</p>
                 </div>
            </div>

            <div className="p-6 pb-8 bg-white border-t border-gray-50">
                <Button onClick={() => onNavigate(ScreenName.GUEST_PAYMENT_PROCESS)}>XÁC NHẬN</Button>
            </div>
        </div>
    )
}

// 9. NEW: Guest Payment Wallet Screen (Image 3)
export const GuestPaymentWalletScreen: React.FC<GuestProps> = ({ onNavigate, guestConfig }) => {
    const amount = getAmount(guestConfig);
    const [selectedWallet, setSelectedWallet] = useState('MOMO');

    return (
        <div className="h-full flex flex-col bg-bg-light">
             <div className="p-4 pt-10 flex items-center bg-white shadow-sm z-10">
                <button onClick={() => onNavigate(ScreenName.GUEST_PAYMENT_METHOD)} className="w-10 h-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold flex-1 text-center pr-10">Thanh toán Ví điện tử</h2>
            </div>

            <div className="flex-1 p-6 overflow-y-auto no-scrollbar pb-32">
                <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 mb-6">
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">TỔNG TIỀN THANH TOÁN</p>
                     <h1 className="text-3xl font-black text-text-main mb-2">{amount.toLocaleString()}đ</h1>
                     <span className="bg-orange-50 text-primary text-[10px] font-bold px-2 py-1 rounded">
                        <span className="material-symbols-outlined text-[10px] mr-1 align-middle">receipt_long</span> 
                        Mã đơn: ATC-240982
                     </span>
                </div>

                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">CHỌN VÍ ĐIỆN TỬ</p>
                
                <div className="space-y-3">
                    <button 
                        onClick={() => setSelectedWallet('MOMO')}
                        className={`w-full bg-white p-4 rounded-xl border transition-all flex items-center gap-4 ${selectedWallet === 'MOMO' ? 'border-primary ring-1 ring-primary shadow-sm' : 'border-gray-200'}`}
                    >
                        <div className="w-12 h-12 bg-[#A50064] rounded-xl flex items-center justify-center text-white font-bold text-[10px]">MOMO</div>
                        <div className="flex-1 text-left">
                            <h4 className="font-bold text-sm text-text-main">Ví MoMo</h4>
                            <p className="text-[10px] text-gray-400">Tự động mở ứng dụng MoMo</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedWallet === 'MOMO' ? 'border-primary' : 'border-gray-300'}`}>
                            {selectedWallet === 'MOMO' && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                        </div>
                    </button>

                     <button 
                        onClick={() => setSelectedWallet('VNPAY')}
                        className={`w-full bg-white p-4 rounded-xl border transition-all flex items-center gap-4 ${selectedWallet === 'VNPAY' ? 'border-primary ring-1 ring-primary shadow-sm' : 'border-gray-200'}`}
                    >
                        <div className="w-12 h-12 bg-[#005BAA] rounded-xl flex items-center justify-center text-white font-bold text-[10px]">VNPAY</div>
                        <div className="flex-1 text-left">
                            <h4 className="font-bold text-sm text-text-main">Ví VNPay</h4>
                            <p className="text-[10px] text-gray-400">Tự động mở ứng dụng VNPay</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedWallet === 'VNPAY' ? 'border-primary' : 'border-gray-300'}`}>
                            {selectedWallet === 'VNPAY' && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                        </div>
                    </button>
                </div>
            </div>

            <div className="p-6 pb-8 bg-white border-t border-gray-50">
                <Button onClick={() => onNavigate(ScreenName.GUEST_PAYMENT_PROCESS)}>
                    <span className="material-symbols-outlined text-lg filled">bolt</span> Xác nhận thanh toán
                </Button>
                <p className="text-[9px] text-gray-400 text-center mt-3 px-4 leading-tight">
                    Bằng việc nhấn xác nhận, bạn đồng ý với các Điều khoản & Chính sách giao dịch của ATC Petro
                </p>
            </div>
        </div>
    )
}

// 10. Payment Process & Hold (Xử lý thanh toán & Giữ tiền) - UPDATED UI
export const GuestPaymentProcessScreen: React.FC<GuestProps> = ({ onNavigate }) => {
    return (
        <div className="h-full flex flex-col bg-white relative">
            {/* Header */}
            <div className="p-4 pt-10 flex items-center shrink-0">
                <button onClick={() => onNavigate(ScreenName.GUEST_PAYMENT_METHOD)} className="w-10 h-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary font-bold">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-black flex-1 text-center pr-10 uppercase tracking-widest text-text-main">ATC PETRO</h2>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-6">
                <div className="min-h-full flex flex-col items-center justify-center text-center">
                    {/* Success Icon */}
                    <div className="mb-6">
                        <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-200">
                            <span className="material-symbols-outlined text-white text-5xl font-bold">check</span>
                        </div>
                    </div>

                    <h1 className="text-2xl font-black text-text-main mb-3">Thanh toán thành công</h1>
                    <p className="text-gray-500 text-sm px-4 mb-8 leading-relaxed">
                        Tiền đã được giữ tạm thời để chuẩn bị cho quá trình bơm nhiên liệu.
                    </p>

                    {/* Pump Card */}
                    <div className="w-full bg-white rounded-3xl shadow-lg border-2 border-primary p-4 mb-8 relative overflow-hidden">
                        <div className="w-full h-40 bg-gray-100 rounded-2xl overflow-hidden mb-4 relative">
                            <img src="https://images.unsplash.com/photo-1545622783-b3e021430fee?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" />
                            <div className="absolute top-3 left-3 bg-[#F27F0D] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                                TRỤ 04
                            </div>
                        </div>
                        <h3 className="font-bold text-primary text-xl mb-1">Vòi bơm đã sẵn sàng</h3>
                        <p className="text-xs text-gray-500 px-2 leading-relaxed">
                            Vui lòng nhấc vòi tại trụ bơm số 4 để bắt đầu tiếp nhiên liệu ngay bây giờ.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Hệ thống đã kết nối</span>
                    </div>
                </div>
            </div>

            <div className="p-6 pb-8 bg-white shrink-0">
                <Button onClick={() => onNavigate(ScreenName.GUEST_PUMPING)}>
                    Bắt đầu bơm <span className="material-symbols-outlined text-lg ml-1 filled">local_gas_station</span>
                </Button>
                <p className="text-[9px] text-gray-400 text-center mt-3">Gặp sự cố? Liên hệ nhân viên trạm hoặc nhấn nút hỗ trợ.</p>
            </div>
        </div>
    )
}

// 11. Guest Pumping (Updated UI to match image)
export const GuestPumpingScreen: React.FC<GuestProps> = ({ onNavigate, guestConfig }) => {
    const [progress, setProgress] = useState(0);
    const [liters, setLiters] = useState(0);
    const [cost, setCost] = useState(0);

    // Dynamic targets
    const targetCost = getAmount(guestConfig);
    // Simulating refund logic: if input > 1,000,000, stop at 1,000,000 to show refund flow
    const actualPumpCost = targetCost > 1000000 ? 1000000 : targetCost; 

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + 1; // Increase speed: 1% per 50ms = 5s total
                if (next >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                const currentRatio = next / 100;
                // Ensure precise calculation
                setCost(currentRatio * actualPumpCost);
                setLiters((currentRatio * actualPumpCost) / 25000); 
                return next;
            });
        }, 50);

        // Finish after 5.5s to ensure full completion visual
        const finishTimer = setTimeout(() => {
            onNavigate(ScreenName.GUEST_PUMP_COMPLETE);
        }, 5500);

        return () => { clearInterval(interval); clearTimeout(finishTimer); }
    }, []);

    return (
        <div className="h-full flex flex-col bg-bg-light font-sans">
             {/* Header Card */}
             <div className="m-4 mt-10 p-4 bg-white rounded-2xl shadow-sm flex items-center justify-center gap-3">
                 <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-primary">
                     <span className="material-symbols-outlined text-sm filled">local_gas_station</span>
                 </div>
                 <span className="font-bold text-sm text-text-main">Trạm số 1 - RON 95-V</span>
            </div>

            <div className="flex-1 px-4 flex flex-col items-center">
                <div className="flex items-center gap-3 mb-8 self-start px-2 mt-4">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <h1 className="text-2xl font-black text-text-main">Đang bơm xăng...</h1>
                </div>
                
                {/* Liters Card */}
                <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4 h-32 flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">SỐ LÍT ĐÃ BƠM</p>
                    <div className="flex items-baseline">
                        <span className="text-5xl font-black text-text-main tracking-tighter">{liters.toFixed(2)}</span>
                        <span className="text-xl font-bold text-primary ml-1">L</span>
                    </div>
                </div>

                 {/* Cost Card */}
                 <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 h-32 flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">THÀNH TIỀN</p>
                    <div className="flex items-baseline">
                        <span className="text-4xl font-black text-primary tracking-tighter">{Math.floor(cost).toLocaleString()}</span>
                        <span className="text-base font-bold text-text-main ml-1">VND</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full px-2 mb-auto">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-text-main">Tiến độ bơm</span>
                        <span className="text-xs font-bold text-primary">{Math.floor(progress)}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>

            <div className="p-6 pb-8">
                 <Button variant="danger" className="bg-[#E91E63] shadow-lg shadow-pink-200">
                     <span className="material-symbols-outlined text-sm filled">power_settings_new</span> DỪNG BƠM
                 </Button>
            </div>
        </div>
    )
}

// 12. NEW: Guest Pump Complete Screen (Image 2)
export const GuestPumpCompleteScreen: React.FC<GuestProps> = ({ onNavigate, guestConfig }) => {
    // Logic for dynamic values
    const prepaidAmount = getAmount(guestConfig);
    // Simulating refund logic same as pumping screen
    const actualCost = prepaidAmount > 1000000 ? 1000000 : prepaidAmount; 
    const finalLiters = actualCost / 25000;
    const refundAmount = prepaidAmount - actualCost;

    return (
        <div className="h-full flex flex-col bg-bg-light font-sans animate-fade-in">
             {/* Header Card */}
             <div className="m-4 mt-10 p-4 bg-white rounded-2xl shadow-sm flex items-center justify-center gap-3">
                 <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-primary">
                     <span className="material-symbols-outlined text-sm filled">local_gas_station</span>
                 </div>
                 <span className="font-bold text-sm text-text-main">Trạm số 1 - RON 95-V</span>
            </div>

            <div className="flex-1 px-4 flex flex-col items-center">
                <div className="flex items-center gap-3 mb-8 self-start px-2 mt-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-sm font-bold">check</span>
                    </div>
                    <h1 className="text-2xl font-black text-text-main">Bơm xăng hoàn tất</h1>
                </div>
                
                {/* Liters Card */}
                <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4 h-32 flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">SỐ LÍT ĐÃ BƠM</p>
                    <div className="flex items-baseline">
                        <span className="text-5xl font-black text-text-main tracking-tighter">{finalLiters.toFixed(2)}</span>
                        <span className="text-xl font-bold text-primary ml-1">L</span>
                    </div>
                </div>

                 {/* Cost Card */}
                 <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 h-32 flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">THÀNH TIỀN</p>
                    <div className="flex items-baseline">
                        <span className="text-4xl font-black text-text-main tracking-tighter">{actualCost.toLocaleString()}</span>
                        <span className="text-base font-bold text-text-main ml-1">VND</span>
                    </div>
                </div>

                {/* Refund Info Section */}
                <div className="w-full bg-orange-50 rounded-2xl p-4 border border-orange-100 mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-sm text-text-main">Số tiền đã thanh toán</span>
                        <span className="font-black text-2xl text-text-main">{prepaidAmount.toLocaleString()}đ</span>
                    </div>
                    
                    <div className="border-t border-orange-200 my-3"></div>
                    <div className="flex justify-between items-center">
                         <span className="font-bold text-sm text-text-main">Số tiền thừa</span>
                         <span className="font-black text-2xl text-primary">{refundAmount.toLocaleString()}đ</span>
                    </div>
                </div>
            </div>

            <div className="p-6 pb-8">
                 {refundAmount > 0 ? (
                    <Button onClick={() => onNavigate(ScreenName.GUEST_REFUND)}>
                        Thực hiện hoàn tiền <span className="material-symbols-outlined text-lg ml-1">arrow_forward</span>
                    </Button>
                 ) : (
                    <Button onClick={() => onNavigate(ScreenName.GUEST_TRANSACTION_COMPLETE)}>
                        Hoàn tất
                    </Button>
                 )}
            </div>
        </div>
    )
}

// 13. Guest Transaction Complete Screen (Register Promo)
export const GuestTransactionCompleteScreen: React.FC<GuestProps> = ({ onNavigate }) => {
    return (
        <div className="h-full flex flex-col bg-bg-light relative animate-fade-in">
             <div className="p-4 pt-10 flex items-center bg-white shadow-sm z-10 shrink-0">
                <button onClick={() => onNavigate(ScreenName.HOME)} className="w-10 h-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold flex-1 text-center pr-10">Hoàn tất</h2>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-6">
                <div className="min-h-full flex flex-col">
                    <div className="flex flex-col items-center text-center mb-8 pt-4">
                        <div className="w-24 h-24 bg-[#FDEEDC] rounded-full flex items-center justify-center mb-6">
                            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-200">
                                <span className="material-symbols-outlined text-3xl font-bold">check</span>
                            </div>
                        </div>
                        <h1 className="text-2xl font-black text-text-main mb-2">Giao dịch hoàn tất</h1>
                        <p className="text-gray-500 text-sm">Cảm ơn bạn đã sử dụng dịch vụ của ATC Petro</p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
                        <div className="w-full h-32 bg-[#FDEEDC] rounded-2xl mb-6 relative overflow-hidden flex items-end justify-center">
                            {/* Illustration Placeholder */}
                            <div className="text-[#F58F49] opacity-20 transform translate-y-2">
                                <span className="material-symbols-outlined text-9xl">potted_plant</span>
                            </div>
                            <div className="absolute top-4 right-4 opacity-50">
                                <span className="material-symbols-outlined text-orange-300">spa</span>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-text-main mb-2">Đăng ký để nhận thêm ưu đãi</h3>
                        <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                            Trở thành thành viên ngay hôm nay để trải nghiệm dịch vụ tốt nhất.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-sm filled">wallet</span>
                                </div>
                                <span className="text-xs font-bold text-gray-600">Không cần thanh toán trước</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-sm filled">history</span>
                                </div>
                                <span className="text-xs font-bold text-gray-600">Lưu lịch sử giao dịch</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-sm filled">redeem</span>
                                </div>
                                <span className="text-xs font-bold text-gray-600">Tích điểm đổi quà hấp dẫn</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 pb-8 space-y-3 bg-white border-t border-gray-50 shrink-0">
                <Button onClick={() => onNavigate(ScreenName.REGISTER)}>Đăng ký tài khoản ngay</Button>
                <Button variant="secondary" className="bg-gray-200 border-none text-gray-600" onClick={() => onNavigate(ScreenName.WELCOME)}>Thoát</Button>
            </div>
        </div>
    );
}

// 14. Guest Refund (Hoàn tiền thừa)
export const GuestRefundScreen: React.FC<GuestProps> = ({ onNavigate }) => {
    const [step, setStep] = useState<'processing' | 'success'>('processing');

    useEffect(() => {
        const timer = setTimeout(() => {
            setStep('success');
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    if (step === 'processing') {
        return (
            <div className="h-full flex flex-col bg-white">
                <div className="p-4 pt-10 flex items-center bg-transparent">
                    <button className="w-10 h-10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-lg font-bold flex-1 text-center pr-10">Hoàn tiền thừa</h2>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 border-4 border-orange-200 border-t-primary rounded-full animate-spin mb-6"></div>
                    <h1 className="text-2xl font-black text-text-main mb-2">Đang hoàn tiền...</h1>
                    <p className="text-gray-500 text-xs px-10 mb-8">Hệ thống đang xử lý giao dịch hoàn tiền tự động của bạn.</p>

                    <div className="w-full bg-gray-50 rounded-xl p-4 mb-8">
                         <div className="flex justify-between items-center mb-2">
                             <span className="text-xs font-bold text-text-main">Tiến trình xử lý</span>
                             <span className="text-xs font-bold text-primary">70%</span>
                         </div>
                         <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                             <div className="h-full bg-primary rounded-full w-[70%]"></div>
                         </div>
                         <p className="text-[9px] text-gray-400 mt-2 text-left">Vui lòng không thoát ứng dụng trong giây lát...</p>
                    </div>
                    
                    {/* Info Card */}
                    <div className="w-full bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex items-center justify-between">
                         <div className="text-left">
                             <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">SỐ TIỀN HOÀN</p>
                             <p className="text-xl font-black text-text-main">150.000đ</p>
                         </div>
                         <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-primary">
                             <span className="material-symbols-outlined filled">account_balance_wallet</span>
                         </div>
                    </div>
                     <div className="w-full bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex items-center gap-3 mt-4">
                          <div className="w-10 h-10 bg-[#A50064] rounded-lg flex items-center justify-center text-white text-[9px] font-bold">MoMo</div>
                          <div className="text-left">
                              <p className="text-sm font-bold text-text-main">Ví MoMo</p>
                              <p className="text-[10px] text-gray-400">Phương thức nhận tiền</p>
                          </div>
                     </div>
                </div>
                 
                 <div className="p-6 pb-8">
                      <Button disabled className="bg-orange-100 text-primary opacity-70 flex items-center justify-center gap-2">
                          <span className="animate-spin material-symbols-outlined text-sm">progress_activity</span> Đang xử lý...
                      </Button>
                      <p className="text-[8px] text-center font-bold text-gray-400 uppercase tracking-widest mt-3">ATC PETRO SECURITY SHIELD ENABLED</p>
                 </div>
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col bg-white animate-fade-in">
             <div className="p-4 pt-10 flex items-center bg-transparent">
                    <button onClick={() => onNavigate(ScreenName.WELCOME)} className="w-10 h-10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-lg font-bold flex-1 text-center pr-10">Hoàn tiền thừa</h2>
            </div>
            
            <div className="flex-1 flex flex-col items-center p-6 text-center pt-10">
                 <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200">
                          <span className="material-symbols-outlined text-3xl font-bold">check</span>
                      </div>
                 </div>

                 <h1 className="text-xl font-black text-text-main mb-2">Hoàn tiền thành công!</h1>
                 <p className="text-gray-500 text-xs px-8 mb-8">Giao dịch hoàn tiền tự động của bạn đã được thực hiện thành công.</p>
                
                 {/* Receipt Card */}
                 <div className="w-full bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-2xl p-6 mb-6">
                      <div className="flex justify-between items-center mb-6">
                           <div className="text-left">
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">SỐ TIỀN HOÀN</p>
                                <p className="text-2xl font-black text-text-main">150.000đ</p>
                           </div>
                           <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined filled">account_balance_wallet</span>
                           </div>
                      </div>

                      <div className="bg-orange-50/50 rounded-xl p-3 flex items-center gap-3">
                           <div className="w-10 h-10 bg-[#FCDDB3] rounded-lg flex items-center justify-center text-primary shadow-sm border border-white">
                                <span className="material-symbols-outlined">wallet</span>
                           </div>
                           <div className="text-left">
                               <p className="text-sm font-bold text-text-main">Ví MoMo</p>
                               <p className="text-[10px] text-gray-500">Phương thức nhận tiền</p>
                           </div>
                      </div>
                 </div>

                 <div className="bg-blue-50 p-4 rounded-xl flex gap-3 text-left">
                      <span className="material-symbols-outlined text-blue-500 text-sm mt-0.5">info</span>
                      <p className="text-[10px] text-blue-800 font-medium leading-relaxed">
                          Giao dịch hoàn tiền đã hoàn tất. Vui lòng kiểm tra số dư trong ứng dụng Ví MoMo của bạn.
                      </p>
                 </div>
            </div>

            <div className="p-6 pb-8">
                <Button onClick={() => onNavigate(ScreenName.WELCOME)}>Về trang chủ</Button>
                <p className="text-[8px] text-center font-bold text-gray-400 uppercase tracking-widest mt-3">ATC PETRO SECURITY SHIELD ENABLED</p>
            </div>
        </div>
    )
}
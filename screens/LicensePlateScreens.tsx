import React, { useState, useEffect, useRef } from 'react';
import { ScreenName } from '../types';
import { Button } from '../components/Button';
import { BottomNav } from '../components/BottomNav';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  setRegistered?: (val: boolean) => void; // Callback to app state
}

// -------------------------------------------------------------------------
// 1. Màn hình Đăng ký xe (LicenseRegisterScreen)
// -------------------------------------------------------------------------
export const LicenseRegisterScreen: React.FC<Props> = ({ onNavigate, setRegistered }) => {
    // Form State
    const [vehicleType, setVehicleType] = useState("Ô tô 4 chỗ");
    const [fuelType, setFuelType] = useState("Xăng RON 95-V");
    
    // Toggle State
    const [aiEnabled, setAiEnabled] = useState(true);
    const [autoPayEnabled, setAutoPayEnabled] = useState(false);

    // Dropdown Logic
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const vehicleOptions = ["Ô tô 4 chỗ", "Ô tô 7 chỗ", "Xe bán tải", "Xe tải", "Xe máy"];
    const fuelOptions = ["Xăng RON 95-V", "Xăng RON 95-III", "Xăng E5 RON 92", "Dầu DO 0.001S-V", "Dầu DO 0.05S-II"];

    const handleRegister = () => {
        if (setRegistered) setRegistered(true);
        // Chuyển sang màn hình quét
        onNavigate(ScreenName.LICENSE_SCAN);
    };

    const toggleDropdown = (name: string) => {
        if (activeDropdown === name) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(name);
        }
    };

    const selectOption = (setter: (val: string) => void, val: string) => {
        setter(val);
        setActiveDropdown(null);
    }

    // Custom Select Component
    const FormSelect = ({ label, value, options, name }: {label: string, value: string, options: string[], name: string}) => (
        <div className="space-y-2 mb-4 relative z-10">
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">{label}</label>
            <div 
                onClick={() => toggleDropdown(name)}
                className={`w-full h-12 px-4 rounded-xl bg-[#F5F2EF] border ${activeDropdown === name ? 'border-primary ring-1 ring-primary' : 'border-transparent'} flex items-center justify-between text-sm font-bold text-gray-700 cursor-pointer transition-all`}
            >
                {value}
                <span className={`material-symbols-outlined text-gray-400 transition-transform ${activeDropdown === name ? 'rotate-180' : ''}`}>expand_more</span>
            </div>

            {/* Dropdown Menu */}
            {activeDropdown === name && (
                <div className="absolute top-[74px] left-0 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
                    {options.map((opt, idx) => (
                        <div 
                            key={idx}
                            onClick={() => selectOption(name === 'vehicle' ? setVehicleType : setFuelType, opt)}
                            className={`px-4 py-3 text-sm font-bold hover:bg-orange-50 cursor-pointer border-b border-gray-50 last:border-0 ${value === opt ? 'text-primary bg-orange-50/50' : 'text-gray-600'}`}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const FormInput = ({ label, placeholder, defaultValue, type="text" }: any) => (
        <div className="space-y-2 mb-4">
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">{label}</label>
            <input 
                type={type}
                className="w-full h-12 px-4 rounded-xl bg-[#F5F2EF] border border-transparent focus:border-primary focus:bg-white outline-none transition-all placeholder:text-gray-400 text-sm font-bold text-text-main" 
                placeholder={placeholder}
                defaultValue={defaultValue}
            />
        </div>
    );

    // Interactive Toggle Component
    const ToggleRow = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (val: boolean) => void }) => (
        <div className="flex items-center justify-between py-3 cursor-pointer group" onClick={() => onChange(!checked)}>
            <span className="text-xs font-bold text-gray-700 max-w-[200px] group-hover:text-primary transition-colors">{label}</span>
            <div className={`w-12 h-7 rounded-full relative shadow-inner transition-colors duration-300 ${checked ? 'bg-primary' : 'bg-gray-200'}`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-1 shadow-sm transition-transform duration-300 ${checked ? 'left-[26px]' : 'left-1'}`}></div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-white animate-fade-in" onClick={() => { if(activeDropdown) setActiveDropdown(null) }}>
            {/* Header */}
            <div className="pt-4 px-4 pb-2 flex items-center border-b border-gray-50">
                <button onClick={() => onNavigate(ScreenName.HOME)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50">
                    <span className="material-symbols-outlined text-gray-800">arrow_back</span>
                </button>
                <h2 className="text-lg font-bold flex-1 text-center pr-10">Đăng ký xe</h2>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-6" onClick={(e) => e.stopPropagation()}>
                <FormSelect label="Loại xe" value={vehicleType} options={vehicleOptions} name="vehicle" />
                <FormInput label="Dòng xe" placeholder="Ví dụ: Vios, Accent..." defaultValue="Vios G" />
                <FormInput label="Nhãn hiệu" placeholder="Ví dụ: Toyota, Hyundai..." defaultValue="Toyota" />
                <FormInput label="Biển số" placeholder="Ví dụ: 30A-123.45" />
                <FormInput label="Màu sơn" placeholder="Nhập màu sơn" defaultValue="Trắng" />
                
                <div className="border-t border-gray-100 my-4"></div>
                
                <FormSelect label="Loại nhiên liệu" value={fuelType} options={fuelOptions} name="fuel" />
                <FormInput label="Dung tích bình (Lít)" placeholder="Nhập dung tích" defaultValue="42" type="number" />
                
                <div className="border-t border-gray-100 my-2"></div>

                {/* Interactive Toggles */}
                <div className="mt-2 space-y-1">
                    <ToggleRow 
                        label="Cho phép Camera AI nhận diện biển số" 
                        checked={aiEnabled} 
                        onChange={setAiEnabled} 
                    />
                    
                    <ToggleRow 
                        label="Cho phép tự động trừ tiền khi đổ xăng" 
                        checked={autoPayEnabled} 
                        onChange={setAutoPayEnabled} 
                    />
                </div>

                <div className="h-6"></div>

                <Button onClick={handleRegister}>ĐĂNG KÝ PHƯƠNG TIỆN</Button>
                <div className="h-6"></div>
            </div>
        </div>
    );
};

// -------------------------------------------------------------------------
// 2. Màn hình Quét Camera AI (LicenseScanScreen)
// -------------------------------------------------------------------------
export const LicenseScanScreen: React.FC<Props> = ({ onNavigate }) => {
    // 0: Waiting/Positioning
    // 1: Success/Recognized
    // 2: Error
    const [scanState, setScanState] = useState<0 | 1 | 2>(0);
    const [progress, setProgress] = useState(0);
    const [countdown, setCountdown] = useState(3);

    // Simulate scanning process - Loop indefinitely until user interaction
    useEffect(() => {
        if (scanState === 0) {
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) return 0; // Loop scanning
                    return prev + 1;
                });
            }, 30);
            return () => clearInterval(interval);
        }
    }, [scanState]);

    // Auto-navigate logic when success
    useEffect(() => {
        if (scanState === 1) {
            setCountdown(3); // Reset countdown
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        handleConfirm();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [scanState]);

    const handleConfirm = () => {
        onNavigate(ScreenName.SELECT_MODE);
    };

    const handleSwitchMethod = () => {
        onNavigate(ScreenName.SCAN_QR);
    };

    // Helper to render vehicle details row
    const DetailRow = ({ label, value }: {label: string, value: string}) => (
        <div className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0">
            <span className="text-gray-500 text-xs">{label}</span>
            <span className="font-bold text-text-main text-sm">{value}</span>
        </div>
    );

    return (
        <div className="h-full w-full flex flex-col bg-black relative overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 w-full p-4 pt-10 flex items-center z-20 pointer-events-none">
                <button onClick={() => onNavigate(ScreenName.HOME)} className="pointer-events-auto w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-black">arrow_back</span>
                </button>
                <h2 className="text-lg font-bold flex-1 text-center pr-10 text-white drop-shadow-md">Nhận diện AI</h2>
            </div>

            {/* Camera Feed Area - Full Screen Background */}
            <div className="absolute inset-0 z-0 bg-gray-900">
                <img 
                    src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000&auto=format&fit=crop" 
                    className={`w-full h-full object-cover transition-all duration-700 ${scanState === 0 ? 'opacity-60 scale-110' : 'opacity-100 scale-100'}`}
                    alt="Gas Station Camera"
                />
                
                {/* Overlay Dark Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-transparent to-black/60 pointer-events-none"></div>

                {/* TH1: Waiting / Scanning */}
                {scanState === 0 && (
                    <>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
                            <div className="w-64 h-40 border-2 border-white/50 rounded-xl relative flex items-center justify-center backdrop-blur-sm -translate-y-20">
                                {/* Corners */}
                                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary -mt-1 -ml-1"></div>
                                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary -mt-1 -mr-1"></div>
                                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary -mb-1 -ml-1"></div>
                                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary -mb-1 -mr-1"></div>
                                
                                <p className="text-lg font-bold animate-pulse">Đang chờ phương tiện...</p>
                            </div>
                        </div>

                        {/* --- HIDDEN PROTOTYPE TRIGGERS --- */}
                        <div 
                            onClick={() => setScanState(1)}
                            className="absolute top-24 left-0 w-1/3 h-64 z-50 cursor-pointer"
                        ></div>
                        <div 
                            onClick={() => setScanState(2)}
                            className="absolute top-24 right-0 w-1/3 h-64 z-50 cursor-pointer"
                        ></div>
                    </>
                )}

                {/* TH2: Success Label on Camera */}
                {scanState === 1 && (
                    <div className="absolute top-32 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-xl text-white animate-fade-in">
                        <p className="text-xs font-bold drop-shadow-md">Đang nhận diện...</p>
                    </div>
                )}

                {/* TH3: Error Icon on Camera */}
                {scanState === 2 && (
                    <div className="absolute inset-0 flex items-center justify-center -translate-y-20">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center animate-pulse shadow-2xl">
                             <span className="material-symbols-outlined text-red-500 text-5xl filled">warning</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Sheet Details - Absolute positioning for better layout control */}
            {/* Added pb-[100px] to inner container to push content above absolute BottomNav */}
            <div className={`absolute bottom-0 w-full bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.3)] z-30 flex flex-col transition-all duration-300 ${scanState === 0 ? 'h-[45%]' : 'h-[80%]'}`}>
                
                {/* --- STATE 0: WAITING --- */}
                {scanState === 0 && (
                    <div className="flex-1 flex flex-col animate-fade-in overflow-hidden pb-[100px]">
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="bg-red-500 text-white p-4 rounded-xl text-center font-bold text-sm mb-4 shadow-md">
                                ĐƯA XE VÀO VỊ TRÍ
                            </div>

                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-gray-400 italic">Đang quét...</span>
                                <span className="text-xs font-bold text-gray-400">{Math.floor(progress)}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-6">
                                <div className="h-full bg-primary rounded-full transition-all duration-100" style={{width: `${progress}%`}}></div>
                            </div>

                            <div className="space-y-1 opacity-50">
                                <DetailRow label="Biển số xe" value="--" />
                                <DetailRow label="Loại xe" value="--" />
                                <DetailRow label="Trạng thái" value="Đang tìm kiếm..." />
                            </div>
                            
                            <div className="mt-8 text-center">
                                <p className="text-[10px] text-gray-300 font-mono">Tap top corners for demo</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- STATE 1: SUCCESS --- */}
                {scanState === 1 && (
                    <div className="flex-1 flex flex-col animate-slide-up overflow-hidden pb-[100px]">
                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 pb-2">
                             <div className="flex justify-between items-end mb-1">
                                <h3 className="font-bold text-text-main">Phát hiện xe 29A-123.45</h3>
                                <span className="text-xs font-bold text-green-600">100%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4">
                                <div className="h-full bg-black rounded-full w-full"></div>
                            </div>
                            
                            <p className="text-primary text-xs font-bold uppercase tracking-wide mb-4">Vòi bơm số 04: Sẵn sàng</p>

                            <div className="space-y-0.5">
                                <DetailRow label="Loại xe" value="Ô tô" />
                                <DetailRow label="Dòng xe" value="Sedan" />
                                <DetailRow label="Nhãn hiệu" value="Toyota" />
                                <DetailRow label="Biển số xe" value="29A-123.45" />
                                <DetailRow label="Màu sơn" value="Xanh" />
                                <DetailRow label="Số khung" value="1234567890" />
                                <DetailRow label="Loại nhiên liệu" value="RON 95-V" />
                                <DetailRow label="Dung tích bình" value="50 lít" />
                                <DetailRow label="Chủ xe" value="Nguyễn Văn A" />
                                <DetailRow label="Đăng kiểm" value="Hợp lệ" />
                            </div>
                        </div>

                        {/* Fixed Footer with Button */}
                        <div className="p-4 pt-2 border-t border-gray-100 shrink-0 bg-white">
                             <Button onClick={handleConfirm}>
                                 Xác thực ngay ({countdown}s)
                             </Button>
                             <p className="text-center text-[10px] text-gray-400 mt-2">Hệ thống sẽ tự động chuyển tiếp</p>
                        </div>
                    </div>
                )}

                {/* --- STATE 2: ERROR --- */}
                {scanState === 2 && (
                    <div className="flex-1 flex flex-col animate-fade-in overflow-hidden pb-[100px]">
                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 pb-2">
                            <div className="bg-white border-2 border-red-50 text-red-500 p-4 rounded-2xl text-center mb-4 shadow-sm">
                                <h3 className="text-lg font-black mb-1">Lỗi nhận diện</h3>
                                <p className="text-xs">Không thể xác định biển số xe. Vui lòng thử lại hoặc chọn phương thức khác.</p>
                            </div>

                            <p className="text-red-500 text-xs font-bold uppercase tracking-wide mb-4">Vòi bơm: Chưa sẵn sàng</p>

                            <div className="space-y-1 opacity-50">
                                <DetailRow label="Loại xe" value="--" />
                                <DetailRow label="Biển số xe" value="--" />
                                <DetailRow label="Màu sơn" value="--" />
                                <DetailRow label="Loại nhiên liệu" value="--" />
                            </div>
                        </div>

                        {/* Fixed Footer with Button */}
                        <div className="p-4 pt-2 border-t border-gray-100 shrink-0 bg-white">
                             <Button onClick={handleSwitchMethod} className="bg-primary text-white">Quét mã QR code vòi bơm</Button>
                             <button onClick={() => setScanState(0)} className="text-center text-xs text-gray-400 mt-4 font-bold uppercase w-full block pb-2">Thử lại (Demo)</button>
                        </div>
                    </div>
                )}

                {/* Bottom Nav positioned absolutely at bottom of this container */}
                <BottomNav currentScreen={ScreenName.HOME} onNavigate={onNavigate} />
            </div>
        </div>
    );
};
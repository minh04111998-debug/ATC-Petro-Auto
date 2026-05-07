import React, { useState } from 'react';
import { ScreenName } from '../types';
import { Button } from '../components/Button';
import { BottomNav } from '../components/BottomNav';

interface Props {
  onNavigate: (screen: ScreenName) => void;
}

// 1. My Vehicles (List)
export const MyVehiclesScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-full bg-bg-light">
      <div className="p-4 flex items-center bg-white shadow-sm z-10 pt-10">
        <button onClick={() => onNavigate(ScreenName.PROFILE)} className="w-10 h-10 flex items-center justify-center">
          <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10">Quản lý xe</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
            {/* Car Card - Clickable */}
            <div onClick={() => onNavigate(ScreenName.MY_VEHICLE_DETAIL)} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden active:scale-[0.98] transition-transform cursor-pointer">
                <div className="absolute right-0 top-0 p-2">
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded">MẶC ĐỊNH</span>
                </div>
                <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl text-gray-400">directions_car</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-text-main">VinFast Lux A2.0</h3>
                        <p className="text-gray-500 text-sm">Biển số: 51H - 123.45</p>
                        <p className="text-primary text-sm font-bold mt-1">Xăng RON 95-III</p>
                    </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-400">TRẠNG THÁI AI</span>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-[10px] font-bold text-green-600">Đang hoạt động</span>
                    </div>
                </div>
            </div>

            {/* Bike Card - Clickable */}
             <div onClick={() => onNavigate(ScreenName.MY_VEHICLE_DETAIL)} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 active:scale-[0.98] transition-transform cursor-pointer">
                <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl text-gray-400">two_wheeler</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-text-main">Honda SH 150i</h3>
                        <p className="text-gray-500 text-sm">Biển số: 59C1 - 999.99</p>
                        <p className="text-primary text-sm font-bold mt-1">Xăng RON 95-III</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-gray-100 pb-8">
          <Button variant="outline" className="border-dashed border-2 h-14" onClick={() => onNavigate(ScreenName.MY_VEHICLE_ADD)}>
              <span className="material-symbols-outlined">add</span> Thêm xe mới
          </Button>
      </div>
    </div>
  );
};

// 2. Vehicle Add Screen
export const VehicleAddScreen: React.FC<Props> = ({ onNavigate }) => {
    // Form State (Defaults for new vehicle)
    const [vehicleType, setVehicleType] = useState("Ô tô 4 chỗ");
    const [fuelType, setFuelType] = useState("Xăng RON 95-V");
    
    // Toggle State (Default for new registration)
    const [aiEnabled, setAiEnabled] = useState(true);
    const [autoPayEnabled, setAutoPayEnabled] = useState(false);

    // Dropdown Logic
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const vehicleOptions = ["Ô tô 4 chỗ", "Ô tô 7 chỗ", "Xe bán tải", "Xe tải", "Xe máy"];
    const fuelOptions = ["Xăng RON 95-V", "Xăng RON 95-III", "Xăng E5 RON 92", "Dầu DO 0.001S-V", "Dầu DO 0.05S-II"];

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

    const FormInput = ({ label, placeholder, type="text" }: any) => (
        <div className="space-y-2 mb-4">
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">{label}</label>
            <input 
                type={type}
                className="w-full h-12 px-4 rounded-xl bg-[#F5F2EF] border border-transparent focus:border-primary focus:bg-white outline-none transition-all placeholder:text-gray-400 text-sm font-bold text-text-main" 
                placeholder={placeholder}
            />
        </div>
    );

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
            <div className="pt-10 px-4 pb-4 flex items-center border-b border-gray-50 bg-white sticky top-0 z-20">
                <button onClick={() => onNavigate(ScreenName.MY_VEHICLES)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50">
                    <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold flex-1 text-center pr-10">Thêm phương tiện</h2>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-6" onClick={(e) => e.stopPropagation()}>
                <FormSelect label="Loại xe" value={vehicleType} options={vehicleOptions} name="vehicle" />
                <FormInput label="Dòng xe" placeholder="Ví dụ: Vios, Accent..." />
                <FormInput label="Nhãn hiệu" placeholder="Ví dụ: Toyota, Hyundai..." />
                <FormInput label="Biển số" placeholder="Ví dụ: 30A-123.45" />
                <FormInput label="Màu sơn" placeholder="Nhập màu sơn" />
                
                <div className="border-t border-gray-100 my-4"></div>
                
                <FormSelect label="Loại nhiên liệu" value={fuelType} options={fuelOptions} name="fuel" />
                <FormInput label="Dung tích bình (Lít)" placeholder="Nhập dung tích" type="number" />
                
                <div className="border-t border-gray-100 my-2"></div>

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

                <div className="space-y-3">
                    <Button onClick={() => onNavigate(ScreenName.MY_VEHICLES)}>THÊM PHƯƠNG TIỆN</Button>
                </div>
                <div className="h-8"></div>
            </div>
        </div>
    );
};

// 3. Vehicle Detail Screen (Edit Mode)
export const VehicleDetailScreen: React.FC<Props> = ({ onNavigate }) => {
    // Form State (Pre-filled with VinFast Lux A2.0 data)
    const [vehicleType, setVehicleType] = useState("Ô tô 4 chỗ");
    const [fuelType, setFuelType] = useState("Xăng RON 95-V");
    
    // Toggle State
    const [aiEnabled, setAiEnabled] = useState(true);
    const [autoPayEnabled, setAutoPayEnabled] = useState(true);

    // Dropdown Logic
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const vehicleOptions = ["Ô tô 4 chỗ", "Ô tô 7 chỗ", "Xe bán tải", "Xe tải", "Xe máy"];
    const fuelOptions = ["Xăng RON 95-V", "Xăng RON 95-III", "Xăng E5 RON 92", "Dầu DO 0.001S-V", "Dầu DO 0.05S-II"];

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
            <div className="pt-10 px-4 pb-4 flex items-center border-b border-gray-50 bg-white sticky top-0 z-20">
                <button onClick={() => onNavigate(ScreenName.MY_VEHICLES)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50">
                    <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold flex-1 text-center pr-10">Chi tiết phương tiện</h2>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-6" onClick={(e) => e.stopPropagation()}>
                <div className="mb-6 flex justify-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                        <span className="material-symbols-outlined text-4xl text-gray-400">directions_car</span>
                    </div>
                </div>

                <FormSelect label="Loại xe" value={vehicleType} options={vehicleOptions} name="vehicle" />
                <FormInput label="Dòng xe" placeholder="Ví dụ: Vios, Accent..." defaultValue="Lux A2.0" />
                <FormInput label="Nhãn hiệu" placeholder="Ví dụ: Toyota, Hyundai..." defaultValue="VinFast" />
                <FormInput label="Biển số" placeholder="Ví dụ: 30A-123.45" defaultValue="51H - 123.45" />
                <FormInput label="Màu sơn" placeholder="Nhập màu sơn" defaultValue="Đen" />
                
                <div className="border-t border-gray-100 my-4"></div>
                
                <FormSelect label="Loại nhiên liệu" value={fuelType} options={fuelOptions} name="fuel" />
                <FormInput label="Dung tích bình (Lít)" placeholder="Nhập dung tích" defaultValue="85" type="number" />
                
                <div className="border-t border-gray-100 my-2"></div>

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

                <div className="space-y-3">
                    <Button onClick={() => onNavigate(ScreenName.MY_VEHICLES)}>LƯU THAY ĐỔI</Button>
                    <Button variant="secondary" className="border-red-100 text-red-500 bg-red-50 hover:bg-red-100" onClick={() => onNavigate(ScreenName.MY_VEHICLES)}>
                        XÓA PHƯƠNG TIỆN
                    </Button>
                </div>
                <div className="h-8"></div>
            </div>
        </div>
    );
};

// 4. Edit Profile Screen
export const EditProfileScreen: React.FC<Props> = ({ onNavigate }) => {
    return (
        <div className="flex flex-col h-full bg-bg-light">
             <div className="p-4 pt-10 flex items-center bg-transparent z-10">
                <button onClick={() => onNavigate(ScreenName.PROFILE)} className="w-10 h-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-black flex-1 text-center pr-10">Chỉnh sửa thông tin</h2>
            </div>

            <div className="flex-1 px-6 py-6 overflow-y-auto pb-28">
                 <div className="flex justify-center mb-8">
                     <div className="relative">
                        <div className="w-28 h-28 rounded-full bg-[#F58F49] flex items-end justify-center overflow-hidden border-4 border-white shadow-lg">
                             <img 
                                src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg" 
                                alt="Avatar" 
                                className="w-[90%] h-[90%] object-cover object-top translate-y-2" 
                            />
                        </div>
                        <button className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1.5 rounded-full shadow-md border border-gray-100 flex items-center gap-1.5 whitespace-nowrap active:scale-95 transition-transform z-10">
                            <span className="material-symbols-outlined text-primary text-sm font-bold">photo_camera</span>
                            <span className="text-[10px] font-black text-primary uppercase tracking-wide">Thay đổi ảnh</span>
                        </button>
                     </div>
                 </div>

                 <div className="space-y-5">
                     <div>
                         <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Họ và tên</label>
                         <input type="text" className="w-full bg-white rounded-xl p-4 font-bold text-text-main border border-gray-100 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" defaultValue="Marcus Bennett" />
                     </div>
                     <div>
                         <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Số điện thoại</label>
                         <input type="text" className="w-full bg-white rounded-xl p-4 font-bold text-text-main border border-gray-100 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" defaultValue="+1 (555) 012-9988" />
                     </div>
                     <div>
                         <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Email</label>
                         <input type="email" className="w-full bg-white rounded-xl p-4 font-bold text-text-main border border-gray-100 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" defaultValue="marcus.bennett@example.com" />
                     </div>
                 </div>
                 
                 <p className="mt-8 text-center text-xs text-gray-400 leading-relaxed px-4">
                     Thông tin này sẽ được sử dụng cho các hóa đơn và dịch vụ hỗ trợ tại trạm xăng.
                 </p>
            </div>

            <div className="p-6 pb-8 bg-transparent">
                <Button onClick={() => onNavigate(ScreenName.PROFILE)}>LƯU THAY ĐỔI</Button>
            </div>
            
            <BottomNav currentScreen={ScreenName.PROFILE} onNavigate={onNavigate} />
        </div>
    )
}

// 5. Invoice Info Screen (View Mode)
export const InvoiceInfoScreen: React.FC<Props> = ({ onNavigate }) => {
    const InfoRow = ({ label, value }: { label: string, value: string }) => (
        <div className="mb-5 last:mb-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</p>
            <div className="bg-gray-50 p-3.5 rounded-xl text-sm font-bold text-text-main border border-gray-100">
                {value}
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-bg-light">
             <div className="p-4 pt-10 flex items-center bg-white shadow-sm z-10">
                <button onClick={() => onNavigate(ScreenName.PROFILE)} className="w-10 h-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-black flex-1 text-center pr-10 uppercase">Hóa đơn</h2>
            </div>

            <div className="flex-1 px-4 py-6 overflow-y-auto no-scrollbar pb-28">
                 <div className="bg-white rounded-[24px] shadow-sm p-6 relative">
                     <div className="flex justify-between items-start mb-2">
                         <h3 className="text-lg font-black text-text-main">Thông tin xuất hóa đơn</h3>
                         <button 
                            onClick={() => onNavigate(ScreenName.PROFILE_INVOICE_EDIT)}
                            className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center hover:bg-orange-100 transition-colors"
                         >
                             <span className="material-symbols-outlined text-primary text-sm filled">edit</span>
                         </button>
                     </div>
                     <p className="text-gray-400 text-xs font-medium mb-8">Thông tin thanh toán và xuất hóa đơn điện tử.</p>

                     <div className="space-y-1">
                        <InfoRow label="Tên khách hàng / Đơn vị" value="Công ty TNHH Giải pháp Công nghệ ATC" />
                        <InfoRow label="Địa chỉ" value="123 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP.HCM" />
                        <InfoRow label="Mã số thuế" value="0109123456" />
                        <InfoRow label="Người mua hàng" value="Marcus Bennett" />
                        <InfoRow label="Email nhận hóa đơn" value="marcus.bennett@example.com" />
                        <InfoRow label="Biển số xe" value="51H-999.88" />
                     </div>
                 </div>
            </div>

            <BottomNav currentScreen={ScreenName.PROFILE} onNavigate={onNavigate} />
        </div>
    )
}

// 6. Edit Invoice Info Screen
export const EditInvoiceScreen: React.FC<Props> = ({ onNavigate }) => {
    const InputRow = ({ label, defaultValue }: { label: string, defaultValue: string }) => (
        <div className="mb-5 last:mb-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</p>
            <input 
                type="text" 
                defaultValue={defaultValue} 
                className="w-full bg-white border border-gray-100 rounded-xl p-3.5 text-sm font-bold text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
            />
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-bg-light">
             <div className="p-4 pt-10 flex items-center bg-white shadow-sm z-10">
                <button onClick={() => onNavigate(ScreenName.PROFILE_INVOICE)} className="w-10 h-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-black flex-1 text-center pr-10 uppercase">Hóa đơn</h2>
            </div>

            <div className="flex-1 px-4 py-6 overflow-y-auto no-scrollbar pb-32">
                 <div className="bg-transparent mb-6">
                     <h3 className="text-lg font-black text-text-main mb-1">Thông tin xuất hóa đơn</h3>
                     <p className="text-gray-500 text-xs font-medium">Vui lòng nhập chính xác thông tin để nhận hóa đơn điện tử.</p>
                 </div>

                 <div className="space-y-1">
                    <InputRow label="Tên khách hàng / Đơn vị" defaultValue="Công ty TNHH Giải pháp Công nghệ ATC" />
                    <InputRow label="Địa chỉ" defaultValue="123 Đường Lê Lợi, Phường Bến Thành, Quận 1, TP.HCM" />
                    <InputRow label="Mã số thuế" defaultValue="0109123456" />
                    <InputRow label="Người mua hàng" defaultValue="Marcus Bennett" />
                    <InputRow label="Email nhận hóa đơn" defaultValue="marcus.bennett@example.com" />
                    <InputRow label="Biển số xe" defaultValue="51H-999.88" />
                 </div>
                 
                 <div className="h-8"></div>
                 
                 <Button onClick={() => onNavigate(ScreenName.PROFILE_INVOICE)}>
                    LƯU THÔNG TIN
                 </Button>
            </div>

            <BottomNav currentScreen={ScreenName.PROFILE} onNavigate={onNavigate} />
        </div>
    )
}
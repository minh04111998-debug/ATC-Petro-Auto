import React, { useState, useEffect } from 'react';
import { ScreenName } from '../types';
import { Button } from '../components/Button';

interface Props {
  onNavigate: (screen: ScreenName) => void;
}

export const WelcomeScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-full p-6 items-center justify-center bg-bg-light">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(242,127,13,0.15)] mb-8 relative">
           <span className="material-symbols-outlined text-primary text-[80px] filled">local_gas_station</span>
           <div className="absolute -bottom-2 -right-2 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center border-4 border-white">
             <span className="material-symbols-outlined text-xl">electric_bolt</span>
           </div>
        </div>
        <h1 className="text-3xl font-extrabold text-center mb-2">Chào mừng đến <span className="text-primary">ATC Petro</span></h1>
        <p className="text-gray-500 text-center max-w-[260px]">Giải pháp tự phục vụ nhanh chóng & tiện lợi</p>
      </div>
      
      <div className="w-full space-y-4 mb-8">
        <Button onClick={() => onNavigate(ScreenName.REGISTER)}>Đăng ký tài khoản</Button>
        <button onClick={() => onNavigate(ScreenName.LOGIN)} className="w-full py-4 text-primary font-bold text-lg hover:underline">Đăng nhập</button>
      </div>
       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">ATC PETRO • TIẾT KIỆM THỜI GIAN CỦA BẠN</p>
    </div>
  );
};

export const LoginScreen: React.FC<Props> = ({ onNavigate }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!phoneNumber.trim() || !password.trim()) {
      setError('Vui lòng nhập số điện thoại và mật khẩu');
      return;
    }
    // Logic đăng nhập thực tế sẽ ở đây
    onNavigate(ScreenName.HOME);
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    if (error) setError(''); // Xóa lỗi khi người dùng nhập lại
  };

  return (
    <div className="flex flex-col h-full bg-white">
       {/* Header */}
       <div className="p-4 flex items-center bg-white relative">
         <button onClick={() => onNavigate(ScreenName.WELCOME)} className="w-10 h-10 flex items-center justify-center absolute left-4">
            <span className="material-symbols-outlined text-black">arrow_back</span>
         </button>
         <h2 className="flex-1 text-center font-bold text-lg text-text-main">Đăng nhập</h2>
       </div>

       <div className="flex-1 overflow-y-auto bg-white px-6 pb-6">
          {/* Logo Section */}
          <div className="flex flex-col items-center mt-6 mb-8">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 mb-4">
                  <span className="material-symbols-outlined text-white text-4xl filled">local_gas_station</span>
              </div>
              <h1 className="text-2xl font-black text-text-main text-center">Chào mừng trở lại</h1>
              <p className="text-gray-500 text-sm mt-2 text-center font-medium">Nhập thông tin để bắt đầu bơm xăng</p>
          </div>

          {/* Form */}
          <div className="space-y-5">
              <div>
                  <label className="block text-sm font-bold text-text-main mb-2">Số điện thoại</label>
                  <input 
                    type="tel" 
                    placeholder="Nhập số điện thoại"
                    value={phoneNumber}
                    onChange={(e) => handleInputChange(setPhoneNumber, e.target.value)}
                    className={`w-full h-12 px-4 rounded-xl border ${error && !phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'} text-text-main placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all`}
                  />
              </div>
              <div>
                  <label className="block text-sm font-bold text-text-main mb-2">Mật khẩu</label>
                  <div className="relative">
                    <input 
                        type="password" 
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => handleInputChange(setPassword, e.target.value)}
                        className={`w-full h-12 px-4 pr-12 rounded-xl border ${error && !password ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'} text-text-main placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all`}
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <span className="material-symbols-outlined text-xl filled">visibility</span>
                    </button>
                  </div>
              </div>
              
              <div className="flex justify-between items-center">
                  {error && (
                    <div className="flex items-center gap-1 text-red-500 animate-pulse">
                        <span className="material-symbols-outlined text-sm filled">error</span>
                        <span className="text-xs font-bold">{error}</span>
                    </div>
                  )}
                  {!error && <div></div>} {/* Spacer */}
                  <button className="text-primary font-bold text-sm hover:opacity-80">Quên mật khẩu?</button>
              </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 space-y-3">
              <Button onClick={handleLogin} className="shadow-none">Đăng nhập</Button>
              <Button variant="secondary" className="border-orange-200 text-primary bg-orange-50/10 hover:bg-orange-50" onClick={() => onNavigate(ScreenName.GUEST_SCAN)}>Sử dụng không cần tài khoản</Button>
          </div>

          {/* Divider */}
          <div className="mt-8 flex items-center gap-4 px-2">
              <div className="h-[1px] bg-gray-200 flex-1"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Hoặc tiếp tục với</span>
              <div className="h-[1px] bg-gray-200 flex-1"></div>
          </div>

          {/* Quick Login */}
          <div className="mt-4 flex flex-col items-center">
              <p className="text-xs text-gray-500 mb-3">Đăng nhập nhanh</p>
              <button className="w-16 h-16 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors bg-white">
                  <span className="material-symbols-outlined text-primary text-4xl">face</span>
              </button>
          </div>

          {/* Footer */}
          <div className="mt-8 mb-4 text-center">
              <h3 className="font-bold text-text-main mb-6 text-sm">Tạo tài khoản mới</h3>
              <p className="text-[10px] text-gray-400 leading-tight px-4 font-medium">
                  Bằng việc tiếp tục, bạn đồng ý với <span className="text-primary cursor-pointer hover:underline">Điều khoản Dịch vụ</span> và <span className="text-primary cursor-pointer hover:underline">Chính sách Bảo mật</span> của chúng tôi.
              </p>
          </div>
       </div>
    </div>
  );
};

export const RegisterScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="pt-4 px-4 flex items-center">
        <button onClick={() => onNavigate(ScreenName.WELCOME)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 absolute">
          <span className="material-symbols-outlined text-gray-800">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">Đăng ký thông tin cá nhân</h2>
      </div>

      {/* Progress Bar */}
      <div className="px-4 mt-4 flex gap-2">
          <div className="h-1 flex-1 bg-primary rounded-full"></div>
          <div className="h-1 flex-1 bg-primary rounded-full"></div>
          <div className="h-1 flex-1 bg-gray-200 rounded-full"></div>
      </div>
      
      <div className="flex-1 px-6 pt-8">
        <h1 className="text-2xl font-black mb-2 text-text-main">Thông tin của bạn</h1>
        <p className="text-gray-500 mb-8 text-sm">Vui lòng cung cấp thông tin chính xác để nhận ưu đãi từ ATC Petro.</p>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">Họ và tên</label>
            <input type="text" className="w-full h-14 px-4 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400 text-lg" placeholder="Nhập họ và tên đầy đủ" />
          </div>

          <div className="space-y-2">
             <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">Số điện thoại</label>
            <input type="tel" className="w-full h-14 px-4 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400 text-lg" placeholder="0xxx xxx xxx" />
          </div>
        </div>
      </div>

      <div className="p-6 pb-10">
        <Button onClick={() => onNavigate(ScreenName.OTP)} className="flex items-center justify-center gap-2">
            Tiếp tục <span className="material-symbols-outlined">arrow_forward</span>
        </Button>
        <p className="text-center text-[10px] text-gray-400 mt-4 px-8 leading-4">
            Thông tin của bạn được bảo mật tuyệt đối. Bằng việc nhấn tiếp tục, bạn đồng ý với <span className="text-primary font-bold underline cursor-pointer">Chính sách Thành viên</span> của chúng tôi.
        </p>
      </div>
    </div>
  );
};

export const OTPScreen: React.FC<Props> = ({ onNavigate }) => {
  const [otp, setOtp] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (otp.length === 6) {
      if (otp === '123456') {
        setIsError(false);
        // Small delay for better UX
        const timer = setTimeout(() => {
           onNavigate(ScreenName.CREATE_PASSWORD);
        }, 300);
        return () => clearTimeout(timer);
      } else {
        setIsError(true);
      }
    } else {
        setIsError(false);
    }
  }, [otp, onNavigate]);

  const handleNumClick = (num: number) => {
    if (otp.length < 6) {
      setOtp(prev => prev + num);
    }
  };

  const handleDelete = () => {
    setOtp(prev => prev.slice(0, -1));
    setIsError(false);
  };

  const handleResend = () => {
      setOtp('');
      setIsError(false);
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="pt-4 px-4 flex items-center">
        <button onClick={() => onNavigate(ScreenName.REGISTER)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 absolute">
          <span className="material-symbols-outlined text-gray-800">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">Xác thực OTP</h2>
      </div>
      
      <div className="flex-1 px-6 pt-10 flex flex-col">
        <h1 className="text-2xl font-black mb-2 text-text-main">Nhập mã xác thực</h1>
        <p className="text-gray-500 mb-2 text-sm">Mã xác thực đã được gửi đến số điện thoại</p>
        <p className="font-bold text-text-main mb-8">090 *** 8888</p>
        
        {/* 6 Digit OTP Display */}
        <div className="flex gap-2 mb-6 justify-center">
            {[0, 1, 2, 3, 4, 5].map((index) => (
                <div 
                  key={index} 
                  className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-bold transition-all duration-200 
                    ${isError 
                        ? 'border-red-500 text-red-500 bg-red-50' 
                        : otp[index] 
                            ? 'border-primary text-primary bg-white' 
                            : 'border-gray-200 bg-white'
                    }`}
                >
                    {otp[index] || ''}
                </div>
            ))}
        </div>
        
        {isError && (
            <div className="flex items-center gap-2 mb-8 justify-center animate-pulse">
                <span className="material-symbols-outlined text-red-500 text-sm filled">error</span>
                <p className="text-red-500 text-sm font-medium">Mã OTP không chính xác. Vui lòng thử lại.</p>
            </div>
        )}
        
        <p className="text-gray-500 text-sm text-center">
          Không nhận được mã? <button onClick={handleResend} className="text-primary font-bold ml-1 hover:underline">Gửi lại mã</button> <span className="text-gray-400">(58s)</span>
        </p>

      </div>

      {/* Keyboard simulation */}
      <div className="bg-bg-light p-2 pb-8 pt-4 rounded-t-3xl">
        <div className="grid grid-cols-3 gap-y-4 gap-x-8 px-8">
            {[1,2,3,4,5,6,7,8,9].map(n => (
                <div key={n} className="flex justify-center items-center">
                    <button 
                        onClick={() => handleNumClick(n)}
                        className="text-2xl font-semibold text-text-main active:scale-90 transition-transform w-16 h-10 rounded-lg hover:bg-gray-200/50"
                    >
                        {n}
                    </button>
                </div>
            ))}
            <div className="flex justify-center items-center">
                 <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
            <div className="flex justify-center items-center">
                <button 
                    onClick={() => handleNumClick(0)}
                    className="text-2xl font-semibold text-text-main active:scale-90 transition-transform w-16 h-10 rounded-lg hover:bg-gray-200/50"
                >
                    0
                </button>
            </div>
            <div className="flex justify-center items-center">
                <button 
                    onClick={handleDelete}
                    className="active:scale-90 transition-transform text-text-main w-16 h-10 flex items-center justify-center rounded-lg hover:bg-gray-200/50"
                >
                    <span className="material-symbols-outlined filled">backspace</span>
                </button>
            </div>
        </div>
        <div className="w-32 h-1 bg-gray-300 rounded-full mx-auto mt-6"></div>
      </div>
    </div>
  );
};

export const CreatePasswordScreen: React.FC<Props> = ({ onNavigate }) => {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="pt-4 px-4 flex items-center">
          <button onClick={() => onNavigate(ScreenName.OTP)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 absolute">
            <span className="material-symbols-outlined text-gray-800">arrow_back</span>
          </button>
          <h2 className="text-lg font-bold flex-1 text-center">Tạo mật khẩu</h2>
        </div>
        
        <div className="flex-1 px-6 pt-8 overflow-y-auto pb-24">
          <h1 className="text-2xl font-black mb-2 text-text-main">Thiết lập mật khẩu</h1>
          <p className="text-gray-500 mb-8 text-sm">Vui lòng tạo mật khẩu mạnh để bảo vệ tài khoản của bạn.</p>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">Mật khẩu mới</label>
              <div className="relative">
                <input type="password" className="w-full h-14 px-4 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400" placeholder="Nhập mật khẩu mới" />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <span className="material-symbols-outlined filled text-xl">visibility</span>
                </button>
              </div>
            </div>
  
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wide ml-1">Xác nhận mật khẩu</label>
              <div className="relative">
                <input type="password" className="w-full h-14 px-4 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400" placeholder="Nhập lại mật khẩu" />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <span className="material-symbols-outlined filled text-xl">visibility</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
             <p className="text-xs font-bold text-gray-900 mb-2">Yêu cầu bảo mật:</p>
             <div className="flex items-center gap-2">
                 <span className="material-symbols-outlined text-green-500 text-lg filled">check_circle</span>
                 <span className="text-xs text-gray-600">Tối thiểu 8 ký tự</span>
             </div>
             <div className="flex items-center gap-2">
                 <span className="w-4 h-4 rounded-full border border-gray-300"></span>
                 <span className="text-xs text-gray-600">Bao gồm chữ cái và chữ số</span>
             </div>
             <div className="flex items-center gap-2">
                 <span className="w-4 h-4 rounded-full border border-gray-300"></span>
                 <span className="text-xs text-gray-600">Ít nhất một ký tự in hoa</span>
             </div>
          </div>
        </div>
  
        <div className="p-6 pb-8 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <Button onClick={() => onNavigate(ScreenName.HOME)}>Hoàn tất</Button>
        </div>
      </div>
    );
  };
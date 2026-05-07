import React, { useState, useEffect } from 'react';
import { ScreenName } from '../types';
import { BottomNav } from '../components/BottomNav';
import { Button } from '../components/Button';

interface TabProps {
  onNavigate: (screen: ScreenName) => void;
  balance?: number;
}

// --- WALLET SCREEN ---
export const WalletScreen: React.FC<TabProps> = ({ onNavigate, balance = 0 }) => {
  return (
    <div className="flex flex-col h-full bg-bg-light relative">
       {/* Header */}
       <div className="p-4 pt-10 flex items-center bg-white relative">
            <button onClick={() => onNavigate(ScreenName.HOME)} className="w-10 h-10 flex items-center justify-center absolute left-4">
                <span className="material-symbols-outlined text-black font-bold">arrow_back</span>
            </button>
            <h2 className="flex-1 text-center font-bold text-lg text-text-main">Ví và Số dư</h2>
       </div>

      <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
          {/* Balance Section */}
          <div className="bg-white pb-8 pt-4 flex flex-col items-center rounded-b-[32px] shadow-sm mb-6">
               <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">TỔNG SỐ DƯ</p>
               <h1 className="text-4xl font-black text-text-main mb-3">{balance.toLocaleString('vi-VN')}đ</h1>
               <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-1">
                   <span className="material-symbols-outlined text-sm filled">check_circle</span>
                   <span className="text-[10px] font-bold uppercase tracking-wide">Sẵn sàng đổ xăng</span>
               </div>

               {/* Action Buttons */}
               <div className="flex gap-4 mt-8 w-full px-6">
                    <button onClick={() => onNavigate(ScreenName.WALLET_TOPUP)} className="flex-1 aspect-square bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-primary hover:shadow-md transition-all active:scale-95">
                        <div className="w-10 h-10 rounded-full bg-orange-50 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined filled">add</span>
                        </div>
                        <span className="text-xs font-bold text-gray-700">Nạp tiền</span>
                    </button>
                     <button onClick={() => onNavigate(ScreenName.WALLET_WITHDRAW)} className="flex-1 aspect-square bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-primary hover:shadow-md transition-all active:scale-95">
                        <div className="w-10 h-10 rounded-full bg-orange-50 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined filled">account_balance_wallet</span>
                        </div>
                        <span className="text-xs font-bold text-gray-700">Rút tiền</span>
                    </button>
                     <button onClick={() => onNavigate(ScreenName.WALLET_LINK_BANK)} className="flex-1 aspect-square bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-primary hover:shadow-md transition-all active:scale-95">
                        <div className="w-10 h-10 rounded-full bg-orange-50 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined filled">account_balance</span>
                        </div>
                        <span className="text-xs font-bold text-gray-700 text-center px-1">Liên kết ngân hàng</span>
                    </button>
               </div>
          </div>

          {/* Payment Methods */}
          <div className="px-6">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-text-main">Phương thức thanh toán gần đây</h3>
                  <button className="text-primary text-xs font-bold hover:underline">Xem tất cả</button>
              </div>

              <div className="space-y-3">
                   {/* Visa */}
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center text-white font-black italic text-xs">VISA</div>
                      <div className="flex-1">
                          <p className="font-bold text-sm text-text-main">Thẻ ghi nợ</p>
                          <p className="text-xs text-gray-400">Kết thúc bằng •••• 4412</p>
                      </div>
                      <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                  </div>

                   {/* Wallet */}
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                      <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white">
                           <span className="material-symbols-outlined text-xl">wallet</span>
                      </div>
                      <div className="flex-1">
                          <p className="font-bold text-sm text-text-main">Ví điện tử</p>
                          <p className="text-xs text-gray-400">Phương thức mặc định</p>
                      </div>
                      <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                  </div>

                   {/* Mastercard */}
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                       <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                            <div className="absolute w-6 h-6 bg-red-500 rounded-full left-1 opacity-80"></div>
                            <div className="absolute w-6 h-6 bg-orange-400 rounded-full right-1 opacity-80"></div>
                      </div>
                      <div className="flex-1">
                          <p className="font-bold text-sm text-text-main">Thẻ tín dụng Gold</p>
                          <p className="text-xs text-gray-400">Kết thúc bằng •••• 8890</p>
                      </div>
                      <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                  </div>
              </div>
          </div>
      </div>

      <BottomNav currentScreen={ScreenName.WALLET} onNavigate={onNavigate} />
    </div>
  );
};

// --- ACTIVITY SCREEN ---
export const ActivityScreen: React.FC<TabProps> = ({ onNavigate }) => {
  // Filtered to only show FUEL transactions with added data
  const transactions = [
      { id: 1, type: 'FUEL', amount: 1125000, date: '24/10/2023 - 14:30', station: 'Trụ 04', status: 'success' },
      { id: 2, type: 'FUEL', amount: 100000, date: '19/08/2023 - 08:15', station: 'Trụ 03', status: 'success' },
      { id: 4, type: 'FUEL', amount: 75000, date: '15/08/2023 - 11:45', station: 'Trụ 02', status: 'success' },
      { id: 5, type: 'FUEL', amount: 550000, date: '10/08/2023 - 17:30', station: 'Trụ 01', status: 'success' },
      { id: 6, type: 'FUEL', amount: 320000, date: '05/08/2023 - 09:15', station: 'Trụ 05', status: 'success' },
      { id: 7, type: 'FUEL', amount: 890000, date: '01/08/2023 - 12:00', station: 'Trụ 02', status: 'success' },
      { id: 8, type: 'FUEL', amount: 50000, date: '28/07/2023 - 08:45', station: 'Trụ 01', status: 'success' },
  ];

  // Group transactions by Month/Year
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const datePart = transaction.date.split(' - ')[0]; // Extract "24/10/2023"
    const [day, month, year] = datePart.split('/');
    const monthYear = `Tháng ${month}, ${year}`;
    
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(transaction);
    return groups;
  }, {} as Record<string, typeof transactions>);

  return (
    <div className="flex flex-col h-full bg-bg-light relative">
      <div className="p-6 pt-10 bg-white shadow-sm z-10 sticky top-0">
        <h2 className="text-2xl font-extrabold text-text-main">Hoạt động</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-24 no-scrollbar">
          {Object.keys(groupedTransactions).map((monthYear) => (
            <div key={monthYear} className="mb-6">
                <p className="text-gray-500 text-xs font-bold uppercase mb-3 sticky top-0 bg-bg-light/95 backdrop-blur-sm py-1 z-0">{monthYear}</p>
                <div className="space-y-3">
                    {groupedTransactions[monthYear].map((t) => (
                        <div onClick={() => onNavigate(ScreenName.ACTIVITY_DETAIL)} key={t.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary">
                                <span className="material-symbols-outlined filled">local_gas_station</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm text-text-main">Trạm xăng ATC</h4>
                                <p className="text-gray-400 text-xs mt-1">{t.date} • {t.station}</p>
                            </div>
                            <div className="text-right flex flex-col items-end gap-1">
                                <p className="font-bold text-lg text-text-main">
                                    -{t.amount.toLocaleString()}đ
                                </p>
                                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">Thành công</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          ))}

          {transactions.length === 0 && (
              <div className="text-center py-10 text-gray-400 text-sm">Không có hoạt động nào</div>
          )}
      </div>

      <BottomNav currentScreen={ScreenName.ACTIVITY} onNavigate={onNavigate} />
    </div>
  );
};

// --- ACTIVITY DETAIL SCREEN ---
export const ActivityDetailScreen: React.FC<TabProps> = ({ onNavigate }) => {
    // Component State for Overlays
    const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
    const [showShareSheet, setShowShareSheet] = useState(false);
    const [showPDF, setShowPDF] = useState(false);

    const DetailRow = ({ label, value, isOrange = false }: { label: string, value: string, isOrange?: boolean }) => (
        <div className="flex justify-between items-center py-1">
            <span className="text-gray-400 text-sm font-medium">{label}</span>
            <span className={`font-bold text-sm ${isOrange ? 'text-primary' : 'text-text-main'}`}>{value}</span>
        </div>
    );

    const handleDownload = () => {
        // Simulate download delay
        setTimeout(() => {
            setShowDownloadSuccess(true);
        }, 500);
    };

    // ---------------------------------------------------------
    // RENDER: PDF VIEW (Full Screen Overlay)
    // ---------------------------------------------------------
    if (showPDF) {
        return (
            <div className="h-full flex flex-col bg-white animate-fade-in z-50 absolute inset-0">
                {/* PDF Header */}
                <div className="p-4 pt-10 flex items-center justify-between border-b border-gray-100">
                    <button 
                        onClick={() => setShowPDF(false)} 
                        className="text-primary font-bold text-base px-2"
                    >
                        Xong
                    </button>
                    <h2 className="text-lg font-bold text-text-main">Hóa đơn điện tử</h2>
                    <button className="text-primary px-2 flex items-center">
                        <span className="material-symbols-outlined text-2xl">ios_share</span>
                        <span className="text-sm font-bold ml-1">Gửi</span>
                    </button>
                </div>

                {/* PDF Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    <div className="bg-white p-6 shadow-sm shadow-gray-200">
                        {/* Header Info */}
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined filled">local_gas_station</span>
                                </div>
                                <div>
                                    <h3 className="font-black text-sm text-text-main leading-tight">ATC PETRO</h3>
                                    <p className="text-[10px] text-gray-400 tracking-wider">ENERGY FOR LIFE</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-gray-400 uppercase font-bold">Original Invoice</p>
                                <p className="text-[10px] text-text-main font-bold">Số: #GAS-8829104</p>
                            </div>
                        </div>

                        <h1 className="text-xl font-black text-center text-text-main uppercase mb-1">Hóa đơn giá trị gia tăng</h1>
                        <p className="text-center text-[10px] text-gray-400 italic mb-8">Ngày 24 tháng 10 năm 2023</p>

                        {/* Station Info */}
                        <div className="flex justify-between mb-8 text-xs">
                            <div>
                                <p className="text-gray-400 font-bold mb-1">Trạm cung cấp:</p>
                                <p className="font-bold text-text-main">Trạm #42 - CMT8</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-400 font-bold mb-1">Vị trí:</p>
                                <p className="font-bold text-text-main">Trụ số 04</p>
                            </div>
                        </div>

                        {/* Table Header */}
                        <div className="flex justify-between border-b-2 border-text-main pb-2 mb-4 text-[10px] font-bold text-text-main uppercase">
                            <span className="flex-1">Mô tả</span>
                            <span className="w-16 text-right">Số lượng</span>
                            <span className="w-20 text-right">Đơn giá</span>
                        </div>

                        {/* Table Row */}
                        <div className="flex justify-between items-start mb-8 text-xs">
                            <div className="flex-1 pr-2">
                                <p className="font-bold text-primary">Xăng RON 95-V</p>
                                <p className="text-[10px] text-gray-400 mt-1">Mã SP: P-95V-G42</p>
                            </div>
                            <span className="w-16 text-right font-medium">45.00 Lít</span>
                            <span className="w-20 text-right font-medium">25.000</span>
                        </div>

                        {/* Summary */}
                        <div className="border-t border-dashed border-gray-300 pt-4 space-y-2 mb-6">
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500 font-medium">Thành tiền:</span>
                                <span className="font-bold text-text-main">1.125.000đ</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500 font-medium">VAT (10%):</span>
                                <span className="font-bold text-text-main">112.500đ</span>
                            </div>
                            <div className="flex justify-between text-sm pt-2 border-t border-gray-100 mt-2">
                                <span className="font-black text-text-main uppercase">Tổng cộng:</span>
                                <span className="font-black text-primary">1.125.000đ</span>
                            </div>
                        </div>

                        {/* Footer QR */}
                        <div className="flex flex-col items-center justify-center pt-8 border-t border-dashed border-gray-200">
                             <span className="material-symbols-outlined text-6xl text-text-main mb-2">qr_code_2</span>
                             <p className="text-[8px] text-center text-gray-400 max-w-[200px]">
                                 * Hóa đơn được tra cứu trực tuyến tại cổng thông tin điện tử ATC Petro bằng mã tra cứu bên cạnh.
                             </p>
                             <p className="text-[8px] font-bold mt-1">Mã tra cứu: G8X-291</p>
                        </div>
                    </div>
                </div>
                
                 {/* Bottom Nav for context consistency */}
                 <div className="h-2 bg-gray-50"></div>
                 <BottomNav currentScreen={ScreenName.ACTIVITY} onNavigate={onNavigate} />
            </div>
        );
    }

    // ---------------------------------------------------------
    // RENDER: MAIN ACTIVITY DETAIL SCREEN
    // ---------------------------------------------------------
    return (
        <div className="flex flex-col h-full bg-bg-light relative">
             <div className="p-4 pt-10 flex items-center bg-white shadow-sm z-10">
                <button onClick={() => onNavigate(ScreenName.ACTIVITY)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50">
                    <span className="material-symbols-outlined text-black font-bold">arrow_back</span>
                </button>
                <h2 className="text-lg font-bold flex-1 text-center pr-10">Chi tiết hóa đơn</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 no-scrollbar pb-24">
                <div className="bg-white rounded-3xl shadow-sm p-6 relative">
                    
                    {/* Status Icon */}
                    <div className="flex flex-col items-center mb-6">
                         <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-3">
                             <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                                <span className="material-symbols-outlined font-bold">check</span>
                             </div>
                         </div>
                         <span className="bg-green-50 text-green-600 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                            Thành công
                         </span>
                         <h1 className="text-3xl font-black text-text-main tracking-tight mb-1">1.125.000đ</h1>
                         <p className="text-gray-400 text-xs font-medium">24 tháng 10, 2023 • 14:30</p>
                    </div>

                    {/* Details List */}
                    <div className="space-y-4 mb-6">
                        <DetailRow label="Mã giao dịch" value="#GAS-8829104" />
                        <DetailRow label="Trạm xăng" value="Trạm #42 - CMT8" />
                        <DetailRow label="Trụ bơm" value="Trụ số 04" />
                        <DetailRow label="Loại xăng" value="RON 95-V" isOrange />
                        <DetailRow label="Số lượng" value="45.00 Lit" />
                        <DetailRow label="Đơn giá" value="25.000đ/Lit" />
                    </div>

                     {/* Separator */}
                     <div className="border-t-2 border-dashed border-gray-100 mb-4"></div>

                     {/* Total */}
                     <div className="flex justify-between items-center mb-6">
                         <span className="font-bold text-text-main text-lg">Tổng cộng</span>
                         <span className="font-black text-primary text-2xl">1.125.000đ</span>
                     </div>

                     {/* Action Buttons */}
                     <div className="space-y-3">
                         <div className="flex gap-3">
                            <button 
                                onClick={handleDownload}
                                className="flex-1 h-12 rounded-xl border border-gray-200 bg-white flex items-center justify-center gap-2 text-text-main font-bold text-sm hover:bg-gray-50 transition-colors"
                            >
                                <span className="material-symbols-outlined text-lg">download</span> Tải hóa đơn
                            </button>
                            <button 
                                onClick={() => setShowShareSheet(true)}
                                className="flex-1 h-12 rounded-xl border border-gray-200 bg-white flex items-center justify-center gap-2 text-text-main font-bold text-sm hover:bg-gray-50 transition-colors"
                            >
                                <span className="material-symbols-outlined text-lg">share</span> Chia sẻ
                            </button>
                         </div>
                         <button 
                            onClick={() => setShowPDF(true)}
                            className="w-full h-12 rounded-xl border-2 border-primary bg-white flex items-center justify-center gap-2 text-primary font-bold text-sm hover:bg-orange-50 transition-colors"
                        >
                                <span className="material-symbols-outlined text-lg filled">picture_as_pdf</span> Xem hóa đơn PDF
                        </button>
                     </div>
                </div>
            </div>
            
            {/* --------------------------------------------------------- */}
            {/* OVERLAY: DOWNLOAD SUCCESS MODAL */}
            {/* --------------------------------------------------------- */}
            {showDownloadSuccess && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-6 animate-fade-in">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl flex flex-col items-center text-center animate-slide-up">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-200">
                             <span className="material-symbols-outlined text-white text-3xl font-bold">check</span>
                        </div>
                        <h3 className="text-lg font-black text-text-main mb-2">Tải hóa đơn thành công</h3>
                        <p className="text-gray-500 text-xs mb-6 px-4">Hóa đơn đã được lưu vào thư mục Tải về của thiết bị.</p>
                        <Button onClick={() => setShowDownloadSuccess(false)} className="w-full">Đóng</Button>
                    </div>
                </div>
            )}

            {/* --------------------------------------------------------- */}
            {/* OVERLAY: SHARE BOTTOM SHEET */}
            {/* --------------------------------------------------------- */}
            {showShareSheet && (
                <div className="absolute inset-0 z-50 bg-black/50 flex flex-col justify-end animate-fade-in">
                    {/* Click outside to close */}
                    <div className="flex-1" onClick={() => setShowShareSheet(false)}></div>
                    
                    <div className="bg-white rounded-t-3xl p-6 pb-8 animate-slide-up shadow-2xl">
                        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
                        
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-black text-text-main">Chia sẻ qua</h3>
                            <button onClick={() => setShowShareSheet(false)}>
                                <span className="material-symbols-outlined text-gray-400">close</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-8">
                            <button className="flex flex-col items-center gap-2 group">
                                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200 group-active:scale-95 transition-transform">
                                    <span className="font-black text-2xl font-sans">Z</span>
                                </div>
                                <span className="text-xs font-bold text-gray-600">Zalo</span>
                            </button>
                            <button className="flex flex-col items-center gap-2 group">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-200 group-active:scale-95 transition-transform">
                                    <span className="material-symbols-outlined text-2xl filled">chat_bubble</span>
                                </div>
                                <span className="text-xs font-bold text-gray-600">Messenger</span>
                            </button>
                             <button className="flex flex-col items-center gap-2 group">
                                <div className="w-14 h-14 rounded-2xl bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-200 group-active:scale-95 transition-transform">
                                    <span className="material-symbols-outlined text-2xl filled">send</span>
                                </div>
                                <span className="text-xs font-bold text-gray-600">Telegram</span>
                            </button>
                             <button className="flex flex-col items-center gap-2 group">
                                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600 shadow-sm border border-gray-200 group-active:scale-95 transition-transform">
                                    <span className="material-symbols-outlined text-2xl">mail</span>
                                </div>
                                <span className="text-xs font-bold text-gray-600">Email</span>
                            </button>
                        </div>

                        <Button 
                            variant="secondary" 
                            className="w-full border-none bg-gray-50 h-12 text-sm font-bold"
                            onClick={() => setShowShareSheet(false)}
                        >
                            Hủy bỏ
                        </Button>
                    </div>
                </div>
            )}
            
            <BottomNav currentScreen={ScreenName.ACTIVITY} onNavigate={onNavigate} />
        </div>
    )
}

// --- PROFILE SCREEN ---
export const ProfileScreen: React.FC<TabProps> = ({ onNavigate }) => {
    const MenuRow = ({ icon, label, color = "text-text-main", bg="bg-gray-100", onClick }: any) => (
        <button onClick={onClick} className="w-full flex items-center gap-4 p-4 bg-white hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
            <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center`}>
                <span className={`material-symbols-outlined ${color}`}>{icon}</span>
            </div>
            <span className={`flex-1 text-left font-bold ${color === 'text-red-500' ? 'text-red-500' : 'text-text-main'}`}>{label}</span>
            <span className="material-symbols-outlined text-gray-300">chevron_right</span>
        </button>
    )

  return (
    <div className="flex flex-col h-full bg-bg-light relative">
        <div className="p-4 pt-10 flex items-center bg-transparent z-10">
            <button onClick={() => onNavigate(ScreenName.HOME)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50">
                <span className="material-symbols-outlined text-black font-bold">arrow_back_ios_new</span>
            </button>
            <h2 className="text-lg font-black flex-1 text-center pr-10 uppercase tracking-wide">Tài khoản</h2>
        </div>

      <div className="px-6 py-6 pb-8 bg-transparent text-center">
           <div className="relative w-32 h-32 mx-auto mb-4">
               {/* Avatar Container */}
                <div className="w-full h-full rounded-full bg-[#F58F49] flex items-end justify-center overflow-hidden border-4 border-white shadow-lg">
                    {/* Placeholder for vector person */}
                    <img 
                        src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg" 
                        alt="Avatar" 
                        className="w-[90%] h-[90%] object-cover object-top translate-y-2" 
                    />
                </div>
                {/* Edit Icon Badge */}
                <button 
                    onClick={() => onNavigate(ScreenName.PROFILE_EDIT)}
                    className="absolute bottom-1 right-1 w-9 h-9 bg-primary rounded-full border-[3px] border-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
                >
                    <span className="material-symbols-outlined text-white text-sm">edit</span>
                </button>
           </div>

          <h2 className="text-2xl font-black text-text-main mb-1">Marcus Bennett</h2>
          <p className="text-gray-500 text-sm font-bold mb-4">+1 (555) 012-9988</p>
          
          <div className="inline-flex items-center gap-1 bg-[#FDEEDC] px-4 py-1.5 rounded-full">
              <span className="text-[10px] font-black text-[#D97706] uppercase tracking-wider">Thành viên Premium</span>
          </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 no-scrollbar">
          <div className="mt-2">
              <MenuRow icon="receipt_long" label="Thông tin xuất hóa đơn" onClick={() => onNavigate(ScreenName.PROFILE_INVOICE)} />
              <MenuRow icon="directions_car" label="Quản lý xe" onClick={() => onNavigate(ScreenName.MY_VEHICLES)} />
              <MenuRow icon="credit_card" label="Phương thức thanh toán" />
          </div>

          <p className="px-6 mt-6 mb-2 text-xs font-bold text-gray-400 uppercase">Cài đặt</p>
          <div>
              <MenuRow icon="notifications" label="Thông báo" />
              <MenuRow icon="lock" label="Bảo mật & FaceID" />
              <MenuRow icon="language" label="Ngôn ngữ" />
          </div>
          
           <p className="px-6 mt-6 mb-2 text-xs font-bold text-gray-400 uppercase">Khác</p>
          <div>
              <MenuRow icon="help" label="Trung tâm hỗ trợ" />
              <MenuRow icon="logout" label="Đăng xuất" color="text-red-500" bg="bg-red-50" onClick={() => onNavigate(ScreenName.WELCOME)} />
          </div>
          
          <p className="text-center text-xs text-gray-400 mt-8 mb-4">Phiên bản 1.0.0 (Beta)</p>
      </div>

      <BottomNav currentScreen={ScreenName.PROFILE} onNavigate={onNavigate} />
    </div>
  );
};
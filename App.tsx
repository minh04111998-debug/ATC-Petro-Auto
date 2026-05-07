import React, { useState, useEffect } from 'react';
import { ScreenName, PumpMode } from './types';
import { WelcomeScreen, RegisterScreen, CreatePasswordScreen } from './screens/AuthScreens';
import { LoginScreen } from './screens/AuthScreens';
import { OTPScreen } from './screens/AuthScreens';
import { HomeScreen } from './screens/HomeScreen';
import { ScanQRScreen } from './screens/PumpFlowScreens';
import { ConfirmPumpScreen } from './screens/PumpFlowScreens';
import { SelectModeScreen } from './screens/PumpFlowScreens';
import { InputAmountScreen } from './screens/PumpFlowScreens';
import { PumpingScreen } from './screens/PumpFlowScreens';
import { SuccessScreen } from './screens/PumpFlowScreens';
import { WalletTopupScreen, WalletWithdrawScreen, WalletLinkBankScreen } from './screens/WalletScreens';
import { WalletScreen, ActivityScreen, ActivityDetailScreen, ProfileScreen } from './screens/MainTabs';
import { MyVehiclesScreen, EditProfileScreen, InvoiceInfoScreen, EditInvoiceScreen, VehicleDetailScreen, VehicleAddScreen } from './screens/ProfileScreens';
import { LicenseRegisterScreen, LicenseScanScreen } from './screens/LicensePlateScreens';
import { 
  GuestScanScreen, 
  GuestConfirmPumpScreen, 
  GuestInputAmountScreen,
  GuestInvoiceInfoScreen,
  GuestPaymentMethodScreen,
  GuestPaymentQRScreen,
  GuestPaymentBankListScreen,
  GuestPaymentBankDetailScreen,
  GuestPaymentWalletScreen,
  GuestPaymentProcessScreen,
  GuestPumpingScreen,
  GuestPumpCompleteScreen,
  GuestTransactionCompleteScreen,
  GuestRefundScreen
} from './screens/GuestFlowScreens';

const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenName>(ScreenName.WELCOME);
  const [balance, setBalance] = useState(450000);
  const [lastTransactionAmount, setLastTransactionAmount] = useState(0);
  const [pumpConfig, setPumpConfig] = useState<{
    mode: PumpMode;
    targetValue: number; // Either amount in VND or liters
  }>({ mode: PumpMode.AMOUNT, targetValue: 0 });

  // Guest Config State
  const [guestConfig, setGuestConfig] = useState<{mode: PumpMode, value: number} | null>(null);

  // License Plate Logic State
  const [isVehicleRegistered, setIsVehicleRegistered] = useState(false);

  // Navigation Helper
  const navigate = (to: ScreenName) => {
    // Logic for License Plate Flow entry
    if (to === ScreenName.LICENSE_REGISTER) {
        if (isVehicleRegistered) {
            setScreen(ScreenName.LICENSE_SCAN);
        } else {
            setScreen(ScreenName.LICENSE_REGISTER);
        }
        return;
    }
    setScreen(to);
  };

  // This function now handles both Top Up (positive) and Withdraw (negative)
  const handleUpdateBalance = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  const handlePumpComplete = (cost: number) => {
    setLastTransactionAmount(cost);
    setBalance(prev => prev - cost);
  };

  const renderScreen = () => {
    switch (screen) {
      case ScreenName.WELCOME:
        return <WelcomeScreen onNavigate={navigate} />;
      case ScreenName.LOGIN:
        return <LoginScreen onNavigate={navigate} />;
      case ScreenName.REGISTER:
        return <RegisterScreen onNavigate={navigate} />;
      case ScreenName.OTP:
        return <OTPScreen onNavigate={navigate} />;
      case ScreenName.CREATE_PASSWORD:
        return <CreatePasswordScreen onNavigate={navigate} />;
      
      // Main Tabs
      case ScreenName.HOME:
        return <HomeScreen balance={balance} onNavigate={navigate} />;
      case ScreenName.WALLET:
        return <WalletScreen balance={balance} onNavigate={navigate} />;
      case ScreenName.ACTIVITY:
        return <ActivityScreen onNavigate={navigate} />;
      case ScreenName.ACTIVITY_DETAIL:
        return <ActivityDetailScreen onNavigate={navigate} />;
      case ScreenName.PROFILE:
        return <ProfileScreen onNavigate={navigate} />;
      
      // Profile Sub-screens
      case ScreenName.MY_VEHICLES:
        return <MyVehiclesScreen onNavigate={navigate} />;
      case ScreenName.MY_VEHICLE_DETAIL:
        return <VehicleDetailScreen onNavigate={navigate} />;
      case ScreenName.MY_VEHICLE_ADD:
        return <VehicleAddScreen onNavigate={navigate} />;
      case ScreenName.PROFILE_EDIT:
        return <EditProfileScreen onNavigate={navigate} />;
      case ScreenName.PROFILE_INVOICE:
        return <InvoiceInfoScreen onNavigate={navigate} />;
      case ScreenName.PROFILE_INVOICE_EDIT:
        return <EditInvoiceScreen onNavigate={navigate} />;
        
      // Pump Flow (User)
      case ScreenName.SCAN_QR:
        return <ScanQRScreen onNavigate={navigate} />;
      case ScreenName.CONFIRM_PUMP:
        return <ConfirmPumpScreen onNavigate={navigate} />;
      case ScreenName.SELECT_MODE:
        return <SelectModeScreen onNavigate={navigate} setPumpConfig={setPumpConfig} balance={balance} />;
      case ScreenName.INPUT_AMOUNT:
        return <InputAmountScreen onNavigate={navigate} pumpConfig={pumpConfig} setPumpConfig={setPumpConfig} balance={balance} />;
      case ScreenName.PUMPING:
        return <PumpingScreen onNavigate={navigate} pumpConfig={pumpConfig} onComplete={handlePumpComplete} balance={balance} />;
      case ScreenName.SUCCESS:
        return <SuccessScreen onNavigate={navigate} amount={lastTransactionAmount} />;
      
      // License Plate Flow
      case ScreenName.LICENSE_REGISTER:
        return <LicenseRegisterScreen onNavigate={navigate} setRegistered={setIsVehicleRegistered} />;
      case ScreenName.LICENSE_SCAN:
        return <LicenseScanScreen onNavigate={navigate} />;

      // Guest Flow
      case ScreenName.GUEST_SCAN:
        return <GuestScanScreen onNavigate={navigate} />;
      case ScreenName.GUEST_CONFIRM_PUMP:
        return <GuestConfirmPumpScreen onNavigate={navigate} />;
      case ScreenName.GUEST_INPUT_AMOUNT:
        return <GuestInputAmountScreen onNavigate={navigate} guestConfig={guestConfig} setGuestConfig={setGuestConfig} />;
      case ScreenName.GUEST_INVOICE_INFO:
        return <GuestInvoiceInfoScreen onNavigate={navigate} />;
      case ScreenName.GUEST_PAYMENT_METHOD:
        return <GuestPaymentMethodScreen onNavigate={navigate} />;
      case ScreenName.GUEST_PAYMENT_QR:
        return <GuestPaymentQRScreen onNavigate={navigate} guestConfig={guestConfig} />;
      case ScreenName.GUEST_PAYMENT_BANK_LIST:
        return <GuestPaymentBankListScreen onNavigate={navigate} guestConfig={guestConfig} />;
      case ScreenName.GUEST_PAYMENT_BANK_DETAIL:
        return <GuestPaymentBankDetailScreen onNavigate={navigate} guestConfig={guestConfig} />;
      case ScreenName.GUEST_PAYMENT_WALLET:
        return <GuestPaymentWalletScreen onNavigate={navigate} guestConfig={guestConfig} />;
      case ScreenName.GUEST_PAYMENT_PROCESS:
        return <GuestPaymentProcessScreen onNavigate={navigate} />;
      case ScreenName.GUEST_PUMPING:
        return <GuestPumpingScreen onNavigate={navigate} guestConfig={guestConfig} />;
      case ScreenName.GUEST_PUMP_COMPLETE:
        return <GuestPumpCompleteScreen onNavigate={navigate} guestConfig={guestConfig} />;
      case ScreenName.GUEST_TRANSACTION_COMPLETE:
        return <GuestTransactionCompleteScreen onNavigate={navigate} />;
      case ScreenName.GUEST_REFUND:
        return <GuestRefundScreen onNavigate={navigate} />;

      // Wallet Features
      case ScreenName.WALLET_TOPUP:
        return <WalletTopupScreen onNavigate={navigate} currentBalance={balance} onUpdateBalance={handleUpdateBalance} />;
      case ScreenName.WALLET_WITHDRAW:
        return <WalletWithdrawScreen onNavigate={navigate} currentBalance={balance} onUpdateBalance={handleUpdateBalance} />;
      case ScreenName.WALLET_LINK_BANK:
        return <WalletLinkBankScreen onNavigate={navigate} />;
        
      default:
        return <WelcomeScreen onNavigate={navigate} />;
    }
  };

  return (
    <div className="w-full h-full bg-bg-light text-text-main font-sans overflow-hidden relative">
      {/* Simple fade-in animation for screen transitions */}
      <div key={screen} className="w-full h-full animate-fade-in">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
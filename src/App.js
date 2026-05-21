import React, { useState } from 'react';
import { useWallet } from './hooks/useWallet';
import Layout from './components/Layout';
import OnboardingScreen from './components/OnboardingScreen';
import VehicleList from './components/VehicleList';
import BookingForm from './components/BookingForm';
import ActiveRental from './components/ActiveRental';
import RegisterVehicle from './components/RegisterVehicle';
import TransactionLog from './components/TransactionLog';

export default function App() {
  const wallet = useWallet();

  const [role,            setRole]            = useState(null);   // null | 'renter' | 'host'
  const [currentPage,     setCurrentPage]     = useState('vehicles');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [activeRental,    setActiveRental]    = useState(null);
  const [txLogs,          setTxLogs]          = useState([]);

  const addTxLog = (log) => {
    setTxLogs(prev => [{
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString('ko-KR'),
      ...log,
    }, ...prev]);
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setCurrentPage(selectedRole === 'host' ? 'register' : 'vehicles');
  };

  const handleSwitchRole = () => {
    setRole(null);
    setSelectedVehicle(null);
    setActiveRental(null);
    setCurrentPage('vehicles');
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setCurrentPage('book');
  };

  const handleBookingSuccess = (rental) => {
    setActiveRental(rental);
    setCurrentPage('active');
  };

  const handleRentalEnd = () => {
    setActiveRental(null);
    setCurrentPage('vehicles');
  };

  // 역할 미선택 시 온보딩 화면
  if (!role) {
    return <OnboardingScreen onSelect={handleRoleSelect} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'vehicles':
        return <VehicleList onSelect={handleVehicleSelect} />;
      case 'book':
        return <BookingForm vehicle={selectedVehicle} wallet={wallet} addTxLog={addTxLog} onSuccess={handleBookingSuccess} />;
      case 'active':
        return <ActiveRental rental={activeRental} wallet={wallet} addTxLog={addTxLog} onEnd={handleRentalEnd} />;
      case 'register':
        return <RegisterVehicle wallet={wallet} addTxLog={addTxLog} />;
      case 'myVehicles':
      case 'earnings':
        return <ComingSoon label={currentPage === 'myVehicles' ? '내 차량 관리' : '수익 현황'} />;
      default:
        return <VehicleList onSelect={handleVehicleSelect} />;
    }
  };

  return (
    <>
      <Layout
        wallet={wallet}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        role={role}
        onSwitchRole={handleSwitchRole}
      >
        {renderPage()}
      </Layout>
      <TransactionLog logs={txLogs} />
    </>
  );
}

function ComingSoon({ label }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '80px 20px', textAlign: 'center',
    }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🚧</div>
      <p style={{ fontSize: 20, fontWeight: 700, color: '#e0e0e0', marginBottom: 8 }}>{label}</p>
      <p style={{
        fontSize: 13, color: '#666', fontFamily: "'Space Mono', monospace",
        border: '1px solid rgba(0,255,136,0.2)', padding: '6px 16px', borderRadius: 20,
      }}>COMING SOON</p>
    </div>
  );
}

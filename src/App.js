import React, { useState } from 'react';
import { useWallet } from './hooks/useWallet';
import Layout from './components/Layout';
import VehicleList from './components/VehicleList';
import BookingForm from './components/BookingForm';
import ActiveRental from './components/ActiveRental';
import RegisterVehicle from './components/RegisterVehicle';
import TransactionLog from './components/TransactionLog';

export default function App() {
  const wallet = useWallet();

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
      default:
        return <VehicleList onSelect={handleVehicleSelect} />;
    }
  };

  return (
    <>
      <Layout wallet={wallet} currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderPage()}
      </Layout>
      <TransactionLog logs={txLogs} />
    </>
  );
}

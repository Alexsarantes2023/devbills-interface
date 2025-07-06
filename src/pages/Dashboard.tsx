import { useEffect } from 'react';
import { api } from '../services/api';

const Dashboard = () => {

  useEffect(() => {

    async function getTransactions() {
      const response = await api.get('/transactions');
      console.log(response);
    }

    getTransactions();
   }, []);


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
    </div>
  );
}

export default Dashboard;
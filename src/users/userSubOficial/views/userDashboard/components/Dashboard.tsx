import { useEffect, useState } from 'react';
import { handleDataGeneral } from '@/users/userSubOficial/services/AdminService';
import { StatCard } from './StatCard';
import CardActivity from './CardActivity';
import CardChart from './CardChart';
import { DashboardData, initialStateDashboard } from '@/users/userSubOficial/models/GeneralData.models';

export function Dashboard({ token }: { token: string }) {
  const [data, setData] = useState<DashboardData>(initialStateDashboard);

  useEffect(() => {
    const fetchData = async () => {
      const res = await handleDataGeneral(token);
      setData(res);
    };

    fetchData();
  }, [token]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard href='/soldiers' title="Total Soldiers" value={data.total_soldier} />
        <StatCard href='/services' title="Total Services" value={data.total_services} />
        <StatCard href='/services' title="Completed Services" value={data.services_completed} />
        <StatCard href='/services' title="Pending Services" value={data.services_pending} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardActivity data={data} />
        <CardChart data={data} />
      </div>
    </>
  );
}
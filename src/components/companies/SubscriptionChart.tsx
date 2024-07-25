'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';

const SubscriptionComparisonChart = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5152/api/companies/subscription-statistics', {
          headers: { accept: 'text/plain' },
        });
        const { expiredSubscriptions, activeSubscriptions } = response.data;
        setData([
          { name: 'Expired Subscriptions', value: expiredSubscriptions },
          { name: 'Active Subscriptions', value: activeSubscriptions },
        ]);
      } catch (error) {
        setError('Failed to fetch subscription statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <BarChart
      series={[{ data: data.map(item => item.value) }]}
      height={300}
      xAxis={[{ data: data.map(item => item.name), scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
};

export default SubscriptionComparisonChart;

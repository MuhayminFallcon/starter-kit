'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Typography, Card, CardContent } from '@mui/material';
import { green, red } from '@mui/material/colors';

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

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Typography variant="h6" color="error">{error}</Typography>
    </Box>
  );

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" padding={2}>
      <Card sx={{ maxWidth: 400, textAlign: 'center', padding: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Subscription Statistics
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={4} px={5}>
            <Box textAlign="center">
              <Typography variant="h6" color="error" sx={{ mb: 1 }}>
                Expired
              </Typography>
              <Typography variant="h4" color={red[500]}>
                {data.find(item => item.name === 'Expired Subscriptions')?.value || 0}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                Active
              </Typography>
              <Typography variant="h4" color={green[500]}>
                {data.find(item => item.name === 'Active Subscriptions')?.value || 0}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SubscriptionComparisonChart;

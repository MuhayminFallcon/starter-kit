'use strict';

import React from 'react';
import SubscriptionChart from '@/components/companies/SubscriptionChart';
import SearchField from '@components/companies/SearchField'

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <SearchField />

      <SubscriptionChart />
    </div>
  );
};

export default Home;

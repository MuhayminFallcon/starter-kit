"use client";

import CompanyCard from '@views/companies/CompanyCard';
import AddComponent from '@components/companies/AddComponent';

export default function Page() {
  return (
    <div>
      <AddComponent />
      <CompanyCard />
    </div>
  );
}

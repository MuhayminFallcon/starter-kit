"use client";

import CompanyCard from '@views/companies/CompanyCard';
import AddComponent from '@components/companies/AddComponent';

export default function Page() {

  return (
    <div className="grid gap-5 mt-2">
      <AddComponent />
      <CompanyCard />
    </div>
  );
}

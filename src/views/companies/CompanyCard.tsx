import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompaniesTable = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:5272/api/companys');
      setCompanies(response.data.data);
    } catch (error) {
      console.error('Error fetching companies data:', error);
    }
  }

  fetchData();
}, []);

  return (
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Phone Number</th>
        <th>Email</th>
        <th>Address</th>
        <th>Website</th>
        <th>Hours of Operation</th>
      </tr>
      </thead>
      <tbody>
      {companies.map((company) => (
        <tr key={company.id}>
          <td>{company.name}</td>
          <td>{company.description}</td>
          <td>{company.phoneNumber}</td>
          <td>{company.emailAddress}</td>
          <td>{company.address}</td>
          <td>{company.websiteUrl || 'N/A'}</td>
          <td>{company.hoursOfOperation}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default CompaniesTable;

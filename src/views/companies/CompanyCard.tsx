// src/views/companies/CompanyCard.tsx

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography
} from '@mui/material';
import { fetchCompanies } from '@/services/companyService';
import type { Company } from '@/services/companyService'; // Import the Company interface

const CompaniesTable = () => {
  const [data, setData] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCompanies();
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6" align="center" style={{ marginTop: '20px' }}>
        {`Error: ${error.message}`}
      </Typography>
    );
  }

  if (data.length === 0) {
    return (
      <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
        No data available
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>SubDomain</TableCell>
            <TableCell>Hero Description</TableCell>
            <TableCell>Hero Image</TableCell>
            <TableCell>Logo Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((company) => (
            <TableRow key={company.id}>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.subDomain}</TableCell>
              <TableCell>{company.heroDescription}</TableCell>
              <TableCell>
                <img src={company.heroImage} alt={company.heroTitle} style={{ width: '60px', height: 'auto' }} />
              </TableCell>
              <TableCell>
                <img src={company.logoImage} alt={company.name} style={{ width: '60px', height: 'auto' }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompaniesTable;

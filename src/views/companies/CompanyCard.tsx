import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography } from '@mui/material';
import { CompanyService, Company } from '@/services/companyService';

const CompanyCard = () => {
  const [data, setData] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CompanyService.fetchCompanies();
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
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h6" color="error">
          {error.message}
        </Typography>
      </div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>SubDomain</TableCell>
            <TableCell>Hero Title</TableCell>
            <TableCell>Hero Description</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Email Contact</TableCell>
            <TableCell>Phone Contact</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((company) => (
            <TableRow key={company.id}>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.subDomain}</TableCell>
              <TableCell>{company.heroTitle}</TableCell>
              <TableCell>{company.heroDescription}</TableCell>
              <TableCell>{company.location}</TableCell>
              <TableCell>{company.emailContact}</TableCell>
              <TableCell>{company.phoneContact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompanyCard;

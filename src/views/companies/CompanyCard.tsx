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
        setError("Somthing went wrong! can't fetch the data",error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} style={{ textAlign: 'center' }}>
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={7} style={{ textAlign: 'center', color: 'red' }}>
                {error}
              </TableCell>
            </TableRow>
          ) : (
            data.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.subDomain}</TableCell>
                <TableCell>{company.heroTitle}</TableCell>
                <TableCell>{company.heroDescription}</TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>{company.emailContact}</TableCell>
                <TableCell>{company.phoneContact}</TableCell>
                <TableCell className="flex gap-2 items-center">
                  1. edit component/-id-
                  2. delete component/-id-
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompanyCard;

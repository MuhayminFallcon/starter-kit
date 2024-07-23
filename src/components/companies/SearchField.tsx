'use client';
import React, { useState } from 'react';
import { TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

export default function SearchField() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    try {
      const response = await axios.get(`http://localhost:5152/api/companies/subdomain/${searchQuery}`, {
        headers: {
          'accept': 'text/plain',
        },
      });
      console.log(response.data); // Handle the response data as needed
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <TextField
        type="search"
        placeholder="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputLabelProps={{
          shrink: false,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          sx: {
            padding: '9px 12px',
          },
        }}
        variant="outlined"
        sx={{
          '& .MuiInputBase-input': {
            padding: '0px',
            height: '0',
          },
        }}
      />
      <Button type="submit" style={{ display: 'none' }}>Search</Button>
    </form>
  );
}

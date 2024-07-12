import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  images: string[]; // Assuming each Article has an array of image URLs
}

const CompaniesTable = () => {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: Article[] }>('http://100.42.190.178:5532/api/articles');
        setData(response.data.data); // Assuming the response structure has a `data` field containing the array of articles
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

  // Handling case where data is empty
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
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Images</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <img src={`http://${item.image}`} alt={item.image} style={{ width: '60px', height: 'auto' }} />
              </TableCell>
              <TableCell>
                <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                  {item.images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://${image}`}
                      alt={image}
                      style={{
                        position: 'absolute',
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        zIndex: index + 1,
                        right: `${index * 4}px`, 
                        top: `${index * 4}px`
                      }}
                    />
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompaniesTable;

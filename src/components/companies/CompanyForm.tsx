import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';

type CompanyFormProps = {
  step: number;
  productsImages: string[];
  handleProductImageChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddProductImage: () => void;
  onSubmit: (data: { name: string; subDomain: string; productsImages: string[] }) => void;
};

const CompanyForm = ({ step, productsImages, handleProductImageChange, handleAddProductImage, onSubmit }: CompanyFormProps) => {
  const [name, setName] = useState('');
  const [subDomain, setSubDomain] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ name, subDomain, productsImages });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1, width: '100%' } }} noValidate autoComplete="off">
      {step === 0 && (
        <>
          <TextField id="name" label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField id="subDomain" label="SubDomain" variant="outlined" value={subDomain} onChange={(e) => setSubDomain(e.target.value)} />
        </>
      )}
      {step === 3 && (
        <>
          {productsImages.map((productImage, index) => (
            <TextField
              key={index}
              id={`productImage-${index}`}
              label="Products Image"
              variant="outlined"
              value={productImage}
              onChange={(event) => handleProductImageChange(index, event)}
            />
          ))}
          <Button onClick={handleAddProductImage}>Add Product Image</Button>
        </>
      )}
      <Button type="submit" color="primary">Submit</Button>
    </Box>
  );
};

export default CompanyForm;

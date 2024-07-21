import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Tooltip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CompanyForm from './CompanyForm';
import CompanyStepper from './CompanyStepper';
import axios from 'axios';
import { API_URL } from '@/services/companyService';


const steps = ['Essential Information', 'Contact Information', 'Primary Content', 'Visual Content', 'Links and Additional Features'];

export default function AddComponent() {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState('');
  const [subDomain, setSubDomain] = useState('');
  const [productsImages, setProductsImages] = useState(['']);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddProductImage = () => {
    setProductsImages([...productsImages, '']);
  };

  const handleProductImageChange = (index, event) => {
    const newProductsImages = productsImages.slice();
    newProductsImages[index] = event.target.value;
    setProductsImages(newProductsImages);
  };

  const handleSubmit = async (data) => {
    try {
      await axios.post(`${API_URL}/companies`, data, {
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json-patch+json',
        },
      });
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <Tooltip title="Top" placement="top">
        <IconButton onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { height: '80vh' } }}
      >
        <DialogTitle>Dialog</DialogTitle>
        <DialogContent>
          <CompanyStepper steps={steps} activeStep={activeStep} />
          <CompanyForm
            step={activeStep}
            productsImages={productsImages}
            handleProductImageChange={handleProductImageChange}
            handleAddProductImage={handleAddProductImage}
            onSubmit={handleSubmit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close Dialog
          </Button>
          <Button disabled={activeStep === 0} onClick={handleBack} color="primary">
            Back
          </Button>
          <Button disabled={activeStep === steps.length - 1} onClick={handleNext} color="primary">
            Next
          </Button>
          <Button onClick={() => handleSubmit({ name, subDomain, productsImages })} color="primary" disabled={activeStep !== steps.length - 1}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Tooltip, IconButton, Stepper, Step, StepLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios'

export default function AddComponent() {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [productsImages, setProductsImages] = useState(['']);
  const [servicesImages, setServicesImages] = useState(['']);

  const steps = ['Essential Information', 'Contact Information', 'Primary Content', 'Visual Content', 'Links and Additional Features'];

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

  const handleAddServiceImage = () => {
    setServicesImages([...servicesImages, '']);
  };

  const handleServiceImageChange = (index, event) => {
    const newServicesImages = servicesImages.slice();
    newServicesImages[index] = event.target.value;
    setServicesImages(newServicesImages);
  };

  return (
    <div>
      <Tooltip title="Top" placement="top">
        <IconButton onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <form>
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          PaperProps={{ sx: { height: "80vh" } }}
        >
          <DialogTitle>Dialog</DialogTitle>
          <DialogContent>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {activeStep === 0 && (
                <div>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: "100%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField id="name" label="Name" variant="outlined" />
                    <TextField id="subDomain" label="SubDomain" variant="outlined" />
                    <TextField id="heroTitle" label="Hero Title" variant="outlined" />
                    <TextField id="heroDescription" label="Hero Description" variant="outlined" />
                    <TextField id="heroImage" label="Hero Image" variant="outlined" />
                    <TextField id="logoImage" label="Logo Image" variant="outlined" />
                  </Box>
                </div>
              )}
              {activeStep === 1 && (
                <div>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: "100%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField id="emailContact" label="Email Contact" variant="outlined" />
                    <TextField id="phoneContact" label="Phone Contact" variant="outlined" />
                    <TextField id="location" label="Location" variant="outlined" />
                  </Box>
                </div>
              )}
              {activeStep === 2 && (
                <div>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: "100%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField id="sectionImage" label="Section Image" variant="outlined" />
                    <TextField id="sectionTitle" label="Section Title" variant="outlined" />
                    <TextField id="sectionDescription" label="Section Description" variant="outlined" />
                    <TextField id="tagline" label="Tagline" variant="outlined" />
                  </Box>
                </div>
              )}
              {activeStep === 3 && (
                <div>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: "100%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
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
                    {servicesImages.map((serviceImage, index) => (
                      <TextField
                        key={index}
                        id={`serviceImage-${index}`}
                        label="Services Image"
                        variant="outlined"
                        value={serviceImage}
                        onChange={(event) => handleServiceImageChange(index, event)}
                      />
                    ))}
                    <Button onClick={handleAddServiceImage}>Add Service Image</Button>
                  </Box>
                </div>
              )}
              {activeStep === 4 && (
                <div>
                  <Box
                    component="form"
                    sx={{
                      '& > :not(style)': { m: 1, width: "100%" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField id="socialMediaLinks" label="Social Media Links" variant="outlined" />
                    <TextField id="whoWeAreLinks" label="Who We Are Links" variant="outlined" />
                    <TextField id="projectsLinks" label="Projects Links" variant="outlined" />
                    <TextField id="whatWeDoLinks" label="What We Do Links" variant="outlined" />
                    <TextField id="socialLinks" label="Social Links" variant="outlined" />
                    <TextField id="features" label="Features" variant="outlined" />
                  </Box>
                </div>
              )}
            </div>
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
            <Button type="submit" color="primary" disabled={activeStep !== steps.length - 1}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}





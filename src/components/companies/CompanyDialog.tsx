  import React from 'react';
  import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    CircularProgress,
    Alert,
    Box,
    Stepper,
    Step,
    StepLabel,
    TextField,
    Grid,
  } from '@mui/material';
  import DenseAppBar from './DenseAppBar';
  import FeaturesSection from '@components/companies/FeaturesSection';
  import HeroSection from '@components/HeroSection';
  import ProductList from '@components/companies/ProductList';
  import SectionDetails from '@components/companies/SectionDetails';
  import CompanyFooter from '@components/companies/layout/Footer';
  import Footer from '@components/layout/vertical/Footer';

  interface CompanyDialogProps {
    openDialog: boolean;
    handleCloseDialog: () => void;
    activeStep: number;
    handleStepChange: (stepChange: number) => void;
    formData: any;
    setFormData: (data: any) => void;
    steps: string[];
    handleSubmit: () => void;
    loading: boolean;
    error: string | null;
  }

  const placeholderImage = '/a.jpeg';

  const CompanyDialog: React.FC<CompanyDialogProps> = ({
                                                         openDialog,
                                                         handleCloseDialog,
                                                         activeStep,
                                                         handleStepChange,
                                                         formData,
                                                         setFormData,
                                                         steps,
                                                         handleSubmit,
                                                         loading,
                                                         error,
                                                       }) => {
    const handleFieldChange = (field: string, value: string) => {
      setFormData((prevData: any) => ({
        ...prevData,
        [field]: value,
      }));
    };

    return (
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullScreen
        PaperProps={{ sx: { overflow: 'hidden' } }}
      >
        <DialogTitle>
          <DenseAppBar />
        </DialogTitle>
        <DialogContent dividers>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', my: 2 }} />}

          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    value={formData.name || ''}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="SubDomain"
                    value={formData.subDomain || ''}
                    onChange={(e) => handleFieldChange('subDomain', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Location"
                    value={formData.location || ''}
                    onChange={(e) => handleFieldChange('location', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email Contact"
                    value={formData.emailContact || ''}
                    onChange={(e) => handleFieldChange('emailContact', e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone Contact"
                    value={formData.phoneContact || ''}
                    onChange={(e) => handleFieldChange('phoneContact', e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <HeroSection heroData={{
                ...formData.heroData,
                heroImage: formData.heroData?.heroImage || placeholderImage,
              }} />
              <SectionDetails sectionData={{
                ...formData.sectionData,
                sectionImage: formData.sectionData?.sectionImage || placeholderImage,
              }} />
              <FeaturesSection features={formData.features || []} />
              <ProductList
                products={formData.products?.length ? formData.products : [placeholderImage]}
                isMobile={false}
              />
              <CompanyFooter
                products={formData.products?.length ? formData.products : [placeholderImage]}
                isMobile={false}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
          <Box>
            <Button
              disabled={activeStep === 0}
              onClick={() => handleStepChange(-1)}
              color="primary"
            >
              Back
            </Button>
            <Button
              onClick={() => handleStepChange(1)}
              color="primary"
              disabled={loading}
            >
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    );
  };

  export default CompanyDialog;

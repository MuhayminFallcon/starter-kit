import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CompanyForm from './CompanyForm';
import CompanyStepper from './CompanyStepper';
import axios from 'axios';
import { API_URL } from '@/services/companyService';

const steps = ['Basic Information', 'Hero Section', 'Section Details', 'Products and Services', 'Additional Information'];

export default function AddComponent() {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    subDomain: '',
    location: '',
    emailContact: '',
    phoneContact: '',
    heroTitle: '',
    heroDescription: '',
    heroImage: '',
    tagline: '',
    sectionImage: '',
    sectionTitle: '',
    sectionDescription: '',
    productsImages: [''],
    servicesImages: [''],
    logoImage: '',
    socialMediaLinks: [''],
    features: [{ title: '', description: '' }],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
    setSuccess(false);
  };

  const handleStepChange = (stepChange: number) => {
    if (activeStep === steps.length - 1 && stepChange === 1) {
      handleSubmit();
    } else {
      setActiveStep((prev) => prev + stepChange);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/companies`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      setSuccess(true);
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting form. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Tooltip title="Add Company" placement="top">
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
        <DialogTitle>Add Company</DialogTitle>
        <DialogContent>
          <CompanyStepper steps={steps} activeStep={activeStep} />
          <CompanyForm step={activeStep} formData={formData} setFormData={setFormData} />
          {error && <Alert severity="error">{error}</Alert>}
          {loading && <CircularProgress />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
          <Button disabled={activeStep === 0} onClick={() => handleStepChange(-1)} color="primary">Back</Button>
          <Button
            onClick={() => handleStepChange(1)}
            color="primary"
            disabled={loading}
          >
            {activeStep === steps.length - 1 ? (loading ? <CircularProgress size={24} /> : 'Submit') : 'Next'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Company submitted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
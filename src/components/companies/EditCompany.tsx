import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import axios from 'axios';
import { API_URL } from '@/services/companyService';
import CompanyForm from './CompanyForm';
import CompanyStepper from './CompanyStepper';

const steps = ['Basic Information', 'Hero Section', 'Section Details', 'Products and Services', 'Additional Information'];

interface EditComponentProps {
  id: string;
}

export default function EditComponent({ id }: EditComponentProps) {
  const [openDialog, setOpenDialog] = useState(false);
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
    servicesImage: [''],
    logoImage: '',
    socialMediaLinks: [''],
    whoWeAreLinks: [{ href: '', text: '' }],
    projectsLinks: [{ href: '', text: '' }],
    whatWeDoLinks: [{ href: '', text: '' }],
    socialLinks: [{ href: '', icon: '' }],
    features: [{ title: '', description: '' }],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (openDialog) {
      fetchCompanyData();
    }
  }, [openDialog]);

  const fetchCompanyData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/companies/${id}`);
      setFormData(response.data || {});
    } catch (err) {
      console.error('Error fetching company data:', err);
      setError('Error fetching company data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
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
      await axios.put(`${API_URL}/companies/${id}`, formData, {
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'application/json-patch+json',
        },
      });
      setSuccess(true);
      handleCloseDialog();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting form. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <IconButton color="default" onClick={handleOpenDialog}>
        <CreateIcon />
      </IconButton>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { height: '80vh' } }}
      >
        <DialogTitle>
          Edit Company
          <CompanyStepper steps={steps} activeStep={activeStep} />
        </DialogTitle>
        <DialogContent>
          <CompanyForm step={activeStep} formData={formData} setFormData={setFormData} />
          {error && <Alert severity="error">{error}</Alert>}
          {loading && <CircularProgress />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
          <Button disabled={activeStep === 0} onClick={() => handleStepChange(-1)} color="primary">
            {loading && activeStep !== steps.length - 1 ? <CircularProgress size={24} /> : 'Back'}
          </Button>
          <Button
            onClick={() => handleStepChange(1)}
            color="primary"
            disabled={loading}
          >
            {activeStep === steps.length - 1 ? (loading ? <CircularProgress size={24} /> : 'Edit') : 'Next'}
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
          Company edited successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

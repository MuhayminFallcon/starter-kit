import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Collapse, Dialog, Snackbar, Alert, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchField from './SearchField';
import FilterSection from './FilterSection';
import CompanyDialog from './CompanyDialog';
import { API_URL } from '@/services/companyService'
import { id } from 'postcss-selector-parser'

const steps = ['Basic Information', 'Hero Section', 'Section Details', 'Products and Services', 'Additional Information'];

interface FormData {
  name: string;
  subDomain: string;
  location: string;
  emailContact: string;
  phoneContact: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  tagline: string;
  sectionImage: string;
  sectionTitle: string;
  sectionDescription: string;
  productsImages: string[];
  servicesImages: string[];
  logoImage: string;
  socialMediaLinks: string[];
  features: { title: string; description: string }[];
}

interface FilterValues {
  name: string;
  subDomain: string;
  heroTitle: string;
  heroDescription: string;
  location: string;
  emailContact: string;
  phoneContact: string;
}

export default function AddComponent() {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [filterModified, setFilterModified] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
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
  const [filterValues, setFilterValues] = useState<FilterValues>({
    name: '',
    subDomain: '',
    heroTitle: '',
    heroDescription: '',
    location: '',
    emailContact: '',
    phoneContact: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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

  const handleToggleCollapse = () => {
    setOpenCollapse(!openCollapse);
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
      window.location.reload();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting form. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilter = () => {
    setFilterValues({
      name: '',
      subDomain: '',
      heroTitle: '',
      heroDescription: '',
      location: '',
      emailContact: '',
      phoneContact: '',
    });
    setFilterModified(false);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    const isModified = Object.values({ ...filterValues, [name]: value }).some((v) => v.trim() !== '');
    setFilterModified(isModified);
  };

  useEffect(() => {
    const isModified = Object.values(filterValues).some((v) => v.trim() !== '');
    setFilterModified(isModified);
  }, [filterValues]);

  const isFilterButtonPrimary = openCollapse || filterModified;

  return (
    <div>
      <Box
        sx={{
          width: '100%',
          height: 'fit-content',
          padding: 6,
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: 'background.paper',
        }}
      >
        <div className="flex gap-4 items-center">
          <SearchField />
          <Button
            variant={isFilterButtonPrimary ? 'contained' : 'text'}
            color={isFilterButtonPrimary ? 'primary' : 'grey'}
            startIcon={<FilterAltIcon />}
            onClick={handleToggleCollapse}
            className="h-10"
          >
            Filter
          </Button>
        </div>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenDialog} className="h-10">
          Add new company
        </Button>
      </Box>
      <FilterSection
        openCollapse={openCollapse}
        filterValues={filterValues}
        handleFilterChange={handleFilterChange}
        handleResetFilter={handleResetFilter}
      />
      <CompanyDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        activeStep={activeStep}
        handleStepChange={handleStepChange}
        formData={formData}
        setFormData={setFormData}
        steps={steps}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
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

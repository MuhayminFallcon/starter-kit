import { useState,useEffect  } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Collapse,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import axios from 'axios';
import { API_URL } from '@/services/companyService';
import CompanyForm from './CompanyForm';
import CompanyStepper from './CompanyStepper';

const steps = ['Basic Information', 'Hero Section', 'Section Details', 'Products and Services', 'Additional Information'];

export default function AddComponent() {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [filterModified, setFilterModified] = useState(false);
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
    servicesImages: [''],
    logoImage: '',
    socialMediaLinks: [''],
    features: [{ title: '', description: '' }],
  });
  const [filterValues, setFilterValues] = useState({
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
      await axios.post(`${API_URL}/companies`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
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
    setFilterModified(false); // Reset filter modified state
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Set filterModified to true if any filter value is not empty
    const isModified = Object.values({ ...filterValues, [name]: value }).some(v => v.trim() !== '');
    setFilterModified(isModified);
  };

  useEffect(() => {
    // Check if any filter values are non-empty
    const isModified = Object.values(filterValues).some(v => v.trim() !== '');
    setFilterModified(isModified);
  }, [filterValues]);

  const isFilterButtonPrimary = openCollapse || filterModified;

  return (
    <div>
      {/* nav bar (search && filter && add)---------------------------------------------------------------*/}
      <Box
        sx={{
          width: '100%',
          height: 'fit-content',
          padding: 6,
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: 'background.paper'
        }}
      >
        <div className='flex gap-4 items-center'>
          <TextField
            type="search"
            placeholder="search"
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
              }
            }}
          />
          <Button
            variant={isFilterButtonPrimary ? 'contained' : 'text'}
            color={isFilterButtonPrimary ? 'primary' : 'grey'}
            startIcon={<FilterAltIcon />}
            onClick={handleToggleCollapse}
            className='h-10'
          >
            Filter
          </Button>
        </div>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenDialog} className='h-10'>
          Add new company
        </Button>
      </Box>
      {/* nav bar ends here ------------------------------------------------------------------------------*/}

      {/* filter section opens when you click on filter button in the nav (look up) ----------------------*/}
      <Box>
        <Collapse in={openCollapse} timeout="auto" unmountOnExit>
          <Box mt={2} p={6} borderRadius={1} sx={{ bgcolor: 'background.paper' }}>
            <Typography variant="h5" gutterBottom className="flex gap-4 items-center">
              Filter
              <Button variant="text" startIcon={<RestartAltIcon />} onClick={handleResetFilter} className='h-10'>
                Reset filter
              </Button>
            </Typography>
            <div className="flex gap-3">
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={filterValues.name}
                onChange={handleFilterChange}
              />
              <TextField
                name="subDomain"
                label="Sub domain"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={filterValues.subDomain}
                onChange={handleFilterChange}
              />
            </div>
            <div className="flex gap-3">
              <TextField
                name="heroTitle"
                label="Hero Title"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={filterValues.heroTitle}
                onChange={handleFilterChange}
              />
              <TextField
                name="heroDescription"
                label="Hero Description"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={filterValues.heroDescription}
                onChange={handleFilterChange}
              />
            </div>
            <div className="flex gap-3">
              <TextField
                name="location"
                label="Location"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={filterValues.location}
                onChange={handleFilterChange}
              />
              <TextField
                name="emailContact"
                label="Email Contact"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={filterValues.emailContact}
                onChange={handleFilterChange}
              />
            </div>
            <div className="flex gap-3">
              <TextField
                name="phoneContact"
                label="Phone Contact"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                value={filterValues.phoneContact}
                onChange={handleFilterChange}
              />
            </div>
          </Box>
        </Collapse>
      </Box>
      {/* filter section ends here */}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { height: '80vh' } }}
      >
        <DialogTitle className='grid gap-4 '>
          Add Company
          <CompanyStepper steps={steps} activeStep={activeStep} />
        </DialogTitle>
        <DialogContent>
          <CompanyForm step={activeStep} formData={formData} setFormData={setFormData} />
          {error && <Alert severity="error">{error}</Alert>}
          {loading && <CircularProgress />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
          <Button disabled={activeStep === 0} onClick={() => handleStepChange(-1)} color="primary">Back</Button>
          <Button
            onClick={() => handleStepChange(1)}
            color="primary"
            disabled={loading}
          >
            {activeStep === steps.length - 1 ? (loading ? <CircularProgress size={24} /> : 'Add') : 'Next'}
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

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Alert } from '@mui/material';
import CompanyStepper from './CompanyStepper';
import CompanyForm from './CompanyForm';

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

export default function CompanyDialog({
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
                                      }: CompanyDialogProps) {
  return (
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
  );
}

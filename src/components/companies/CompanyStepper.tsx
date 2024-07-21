import { Stepper, Step, StepLabel } from '@mui/material';

interface CompanyStepperProps {
  steps: string[];
  activeStep: number;
}

const CompanyStepper = ({ steps, activeStep }: CompanyStepperProps) => {
  return (
    <Stepper activeStep={activeStep}>
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CompanyStepper;

import { Stepper, Step, StepLabel } from '@mui/material';

interface CompanyStepperProps {
  steps: string[];
  activeStep: number;
}

const CompanyStepper = ({ steps, activeStep }: CompanyStepperProps) => {
  return (
    <Stepper activeStep={activeStep} className="m-0 p-0">
      {steps.map((label, index) => (
        <Step key={index} >
          <StepLabel className="m-0 p-0">{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CompanyStepper;

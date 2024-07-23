import { Box, TextField, Button, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

type CompanyFormLayoutProps = {
  step: number;
  formData: any;
  handleChange: (field: string, value: any) => void;
  handleArrayChange: (arrayField: string, index: number, field: string, value: any) => void;
  handleAddToArray: (arrayField: string) => void;
  handleRemoveFromArray: (arrayField: string, index: number) => void;
};

const Field = ({
                 id,
                 label,
                 value,
                 onChange,
                 type = 'text',
                 multiple = false,
               }: {
  id: string;
  label: string;
  value: any;
  onChange: (field: string, value: any) => void;
  type?: string;
  multiple?: boolean;
}) => (
  <TextField
    label={label}
    variant="outlined"
    value={type === 'file' ? undefined : value}
    onChange={(e) => onChange(id, type === 'file' ? e.target.files : e.target.value)}
    type={type}
    InputLabelProps={type === 'file' ? { shrink: true } : undefined}
    inputProps={type === 'file' ? { multiple } : undefined}
  />
);

const CompanyFormLayout = ({
                             step,
                             formData,
                             handleChange,
                             handleArrayChange,
                             handleAddToArray,
                             handleRemoveFromArray,
                           }: CompanyFormLayoutProps) => {
  const stepFields: { [key: number]: JSX.Element } = {
    0: (
      <>
        <Field id="name" label="Name" value={formData.name} onChange={handleChange} />
        <Field id="subDomain" label="SubDomain" value={formData.subDomain} onChange={handleChange} />
        <Field id="emailContact" label="Email Contact" value={formData.emailContact} onChange={handleChange} />
        <Field id="phoneContact" label="Phone Contact" value={formData.phoneContact} onChange={handleChange} />
        <Field id="tagline" label="Tagline" value={formData.tagline} onChange={handleChange} />
      </>
    ),
    1: (
      <>
        <Field id="heroTitle" label="Hero Title" value={formData.heroTitle} onChange={handleChange} />
        <Field id="heroDescription" label="Hero Description" value={formData.heroDescription} onChange={handleChange} />
        <Field id="heroImage" label="Hero Image" value={formData.heroImage} onChange={handleChange} type="file" multiple />
      </>
    ),
    2: (
      <>
        <Field id="sectionTitle" label="Section Title" value={formData.sectionTitle} onChange={handleChange} />
        <Field id="sectionDescription" label="Section Description" value={formData.sectionDescription} onChange={handleChange} />
        <Field id="sectionImage" label="Section Image" value={formData.sectionImage} onChange={handleChange} type="file" multiple />
      </>
    ),
    3: (
      <>
        <Field id="productsImages" label="Product Image" value={formData.productsImages} onChange={handleChange} type="file" multiple />
        <Field id="servicesImages" label="Service Image" value={formData.servicesImages} onChange={handleChange} type="file" multiple />
        <Box>
          <Button variant="contained" color="primary" onClick={() => handleAddToArray('features')}>
            Add Feature
          </Button>
          {formData.features.map((feature: any, index: number) => (
            <Box key={index} display="flex" alignItems="center" mb={2}>
              <Field
                id={`features[${index}].title`}
                label="Feature Title"
                value={feature.title}
                onChange={(field, value) => handleArrayChange('features', index, 'title', value)}
              />
              <Field
                id={`features[${index}].description`}
                label="Feature Description"
                value={feature.description}
                onChange={(field, value) => handleArrayChange('features', index, 'description', value)}
              />
              <IconButton
                aria-label="remove feature"
                color="secondary"
                onClick={() => handleRemoveFromArray('features', index)}
              >
                <Remove />
              </IconButton>
            </Box>
          ))}
        </Box>
      </>
    ),
    4: (
      <>
        <Field id="location" label="Location" value={formData.location} onChange={handleChange} />
        <Field id="logoImage" label="Logo Image" value={formData.logoImage} onChange={handleChange} type="file" multiple />
      </>
    ),
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1, width: '100%' } }} noValidate autoComplete="off" className="grid gap-4 mt-4 ">
      {stepFields[step]}
    </Box>
  );
};

export default CompanyFormLayout;

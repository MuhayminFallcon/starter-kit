import { Box, TextField, Button } from '@mui/material';

type CompanyFormLayoutProps = {
  step: number;
  formData: any;
  handleChange: (field: string, value: any) => void;
  handleArrayChange: (arrayField: string, index: number, field: string, value: any) => void;
  handleAddToArray: (arrayField: string) => void;
  handleRemoveFromArray: (arrayField: string, index: number) => void;
};

const Field = ({ id, label, value, onChange, type = 'text' }: { id: string; label: string; value: any; onChange: (field: string, value: any) => void; type?: string }) => (
  <TextField
    id={id}
    label={label}
    variant="outlined"
    value={type === 'file' ? undefined : value}
    onChange={(e) => onChange(id, type === 'file' ? e.target.files : e.target.value)}
    type={type}
    InputLabelProps={type === 'file' ? { shrink: true } : undefined}
  />
);

const ArrayField = ({ items, onChange, onRemove, onAdd, labelPrefix }: { items: any[], onChange: (index: number, value: any) => void; onRemove: (index: number) => void; onAdd: () => void; labelPrefix: string }) => (
  <>
    {items.map((item: string, index: number) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Field
          id={`${labelPrefix}-${index}`}
          label={`${labelPrefix} ${index + 1}`}
          value={item}
          onChange={(e) => onChange(index, e.target.value)}
        />
        <Button onClick={() => onRemove(index)}>Remove</Button>
      </Box>
    ))}
    <Button onClick={onAdd}>Add {labelPrefix}</Button>
  </>
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
        <Field id="heroImage" label="Hero Image" value={formData.heroImage} onChange={handleChange} type="file" />
      </>
    ),
    2: (
      <>
        <Field id="sectionTitle" label="Section Title" value={formData.sectionTitle} onChange={handleChange} />
        <Field id="sectionDescription" label="Section Description" value={formData.sectionDescription} onChange={handleChange} />
        <Field id="sectionImage" label="Section Image" value={formData.sectionImage} onChange={handleChange} type="file" />
      </>
    ),
    3: (
      <>
        <ArrayField
          items={formData.productsImages}
          onChange={(index, value) => handleArrayChange('productsImages', index, 'value', value)}
          onRemove={(index) => handleRemoveFromArray('productsImages', index)}
          onAdd={() => handleAddToArray('productsImages')}
          labelPrefix="Product Image"
        />
        <ArrayField
          items={formData.servicesImages}
          onChange={(index, value) => handleArrayChange('servicesImages', index, 'value', value)}
          onRemove={(index) => handleRemoveFromArray('servicesImages', index)}
          onAdd={() => handleAddToArray('servicesImages')}
          labelPrefix="Service Image"
        />
      </>
    ),
    4: (
      <>
        <Field id="location" label="Location" value={formData.location} onChange={handleChange} />
        <Field id="logoImage" label="Logo Image" value={formData.logoImage} onChange={handleChange} type="file" />
        <ArrayField
          items={formData.features}
          onChange={(index, value) => handleArrayChange('features', index, 'title', value)}
          onRemove={(index) => handleRemoveFromArray('features', index)}
          onAdd={() => handleAddToArray('features')}
          labelPrefix="Feature"
        />
      </>
    ),
  };
  return (
    <Box sx={{ '& > :not(style)': { m: 1, width: '100%' } }} noValidate autoComplete="off">
      {stepFields[step]}
    </Box>
  );
};

export default CompanyFormLayout;


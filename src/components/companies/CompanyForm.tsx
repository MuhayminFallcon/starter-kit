import { Box, TextField, Button } from '@mui/material';

type CompanyFormProps = {
  step: number;
  formData: any;
  setFormData: (data: any) => void;
};

const CompanyForm = ({ step, formData, setFormData }: CompanyFormProps) => {
  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleArrayChange = (arrayField: string, index: number, field: string, value: any) => {
    const newArray = [...formData[arrayField]];
    newArray[index][field] = value;
    setFormData({
      ...formData,
      [arrayField]: newArray,
    });
  };

  const handleAddToArray = (arrayField: string) => {
    const newArray = [...formData[arrayField], ''];
    setFormData({
      ...formData,
      [arrayField]: newArray,
    });
  };

  const handleRemoveFromArray = (arrayField: string, index: number) => {
    const newArray = formData[arrayField].filter((_: any, i: number) => i !== index);
    setFormData({
      ...formData,
      [arrayField]: newArray,
    });
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1, width: '100%' } }} noValidate autoComplete="off">
      {step === 0 && (
        <>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <TextField
            id="subDomain"
            label="SubDomain"
            variant="outlined"
            value={formData.subDomain}
            onChange={(e) => handleChange('subDomain', e.target.value)}
          />
          <TextField
            id="emailContact"
            label="Email Contact"
            variant="outlined"
            value={formData.emailContact}
            onChange={(e) => handleChange('emailContact', e.target.value)}
          />
          <TextField
            id="phoneContact"
            label="Phone Contact"
            variant="outlined"
            value={formData.phoneContact}
            onChange={(e) => handleChange('phoneContact', e.target.value)}
          />
          <TextField
            id="tagline"
            label="Tagline"
            variant="outlined"
            value={formData.tagline}
            onChange={(e) => handleChange('tagline', e.target.value)}
          />
        </>
      )}
      {step === 1 && (
        <>
          <TextField
            id="heroTitle"
            label="Hero Title"
            variant="outlined"
            value={formData.heroTitle}
            onChange={(e) => handleChange('heroTitle', e.target.value)}
          />
          <TextField
            id="heroDescription"
            label="Hero Description"
            variant="outlined"
            value={formData.heroDescription}
            onChange={(e) => handleChange('heroDescription', e.target.value)}
          />
          <TextField
            id="heroImage"
            label="Hero Image"
            variant="outlined"
            value={formData.heroImage}
            onChange={(e) => handleChange('heroImage', e.target.value)}
          />
        </>
      )}
      {step === 2 && (
        <>
          <TextField
            id="sectionTitle"
            label="Section Title"
            variant="outlined"
            value={formData.sectionTitle}
            onChange={(e) => handleChange('sectionTitle', e.target.value)}
          />
          <TextField
            id="sectionDescription"
            label="Section Description"
            variant="outlined"
            value={formData.sectionDescription}
            onChange={(e) => handleChange('sectionDescription', e.target.value)}
          />
          <TextField
            id="sectionImage"
            label="Section Image"
            variant="outlined"
            value={formData.sectionImage}
            onChange={(e) => handleChange('sectionImage', e.target.value)}
          />
        </>
      )}
      {step === 3 && (
        <>
          {formData.productsImages.map((image: string, index: number) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label={`Product Image ${index + 1}`}
                variant="outlined"
                value={image}
                onChange={(e) => handleArrayChange('productsImages', index, 'value', e.target.value)}
              />
              <Button onClick={() => handleRemoveFromArray('productsImages', index)}>Remove</Button>
            </Box>
          ))}
          <Button onClick={() => handleAddToArray('productsImages')}>Add Product Image</Button>

          {formData.servicesImages.map((image: string, index: number) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label={`Service Image ${index + 1}`}
                variant="outlined"
                value={image}
                onChange={(e) => handleArrayChange('servicesImages', index, 'value', e.target.value)}
              />
              <Button onClick={() => handleRemoveFromArray('servicesImages', index)}>Remove</Button>
            </Box>
          ))}
          <Button onClick={() => handleAddToArray('servicesImages')}>Add Service Image</Button>
        </>
      )}
      {step === 4 && (
        <>
          <TextField
            id="location"
            label="Location"
            variant="outlined"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
          />

          <TextField
            id="logoImage"
            label="Logo Image"
            variant="outlined"
            value={formData.logoImage}
            onChange={(e) => handleChange('logoImage', e.target.value)}
          />
          {formData.features.map((feature: any, index: number) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label={`Feature Title ${index + 1}`}
                variant="outlined"
                value={feature.title}
                onChange={(e) => handleArrayChange('features', index, 'title', e.target.value)}
              />
              <TextField
                label={`Feature Description ${index + 1}`}
                variant="outlined"
                value={feature.description}
                onChange={(e) => handleArrayChange('features', index, 'description', e.target.value)}
              />
              <Button onClick={() => handleRemoveFromArray('features', index)}>Remove</Button>
            </Box>
          ))}
          <Button onClick={() => handleAddToArray('features')}>Add Feature</Button>
        </>
      )}
    </Box>
  );
};

export default CompanyForm;

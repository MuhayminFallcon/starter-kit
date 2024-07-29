import { Box, Grid, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { Edit } from '@mui/icons-material';
import { uploadImage } from '@/utils/imageUploader'; // Ensure the path is correct

type SectionDetailsProps = {
  formData: any;
  setFormData: (data: any) => void;
};

const SectionDetails = ({ formData, setFormData }: SectionDetailsProps) => {
  const [localImage, setLocalImage] = useState(null); // State to store local image URL
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSave = () => {
    setIsEditingTitle(false);
    setIsEditingDescription(false);
    setIsDialogOpen(false);
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLocalImage(imageUrl); // Set local image URL for immediate display
      const uploadedImageUrl = await uploadImage([file]);
      handleFieldChange('sectionImage', uploadedImageUrl); // Update with the actual uploaded image URL
      URL.revokeObjectURL(imageUrl); // Clean up the local URL
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <Grid container spacing={4} direction="rtl" className="section-details" alignItems="center" mb={2} mt={0}>
      <Grid item xs={12} sm={6} order={{ xs: 2, sm: 1 }}>
        <Box p={2} textAlign="right">
          {isEditingTitle ? (
            <TextField
              variant="outlined"
              fullWidth
              label="Section Title"
              value={formData.sectionTitle || ''}
              onChange={(e) => handleFieldChange('sectionTitle', e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              autoFocus
            />
          ) : (
            <Typography variant="h4" component="h2" gutterBottom onClick={() => setIsEditingTitle(true)} className="cursor-pointer">
              {formData.sectionTitle || 'Default Title'}
            </Typography>
          )}
          {isEditingDescription ? (
            <TextField
              variant="outlined"
              fullWidth
              label="Section Description"
              value={formData.sectionDescription || ''}
              onChange={(e) => handleFieldChange('sectionDescription', e.target.value)}
              onBlur={() => setIsEditingDescription(false)}
              autoFocus
            />
          ) : (
            <Typography variant="body1" gutterBottom onClick={() => setIsEditingDescription(true)} className="cursor-pointer">
              {formData.sectionDescription || 'Default description here.'}
            </Typography>
          )}
          {formData.redirectUrl && (
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsDialogOpen(true)}
                startIcon={<Edit />}
              >
                Contact Us
              </Button>
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
        <Box p={2} onClick={triggerFileInput}>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <Image
            src={localImage || formData.sectionImage || '/path/to/placeholder/image.jpg'}
            alt={formData.sectionTitle || 'Section Image'}
            layout="responsive"
            width={400} // Adjusted width
            height={300} // Adjusted height
            className="object-cover shadow-lg cursor-pointer"
          />
        </Box>
      </Grid>

      {/* Dialog for Redirect URL */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Edit Redirect URL</DialogTitle>
        <DialogContent>
          <TextField
            label="Redirect URL"
            fullWidth
            value={formData.redirectUrl || ''}
            onChange={(e) => handleFieldChange('redirectUrl', e.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">Close</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default SectionDetails;


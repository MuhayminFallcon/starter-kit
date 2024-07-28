import { Box, Grid, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { Edit } from '@mui/icons-material';
import { uploadImage } from '@/utils/imageUploader'; // Ensure the path is correct

type SectionDetailsProps = {
  sectionData?: {
    sectionTitle?: string;
    sectionDescription?: string;
    sectionImage?: string;
    redirectUrl?: string;
    secondaryColor?: string;
  };
  onSectionDataChange?: (newSectionData: any) => void;
};

const SectionDetails = ({ sectionData = {}, onSectionDataChange }: SectionDetailsProps) => {
  const [editableSectionData, setEditableSectionData] = useState(sectionData);
  const [localImage, setLocalImage] = useState(null); // State to store local image URL
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef(null);

  const placeholderData = {
    sectionTitle: 'Default Title',
    sectionDescription: 'Default description here.',
    sectionImage: '/path/to/placeholder/image.jpg', // Replace with actual placeholder image path
    redirectUrl: '#',
    secondaryColor: 'rgba(0, 0, 0, 0.5)', // Example color
  };

  const data = { ...placeholderData, ...editableSectionData };

  const handleFieldChange = (field, value) => {
    setEditableSectionData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSave = () => {
    if (typeof onSectionDataChange === 'function') {
      onSectionDataChange(editableSectionData);
    }
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
              value={editableSectionData.sectionTitle}
              onChange={(e) => handleFieldChange('sectionTitle', e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              autoFocus
            />
          ) : (
            <Typography variant="h4" component="h2" gutterBottom onClick={() => setIsEditingTitle(true)} className="cursor-pointer">
              {data.sectionTitle}
            </Typography>
          )}
          {isEditingDescription ? (
            <TextField
              variant="outlined"
              fullWidth
              label="Section Description"
              value={editableSectionData.sectionDescription}
              onChange={(e) => handleFieldChange('sectionDescription', e.target.value)}
              onBlur={() => setIsEditingDescription(false)}
              autoFocus
            />
          ) : (
            <Typography variant="body1" gutterBottom onClick={() => setIsEditingDescription(true)} className="cursor-pointer">
              {data.sectionDescription}
            </Typography>
          )}
          {data.redirectUrl && (
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
            src={localImage || data.sectionImage}
            alt={data.sectionTitle || "Section Image"}
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
            value={editableSectionData.redirectUrl}
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

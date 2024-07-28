import { Box, Grid, Typography, TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { FaStar, FaEdit, FaPlus } from 'react-icons/fa';
import React, { useState } from 'react';

const FeaturesSection = ({ features = [], onFeaturesChange }) => {
  const [editableFeatures, setEditableFeatures] = useState(features);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFieldChange = (index, field, value) => {
    const newFeatures = editableFeatures.map((feature, i) =>
      i === index ? { ...feature, [field]: value } : feature
    );
    setEditableFeatures(newFeatures);
  };

  const handleSave = () => {
    if (typeof onFeaturesChange === 'function') {
      onFeaturesChange(editableFeatures);
    }
    setEditingIndex(null);
    setIsEditingTitle(false);
    setIsEditingDescription(false);
    setIsDialogOpen(false);
  };

  const handleAddFeature = () => {
    const newFeature = { title: '', description: '' };
    setEditableFeatures([...editableFeatures, newFeature]);
    setEditingIndex(editableFeatures.length);
    setIsDialogOpen(true);
  };

  return (
    <Box className="features-section" p={2} mt={4}>
      <Typography variant="h5" component="h3" gutterBottom textAlign="right">
        نتميز
      </Typography>
      <Grid container spacing={4} className="features-list" direction="rtl">
        {editableFeatures.map((feature, index) => (
          <Grid item xs={12} sm={4} key={index} className="feature-item">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <FaStar size={32} className="feature-icon" />
              <IconButton onClick={() => { setEditingIndex(index); setIsDialogOpen(true); }}>
                <FaEdit />
              </IconButton>
            </Box>
            <Typography
              variant="h6"
              component="h4"
              className="feature-title"
              textAlign="right"
              onClick={() => { setEditingIndex(index); setIsEditingTitle(true); }}
            >
              {isEditingTitle && editingIndex === index ? (
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Feature Title"
                  value={feature.title}
                  onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                  autoFocus
                />
              ) : (
                feature.title
              )}
            </Typography>
            <Typography
              variant="body1"
              className="feature-description"
              textAlign="right"
              onClick={() => { setEditingIndex(index); setIsEditingDescription(true); }}
            >
              {isEditingDescription && editingIndex === index ? (
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Feature Description"
                  value={feature.description}
                  onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                  onBlur={() => setIsEditingDescription(false)}
                  autoFocus
                />
              ) : (
                feature.description
              )}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddFeature}
          startIcon={<FaPlus />}
        >
          Add Feature
        </Button>
      </Box>

      {/* Dialog for editing feature */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Edit Feature</DialogTitle>
        <DialogContent>
          {editingIndex !== null && (
            <>
              <TextField
                label="Feature Title"
                fullWidth
                value={editableFeatures[editingIndex]?.title || ''}
                onChange={(e) => handleFieldChange(editingIndex, 'title', e.target.value)}
                autoFocus
              />
              <TextField
                label="Feature Description"
                fullWidth
                value={editableFeatures[editingIndex]?.description || ''}
                onChange={(e) => handleFieldChange(editingIndex, 'description', e.target.value)}
                multiline
                rows={4}
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">Close</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FeaturesSection;

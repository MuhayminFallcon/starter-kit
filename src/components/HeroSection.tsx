import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { uploadImage } from '@/utils/imageUploader'; // Ensure the path is correct

const HeroSection = ({ heroData, onHeroDataChange }) => {
  const [editableHeroData, setEditableHeroData] = useState(heroData);
  const [localImage, setLocalImage] = useState(null); // State to store local image URL
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleFieldChange = (field, value) => {
    setEditableHeroData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSave = () => {
    if (typeof onHeroDataChange === 'function') {
      onHeroDataChange(editableHeroData);
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
      handleFieldChange('heroImage', uploadedImageUrl); // Update with the actual uploaded image URL
      URL.revokeObjectURL(imageUrl); // Clean up the local URL
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleTextIconClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="relative w-full" style={{ height: '512px' }}>
      <div className="relative w-full h-full" onClick={triggerFileInput}>
        {/* Image Container */}
        <div className="w-full h-full" style={{ zIndex: 1 }}>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <Image
            src={localImage || editableHeroData.heroImage}
            alt={editableHeroData.heroTitle || "Hero Image"}
            layout="fill"
            objectFit="cover"
            className="rounded-md cursor-pointer"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: editableHeroData.secondaryColor,
              mixBlendMode: 'multiply',
            }}
          />
        </div>

        {/* Text and Icon Container */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-50">
          {/* Title and Description */}
          <Box mb={2} onClick={handleTextIconClick}>
            {isEditingTitle ? (
              <TextField
                variant="outlined"
                fullWidth
                label="Hero Title"
                value={editableHeroData.heroTitle}
                onChange={(e) => handleFieldChange('heroTitle', e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                autoFocus
              />
            ) : (
              <h2
                className="text-4xl sm:text-6xl uppercase leading-tight w-full sm:w-9/12 mx-auto cursor-pointer"
                onClick={() => setIsEditingTitle(true)}
              >
                {editableHeroData.heroTitle || "Click to edit title"}
              </h2>
            )}
            <div className="h-1 w-20 bg-white mx-auto my-4"></div>
            {isEditingDescription ? (
              <TextField
                variant="outlined"
                fullWidth
                label="Hero Description"
                value={editableHeroData.heroDescription}
                onChange={(e) => handleFieldChange('heroDescription', e.target.value)}
                onBlur={() => setIsEditingDescription(false)}
                autoFocus
              />
            ) : (
              <p
                className="text-sm sm:text-xl capitalize font-normal mb-4 cursor-pointer"
                onClick={() => setIsEditingDescription(true)}
              >
                {editableHeroData.heroDescription || "Click to edit description"}
              </p>
            )}
          </Box>

          {/* Icon and Button Container */}
          <Box display="flex" alignItems="center" justifyContent="center" onClick={handleTextIconClick}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsDialogOpen(true)}
              startIcon={<Edit />}
            >
              Contact Us
            </Button>
          </Box>
        </div>
      </div>

      {/* Dialog for Redirect URL */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Edit Redirect URL</DialogTitle>
        <DialogContent>
          <TextField
            label="Redirect URL"
            fullWidth
            value={editableHeroData.redirectUrl}
            onChange={(e) => handleFieldChange('redirectUrl', e.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">Close</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HeroSection;

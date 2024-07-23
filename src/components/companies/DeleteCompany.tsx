import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { API_URL } from '@/services/companyService';

const DeleteCompany = ({ companyId, onDeleteSuccess }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${API_URL}/companies/${companyId}`);
      if (response.status === 200) {
        window.location.reload(); // Refresh the page if the deletion was successful
      } else {
        console.error('Deletion failed with status:', response.status);
        // Optionally, handle non-200 responses here
      }
    } catch (error) {
      console.error('Error during deletion:', error);
      setError('Failed to delete company. Please try again.'); // Optionally, set an error state to display the error message to the user
    }
  };

  return (
    <React.Fragment>
      <IconButton aria-label="delete" onClick={handleClickOpen} color="error">
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete company"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this company?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
        {error && <Typography variant="body2" color="error">{error}</Typography>}
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteCompany;

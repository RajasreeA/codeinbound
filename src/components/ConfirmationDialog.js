import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

const ConfirmationDialog = ({ open, onClose, onSubmit }) => {
  //  Inline styles for different elements
  const dialogStyle = {
    minWidth: '400px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const contentStyle = {
    marginBottom: '20px',
    color: '#333',
  };

  const buttonStyle = {
    marginRight: '10px',
    cursor:"pointer"
  };

  return (
    <Dialog open={open} onClose={onClose} style={dialogStyle}>
      <DialogTitle style={titleStyle}>Confirmation</DialogTitle>
      <DialogContent style={contentStyle}>
        <p>Are you sure you want to submit the survey?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary" style={buttonStyle}>
          Cancel
        </Button>
        <Button onClick={onSubmit} variant="outlined" color="primary" style={buttonStyle}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;

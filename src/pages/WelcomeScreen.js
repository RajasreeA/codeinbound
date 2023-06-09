import React from 'react';
import { Button, Typography } from '@material-ui/core';
import "../assets/SurveyForm.css"; // Importing the CSS file for styling

const WelcomeScreen = ({ onStart }) => {
  // Rendering the welcome screen
  return (
    <div className="welcome-screen"> {/* CSS class 'welcome-screen' for styling */}
      <Typography variant="h5">Welcome to the Customer Survey!</Typography> {/* Heading */}
      <Button onClick={onStart} variant="contained" color="primary"> {/* Button component */}
        Start
      </Button>
    </div>
  );
};

export default WelcomeScreen;

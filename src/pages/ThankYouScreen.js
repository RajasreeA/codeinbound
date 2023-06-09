import React from 'react';
import "../assets/SurveyForm.css"; // Importing the CSS file for styling

const ThankYouScreen = () => {
  // Rendering the thank you screen
  return (
    <div className='thank-you'> {/* CSS class 'thank-you' for styling */}
      <h1>Thank you for completing the survey!</h1> {/* Heading */}
      <p>Your responses have been saved.</p> {/* Message indicating that the responses have been saved */}
      <p>You will be redirected back to the Welcome screen shortly...</p> {/* Message indicating redirection */}
    </div>
  );
};

export default ThankYouScreen;

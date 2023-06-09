import React, { useState } from 'react';
import { Typography, Grid, TextField, Button } from '@material-ui/core';
import Rating from '@mui/material/Rating';
import '../assets/SurveyForm.css';

const Question = ({
  question,
  onAnswer,
  onNext,
  onPrevious,
  onSkip,
  currentQuestion,
  totalQuestions,
}) => {
  const [rating, setRating] = useState(0);
  const [textAnswer, setTextAnswer] = useState('');

  const handleRating = (event, value) => {
    setRating(value);
  };

  const handleTextAnswerChange = (event) => {
    setTextAnswer(event.target.value);
  };

  const handleNext = () => {
    onAnswer({ rating, textAnswer });
    setRating(0);
    setTextAnswer('');
    onNext();
  };

  const handleSkip = () => {
    setRating(0);
    setTextAnswer('');
    onSkip();
  };
  const handlePrevious = () => {
    setRating(0);
    setTextAnswer('');
    onPrevious();
  };
  const isNextDisabled = () => {
    if (currentQuestion === totalQuestions) {
      return textAnswer.trim() === '';
    } else if (currentQuestion === 5) {
      return rating === 0 || textAnswer.trim() === '';
    } else {
      return rating === 0;
    }
  };

  const isPreviousDisabled = () => {
    return currentQuestion === 0;
  };

  return (
    <div className="question-container">
      <Typography variant="h5">Question {currentQuestion}/{totalQuestions}</Typography>
      <Typography variant="h5">{question}</Typography>
      {
        rating!=0 &&
        <Typography variant="h6">Rating:{rating}</Typography>
      }
      

      {currentQuestion !== totalQuestions && (
        <Grid container spacing={2} className="input-container">
          <Grid item xs={12}>
            <Rating
            size='large'
              value={rating}
              max={currentQuestion === 4 ? 10 : 5}
              onChange={handleRating}
            />
          </Grid>
          {currentQuestion === 5 && (
            <Grid item xs={12}>
              <TextField
                label="Your answer"
                variant="outlined"
                multiline
                rows={4}
                value={textAnswer}
                onChange={handleTextAnswerChange}
              />
            </Grid>
          )}
          <Grid item xs={12} className="button-container">
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={isNextDisabled()}
            >
              Next
            </Button>
            {currentQuestion > 1 && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handlePrevious}
                disabled={isPreviousDisabled()}
              >
                Previous
              </Button>
            )}
            <Button variant="contained" onClick={handleSkip}>
              Skip
            </Button>
          </Grid>
        </Grid>
      )}
      {currentQuestion === totalQuestions && (
        <Grid container spacing={2} className="input-container">
          <Grid item xs={12}>
            <TextField
              label="Your answer"
              variant="outlined"
              multiline
              rows={4}
              value={textAnswer}
              onChange={handleTextAnswerChange}
            />
          </Grid>
          <Grid item xs={12} className="button-container">
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={isNextDisabled()}
            >
              Submit
            </Button>
            {currentQuestion > 0 && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handlePrevious}
                disabled={isPreviousDisabled()}
              >
                Previous
              </Button>
            )}
            <Button variant="contained" onClick={handleSkip}>
              Skip
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Question;

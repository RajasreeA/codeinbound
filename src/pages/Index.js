import React, { useState, useEffect } from "react";
import WelcomeScreen from "./WelcomeScreen";
import Question from "../components/Question";
import ConfirmationDialog from "../components/ConfirmationDialog";
import ThankYouScreen from "./ThankYouScreen";
import { question } from "../assets/Data";

const Survey = () => {
  // State variables
  const [questions] = useState(question); // Stores the survey questions
  const [currentQuestion, setCurrentQuestion] = useState(0); // Index of the current question
  const [answers, setAnswers] = useState([]); // Array to store user's answers
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true); // Controls the visibility of the welcome screen
  const [sessionId, setSessionId] = useState(""); // Unique identifier for the survey session
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false); // Controls the visibility of the confirmation dialog
  const [completed, setCompleted] = useState(false); // Tracks if the survey has been completed
  const [showThankYouScreen, setShowThankYouScreen] = useState(false); // Controls the visibility of the thank you screen

  // useEffect hook to generate or retrieve the session ID on component mount
  useEffect(() => {
    const storedSessionId = localStorage.getItem("sessionId");

    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = generateSessionId();
      localStorage.setItem("sessionId", newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  // useEffect hook to handle completion of the survey
  useEffect(() => {
    if (completed) {
      saveAnswersToDatabase(answers); // Save answers to the database
      saveCompletionFlagToDatabase(); // Set completion flag in the database
      setShowThankYouScreen(true); // Show the thank you screen

      // Reset the state and hide the thank you screen after 5 seconds
      const timer = setTimeout(() => {
        setShowThankYouScreen(false);
        setShowWelcomeScreen(true);
        setAnswers([]);
        setCurrentQuestion(0);
        setCompleted(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [completed, answers]);

  // Function to handle the start of the survey
  const handleStart = () => {
    setShowWelcomeScreen(false); // Hide the welcome screen
    localStorage.clear(); // Clear local storage
  };

  // Function to move to the next question
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowConfirmationDialog(true); // Show the confirmation dialog if it's the last question
    }
  };

  // Function to move to the previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Function to skip the current question
  const handleSkip = () => {
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        questionId: currentQuestion,
        answerId: null,
      },
    ]);
    handleNext();
  };

  // Function to handle the selection of an answer
  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = {
      questionId: currentQuestion,
      answerId: generateAnswerId(),
      answer: answer,
    };
    setAnswers(updatedAnswers);
  };

  // Function to handle the submission of the survey
  const handleSubmit = () => {
    setShowConfirmationDialog(false); // Hide the confirmation dialog
    setCompleted(true); // Set the survey as completed
    saveCompletionFlagToDatabase(); // Set completion flag in the database
  };

  // Function to handle the closure of the confirmation dialog
  const handleConfirmationDialogClose = () => {
    setShowConfirmationDialog(false);
  };

  // Function to generate a unique session ID for the survey
  const generateSessionId = () => {
    // Generate a unique session ID using a library or custom logic
    return "session-id";
  };

  // Function to generate a unique answer ID for each answer
  const generateAnswerId = () => {
    // Generate a unique answer ID using a library or custom logic
    return "answer-id";
  };

  // Function to save the answers to the database or local storage
  const saveAnswersToDatabase = (answers) => {
    // Save the answers in the database or local storage
    // Each answer should have a unique ID that identifies the question and answer
    // You can use the session ID to associate the answers with the customer's session

    // For example, to save the answers in local storage:
    const storedAnswers = localStorage.getItem("answers");
    const parsedAnswers = storedAnswers ? JSON.parse(storedAnswers) : {};
    const sessionAnswers = parsedAnswers[sessionId] || {};
    const updatedSessionAnswers = { ...sessionAnswers, ...answers };
    parsedAnswers[sessionId] = updatedSessionAnswers;
    localStorage.setItem("answers", JSON.stringify(parsedAnswers));
  };

  // Function to set the completion flag in the database or local storage
  const saveCompletionFlagToDatabase = () => {
    // Set the flag as 'COMPLETED' in the database or local storage

    localStorage.setItem("surveyCompleted", "COMPLETED");
  };

  // Rendering the survey components based on the state
  return (
    <>
      {showWelcomeScreen ? (
        <WelcomeScreen onStart={handleStart} />
      ) : showThankYouScreen ? (
        <div>
          <ThankYouScreen />
        </div>
      ) : (
        <>
          <Question
            question={questions[currentQuestion]}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSkip={handleSkip}
            currentQuestion={currentQuestion + 1}
            totalQuestions={questions.length}
          />
          <ConfirmationDialog
            open={showConfirmationDialog}
            onClose={handleConfirmationDialogClose}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </>
  );
};

export default Survey;

import { Flex, Heading, Button, VStack, Image, useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchQuizQuestions from "../../services/TriviaServices/QuizService";
import Trivia1SVG from "../../assets/trivia1.svg";
import { useMediaQuery } from 'react-responsive';
import { submitScore } from "../../services/TriviaServices/LeaderboardServices";

function Quiz() {
  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [userID, setUserID] = useState("1");
  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });


  useEffect(() => {
    const userJSON = localStorage.getItem("user");
        if (userJSON) {
          const userFromLocalStorage = JSON.parse(userJSON);
          setUserID(userFromLocalStorage.id);
        }
    const fetchQuestions = async () => {
      const data = await fetchQuizQuestions();
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  const showToast = (message, isSuccess) => {
   
    toast({
      title: message,
      status: isSuccess ? "success" : "warning",
      duration: 1500,
      isClosable: true,
      variant: isSuccess ? "subtle" : "solid",
      bg: isSuccess ? "#1db954" : "",
      color: isSuccess ? "white" : "",
      position: isMobile ? "top" : "bottom",
    });
    
  };

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
  };

  const handleAnswerClick = (selectedOption) => {
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (selectedOption === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
      showToast("Correct answer!", true);
    } else {
      showToast("Wrong answer!", false);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizEnded(true);
      submitScore(userID, score); // Submit the score to the backend
    }
  };

  const navigateToLeaderboard = () => {
    navigate("/leaderboard");
  };

  return (
    isMobile ?
    questions ? (
     
      <Flex justifyContent="start" minH="90vh" backgroundColor="#000C66" w="100%" flexDirection="column" alignItems="center"  isMobile="true">
        {!isQuizEnded ? isQuizStarted ? (
          <VStack spacing="4" direction="column" align="start" color="white" mt="32px" mb="16px">
            <Heading mb="32px" textAlign="center" size="lg"  >{questions[currentQuestionIndex].question}</Heading>
            {["option1", "option2", "option3", "option4"].map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerClick(questions[currentQuestionIndex][option])}
                colorScheme="blue"
                size="sm"
                width="60%" // Adjust the width as needed
                textAlign="center"
                alignSelf="center"
                whiteSpace="normal" // Allow text to wrap
                wordWrap="break-word" // If needed, break words to fit within the width
              
                overflow="hidden" // Hide any overflow content
               // Break the words if needed to fit within the Button
                overflowWrap="break-word" // Wrap the content within words, if possible
                padding="12px" // Adjust padding as needed
              >
                {questions[currentQuestionIndex][option]}
              </Button>
            ))}
          </VStack>
        ) : (
          <>
            <Image src={Trivia1SVG} alt="Animated Woman with Power" boxSize="25vh" m="16px"/>
            <Heading  color="white" mb="24px" mt="64px" textAlign="center">
              Welcome to Song Trivia!
            </Heading>
            <Button onClick={handleStartQuiz} colorScheme="blue" size="lg">
              Start Trivia
            </Button>
          </>
        ) : (
          <Flex  justifyContent="center" flexDirection="column">
            <Heading as="h1" size="xl" color="white" alignSelf="center" mt="128px" mb="32px">
              Quiz completed! <br /> Your score: {score} / 5
            </Heading>
            <Button onClick={async () => {
              navigateToLeaderboard();
            }} colorScheme="blue" size="lg">
              Leaderboard
            </Button>
          </Flex>
        )}
      </Flex>
    ) : null

    :

    questions ? (
      <Flex justifyContent="start" minH="90vh" backgroundColor="#000C66" w="100%" flexDirection="column" alignItems="center">
        {!isQuizEnded ? isQuizStarted ? (
          <VStack spacing="4" direction="column" align="start" color="white" mt="64px" mb="32px">
            <Heading mb="64px">{questions[currentQuestionIndex].question}</Heading>
            {["option1", "option2", "option3", "option4"].map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerClick(questions[currentQuestionIndex][option])}
                colorScheme="blue"
                size="md"
                width="60%"
                maxW="480px"
                textAlign="center"
                alignSelf="center"
              >
                {questions[currentQuestionIndex][option]}
              </Button>
            ))}
          </VStack>
        ) : (
          <>
            <Image src={Trivia1SVG} alt="Animated Woman with Power" boxSize="45vh" />
            <Heading as="h1" size="2xl" color="white" mt="64px" mb="32px">
              Welcome to Song Trivia!
            </Heading>
            <Button onClick={handleStartQuiz} colorScheme="blue" size="lg">
              Start Trivia
            </Button>
          </>
        ) : (
          <Flex direction="column" alignItems="center" width="100%">
            <Heading as="h1" size="xl" color="white" mt="248px" mb="32px">
              Quiz completed! <br /> Your score: {score} / 5
            </Heading>
            <Button onClick={async () => {
                
                navigateToLeaderboard();
            }} colorScheme="blue" size="lg">
              Leaderboard
            </Button>
          </Flex>
        )}
      </Flex>
    ) : null
  );
}

export default Quiz;

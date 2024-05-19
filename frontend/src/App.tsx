// App.tsx
import React, { useState } from "react";
import { GameState, Participant, ScreenKind, RoundData } from "./types";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import RoundSummaryScreen from "./components/RoundSummaryScreen";
import ResultsScreen from "./components/ResultsScreen";
import { Box, Center } from "@chakra-ui/react";
import { getQuestion } from "./api/functions";

export const QUESTION_URI = import.meta.env.VITE_QUESTION_URI;
export const SCORE_URI = import.meta.env.VITE_SCORE_URI;

const initialGameState: GameState = {
  participants: [],
  rounds: 0,
  currentRound: 0,
  currentScreen: ScreenKind.Start,
  roundData: [],
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const startGame = async (participants: Participant[], rounds: number) => {
    const { imageURL, answer } = await getQuestion();
    let round = {
      imageURL: imageURL,
      answerPrompt: answer,
      answers: [],
      scores: [],
    };
    setGameState({
      participants: participants,
      rounds: rounds,
      currentRound: 1,
      currentScreen: ScreenKind.Game,
      roundData: [round],
    });
  };

  const showAnswer = async (newParticipants: Participant[], round: RoundData) => {
    // update current roundData to round
    const newRoundData = [...gameState.roundData];
    newRoundData[gameState.currentRound - 1] = round;
    setGameState(prevState => ({
      ...prevState,
      participants: newParticipants,
      currentScreen: ScreenKind.RoundSummary,
      roundData: newRoundData,
    }));
  };

  const nextRound = async () => {
    if (gameState.currentRound < gameState.rounds) {
      const { imageURL, answer } = await getQuestion();
      let round = {
        imageURL: imageURL,
        answerPrompt: answer,
        answers: [],
        scores: [],
      };
      setGameState((prevState) => ({
        ...prevState,
        currentRound: prevState.currentRound + 1,
        currentScreen: ScreenKind.Game,
        roundData: [...prevState.roundData, round],
      }));
    } else {
      setGameState((prevState) => ({
        ...prevState,
        currentScreen: ScreenKind.Results,
      }));
    }
  };

  const returnToStart = () => {
    setGameState(initialGameState);
  };

  return (
    <Center minHeight="100vh" minWidth="100vw">
      <Box textAlign="center" py={10} px={6}>
        {gameState.currentScreen === ScreenKind.Start && (
          <StartScreen startGame={startGame} />
        )}
        {gameState.currentScreen === ScreenKind.Game && (
          <GameScreen gameState={gameState} showAnswer={showAnswer} />
        )}
        {gameState.currentScreen === ScreenKind.RoundSummary && (
          <RoundSummaryScreen gameState={gameState} nextRound={nextRound} />
        )}
        {gameState.currentScreen === ScreenKind.Results && (
          <ResultsScreen gameState={gameState} returnToStart={returnToStart} />
        )}
      </Box>
    </Center>
  );
};

export default App;

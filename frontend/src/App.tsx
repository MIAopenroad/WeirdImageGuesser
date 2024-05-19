// App.tsx
import React, { useState } from "react";
import { GameState, Participant, ScreenKind } from "./types";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
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
  imageURL: "",
  answerPrompt: "",
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const startGame = async (participants: Participant[], rounds: number) => {
    const { imageURL, answer } = await getQuestion();
    setGameState({
      participants: participants,
      rounds: rounds,
      currentRound: 1,
      currentScreen: ScreenKind.Game,
      imageURL: imageURL,
      answerPrompt: answer,
    });
  };

  const nextRound = async (newParticipants: Participant[]) => {
    if (gameState.currentRound < gameState.rounds) {
      const { imageURL, answer } = await getQuestion();
      setGameState((prevState) => ({
        ...prevState,
        participants: newParticipants,
        currentRound: prevState.currentRound + 1,
        imageURL: imageURL,
        answerPrompt: answer,
      }));
    } else {
      setGameState((prevState) => ({
        ...prevState,
        participants: newParticipants,
        currentScreen: ScreenKind.Results,
        imageURL: "",
        answerPrompt: "",
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
          <GameScreen gameState={gameState} nextRound={nextRound} />
        )}
        {gameState.currentScreen === ScreenKind.Results && (
          <ResultsScreen gameState={gameState} returnToStart={returnToStart} />
        )}
      </Box>
    </Center>
  );
};

export default App;

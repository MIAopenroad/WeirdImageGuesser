// App.tsx
import React, { useState } from 'react';
import { GameState, Participant, ScreenKind } from './types';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultsScreen from './components/ResultsScreen';
import { Box, Center } from '@chakra-ui/react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    participants: [],
    rounds: 0,
    currentRound: 0,
    currentScreen: ScreenKind.Start
  });

  const startGame = (participants: Participant[], rounds: number) => {
    setGameState({
      participants,
      rounds,
      currentRound: 1,
      currentScreen: ScreenKind.Game
    });
  };

  const nextRound = (newParticipants: Participant[]) => {
    if (gameState.currentRound < gameState.rounds) {
      setGameState(prevState => ({
        ...prevState,
        participants: newParticipants,
        currentRound: prevState.currentRound + 1
      }));
    } else {
      setGameState(prevState => ({
        ...prevState,
        participants: newParticipants,
        currentScreen: ScreenKind.Results
      }));
    }
  };

  const returnToStart = () => {
    setGameState({
      participants: [],
      rounds: 0,
      currentRound: 0,
      currentScreen: ScreenKind.Start
    });
  };

  return (
    <Center minHeight="100vh" minWidth="100vw">
      <Box textAlign="center" py={10} px={6}>
        {gameState.currentScreen === ScreenKind.Start && <StartScreen startGame={startGame} />}
        {gameState.currentScreen === ScreenKind.Game && <GameScreen gameState={gameState} nextRound={nextRound} />}
        {gameState.currentScreen === ScreenKind.Results && <ResultsScreen gameState={gameState} returnToStart={returnToStart} />}
      </Box>
    </Center>
  );
};

export default App;

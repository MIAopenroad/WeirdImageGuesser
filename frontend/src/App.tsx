// App.tsx
import React, { useState } from 'react';
import { GameState, Participant, ScreenType, RoundData } from './types';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import RoundSummaryScreen from './components/RoundSummaryScreen';
import ResultsScreen from './components/ResultsScreen';
import { Box, Center } from '@chakra-ui/react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    participants: [],
    rounds: 0,
    currentRound: 0,
    roundData: [],
    currentScreen: ScreenType.Start
  });

  const startGame = (participants: Participant[], rounds: number) => {
    setGameState({
      participants,
      rounds,
      currentRound: 1,
      roundData: [],
      currentScreen: ScreenType.Game
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
        currentScreen: ScreenType.Results
      }));
    }
  };

  const moveToNextGameRound = () => {
    setGameState(prevState => ({
      ...prevState,
      currentScreen: ScreenType.Game
    }));
  };


  const returnToStart = () => {
    setGameState({
      participants: [],
      rounds: 0,
      currentRound: 0,
      currentScreen: ScreenType.Start
    });
  };

  return (
    <Center minHeight="100vh" minWidth="100vw">
      <Box textAlign="center" py={10} px={6}>
        {gameState.currentScreen === ScreenType.Start && <StartScreen startGame={startGame} />}
        {gameState.currentScreen === ScreenType.Game && <GameScreen gameState={gameState} nextRound={nextRound} />}
        {gameState.currentScreen === ScreenType.RoundSummary && <RoundSummaryScreen gameState={gameState} moveToNextGameRound={moveToNextGameRound} />}
        {gameState.currentScreen === ScreenType.Results && <ResultsScreen gameState={gameState} returnToStart={returnToStart} />}
      </Box>
    </Center>
  );
};

export default App;

// components/RoundSummaryScreen.tsx
import React from 'react';
import { GameState } from '../types';
import {
  Box,
  Button,
  List,
  ListItem,
  Stack,
  Heading,
  Text,
  Center
} from '@chakra-ui/react';

interface RoundSummaryScreenProps {
  gameState: GameState;
  moveToNextGameRound: () => void;
}

const RoundSummaryScreen: React.FC<RoundSummaryScreenProps> = ({ gameState, moveToNextGameRound }) => {
  const currentRoundIndex = gameState.currentRound - 1;
  const roundData = gameState.roundData[currentRoundIndex];

  return (
    <Center minHeight="100vh">
      <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="lg" mb={6}>
          Round {gameState.currentRound} Summary
        </Heading>
        <Text mb={4}>Question: {roundData.question}</Text>
        <List spacing={3} mb={6}>
          {gameState.participants.map((participant, index) => (
            <ListItem key={index}>
              <Text fontSize="lg">
                {participant.name}'s Answer: {roundData.answers[index]}
                <br />
                Correct Answer: {roundData.correctAnswers[index]}
                <br />
                Score: {roundData.scores[index]}
              </Text>
            </ListItem>
          ))}
        </List>
        <Button colorScheme="teal" onClick={moveToNextGameRound}>
          Next Round
        </Button>
      </Box>
    </Center>
  );
};

export default RoundSummaryScreen;

// components/ResultsScreen.tsx
import React from 'react';
import { GameState } from '../types';
import {
  Button,
  List,
  ListItem,
  Stack,
  Heading,
  Text,
} from '@chakra-ui/react';

interface ResultsScreenProps {
  gameState: GameState;
  returnToStart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ gameState, returnToStart }) => {
  const { participants } = gameState;

  return (
    <>
      <Heading as="h2" size="lg" mb={6}>
        Results
      </Heading>
      <List spacing={3}>
        {participants.map((participant, index) => (
          <ListItem key={index}>
            <Text fontSize="xl">
              {participant.name}: {participant.score} points
            </Text>
          </ListItem>
        ))}
      </List>
      <Stack spacing={4} mt={6}>
        <Button colorScheme="teal" onClick={returnToStart}>
          Return to Start
        </Button>
      </Stack>
    </>
  );
};

export default ResultsScreen;

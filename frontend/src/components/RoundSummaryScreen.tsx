// components/RoundSummaryScreen.tsx
import React from 'react';
import { GameState } from '../types';
import {
  Image,
  Button,
  List,
  ListItem,
  Heading,
  Text,
} from '@chakra-ui/react';

interface RoundSummaryScreenProps {
  gameState: GameState;
  nextRound: () => void;
}

const RoundSummaryScreen: React.FC<RoundSummaryScreenProps> = ({ gameState, nextRound }) => {
  const { participants, currentRound, rounds, roundData } = gameState;

  return (
    <>
      <Heading as="h2" size="lg" mb={6}>
        Round {gameState.currentRound} Summary
      </Heading>
      <Image src={roundData[currentRound - 1].imageURL} />
      <Text fontSize="lg" mb={6}>
        Answer Prompt: {roundData[currentRound - 1].answerPrompt}
      </Text>
      <List spacing={3} mb={6}>
        {gameState.participants.map((participant, index) => (
          <ListItem key={index}>
            <Text fontSize="lg">
              {participant.name}'s Answer: {roundData[currentRound - 1].answers[index]}
              <br />
              Score: {roundData[currentRound - 1].scores[index]}
            </Text>
          </ListItem>
        ))}
      </List>
      <Button colorScheme="teal" onClick={nextRound}>
        Next Round
      </Button>
    </>
  );
};

export default RoundSummaryScreen;

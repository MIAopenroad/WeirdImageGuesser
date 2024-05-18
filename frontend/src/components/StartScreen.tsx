// components/StartScreen.tsx
import React, { useState } from 'react';
import { Participant } from '../types';
import { APP_TITLE } from '../consts';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
} from '@chakra-ui/react';

interface StartScreenProps {
  startGame: (participants: Participant[], rounds: number) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ startGame }) => {
  const [numParticipants, setNumParticipants] = useState(0);
  const [rounds, setRounds] = useState(0);

  const handleStart = () => {
    const participants = Array.from({ length: numParticipants }, (_, index) => ({
      name: `Player ${index + 1}`,
      score: 0
    }));
    startGame(participants, rounds);
  };

  return (
    <>
      <Heading as="h1" size="xl" mb={6}>
        {APP_TITLE}
      </Heading>
      <Stack spacing={4} as="form" onSubmit={e => e.preventDefault()}>
        <FormControl id="numParticipants">
          <FormLabel>Number of Participants</FormLabel>
          <Input type="number" value={numParticipants} onChange={e => setNumParticipants(parseInt(e.target.value))} />
        </FormControl>
        <FormControl id="rounds">
          <FormLabel>Number of Rounds</FormLabel>
          <Input type="number" value={rounds} onChange={e => setRounds(parseInt(e.target.value))} />
        </FormControl>
        <Button colorScheme="teal" onClick={handleStart}>
          Start Game
        </Button>
      </Stack>
    </>
  );
};

export default StartScreen;

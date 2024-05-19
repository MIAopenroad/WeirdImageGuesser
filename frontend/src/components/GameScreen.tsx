// components/GameScreen.tsx
// import { GameState, Participant, ScreenType } from '../types';
import React, { useState } from 'react';
import { QUESTION } from '../consts';
import { GameState, Participant } from '../types';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Heading,
} from '@chakra-ui/react';

interface GameScreenProps {
  gameState: GameState;
  nextRound: (newParticipants: Participant[]) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameState, nextRound }) => {
  const { participants, currentRound, rounds, imageURL, answerPrompt } = gameState;
  const [answers, setAnswers] = useState(Array(participants.length).fill(''));

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    scores = gradeAnswers(answers, answerPrompt);
    const newParticipants = participants.map((participant, index) => ({
      ...participant,
      score: participant.score + scores[index]
    }));
    nextRound(newParticipants);
  };

  return (
    <>
      <Heading as="h2" size="lg" mb={6}>
        Round {currentRound} of {rounds}
      </Heading>
      <Text mb={6}>{QUESTION}</Text>
      {/* imageURL */}
      <Stack spacing={4}>
        {participants.map((participant, index) => (
          <FormControl key={index} id={`answer-${index}`}>
            <FormLabel>{participant.name}'s Answer</FormLabel>
            <Input
              type="text"
              value={answers[index]}
              onChange={e => handleAnswerChange(index, e.target.value)}
            />
          </FormControl>
        ))}
        <Button colorScheme="teal" onClick={handleSubmit}>
          {currentRound === rounds ? 'Finish Game' : 'Next Round'}
        </Button>
      </Stack>
    </>
  );
};

export default GameScreen;

// components/GameScreen.tsx
// import { GameState, Participant, ScreenType } from '../types';
import React, { useState } from 'react';
import { QUESTION } from '../consts';
import { GameState, Participant, RoundData } from '../types';
import { gradeAnswers } from '../api/functions';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Heading,
  Image,
} from '@chakra-ui/react';

interface GameScreenProps {
  gameState: GameState;
  showAnswer: (newParticipants: Participant[], round: RoundData) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameState, showAnswer }) => {
  const { participants, currentRound, rounds, roundData } = gameState;
  const [answers, setAnswers] = useState(Array(participants.length).fill(''));

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    const { scores } = await gradeAnswers(answers, roundData[currentRound - 1].answerPrompt);
    const round: RoundData = {
      ...roundData[currentRound - 1],
      answers: answers,
      scores: scores,
    }
    const newParticipants = participants.map((participant, index) => ({
      ...participant,
      score: participant.score + scores[index]
    }));
    showAnswer(newParticipants, round);
  };

  return (
    <>
      <Heading as="h2" size="lg" mb={6}>
        Round {currentRound} of {rounds}
      </Heading>
      <Text mb={6}>{QUESTION}</Text>
      <Image src={roundData[currentRound - 1].imageURL} />
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
          Show Answer
        </Button>
      </Stack>
    </>
  );
};

export default GameScreen;

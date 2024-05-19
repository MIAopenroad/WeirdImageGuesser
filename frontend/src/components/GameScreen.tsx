// components/GameScreen.tsx
// import { GameState, Participant, ScreenType } from '../types';
import React, { useState, useEffect } from 'react';
import { GameState, Participant } from '../types';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Heading,
  Grid,
  GridItem,
} from '@chakra-ui/react';

interface GameScreenProps {
  gameState: GameState;
  nextRound: (newParticipants: Participant[]) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameState, nextRound }) => {
  const { participants, currentRound, rounds } = gameState;
  const [answers, setAnswers] = useState(Array(participants.length).fill(''));
  const [canAnswer, setCanAnswer] = useState<boolean[]>(Array(participants.length).fill(true))
  const [answered, setAnswered] = useState<boolean[]>(Array(participants.length).fill(false))
  // const [currentParticipant, setCurrentParticipant] = useState(0)


  // useEffect(() =>{
  //   setCanAnswer(prev => prev.map((_, index)=> index === 0));
  // },[]);
  
  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };
  const handleAnswerDone = (index: number) => {
    // 回答済みボタンがクリックされたら、answeredステートを更新する
    setAnswered(prev => {
      const newAnswered = [...prev];
      newAnswered[index] = true;
      return newAnswered;
    });
    // 入力を無効化する
    let newCanAnswer = [...canAnswer];
    newCanAnswer[index] = false;
    setCanAnswer(newCanAnswer);
  };

  const handleSubmit = () => {
    // Update participant scores based on answers (mock logic)
    const newParticipants = participants.map((participant, index) => ({
      ...participant,
      score: participant.score + (answers[index] === 'correct' ? 1 : 0) // Example scoring logic
    }));

    // 次のラウンドに進む前に入力を有効化する
    setCanAnswer(Array(participants.length).fill(true));
    setAnswered(Array(participants.length).fill(false));
    setAnswers(Array(participants.length).fill(''));

    if (answered.every(answer => answer)){
      nextRound(newParticipants);
    }
  };

  return (
    <>
      <div style={{ position: 'absolute', top: 40, left: 0, width: '100%', textAlign: 'center' }}>
        <Heading as="h2" size="lg" mb={0}>
          Round {currentRound} of {rounds}
        </Heading>
        <Text mt={5} mb={6}>
          Quiz Question: What is the capital of France?
        </Text>
      </div>

      {/* <Stack spacing={4}> */}
      <Grid templateColumns="repeat(2,1fr)"templateRows="repeat(2,1ftr)"gap={5}>
        {participants.map((participant, index) => (
          <Stack spacing={4} style={{
            position: 'absolute',
            top: (index)%2 == 0 ? "20%": "55%",
            left: index < 2 ? "25%": "75%",
            transform: 'translateX(-50%)',
            width: '500px', // Stackの幅を調整
            height: '250px',
            border: '2px solid #333',
            padding: '50px',
            backgroundColor: '#f0f0f0',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          }}>
            <GridItem >
              <FormControl id={`answer-${index}`}>
                <FormLabel>{participant.name}'s Answer</FormLabel>
                <Input
                  type='text'
                  value={answers[index]}
                  onChange={e => handleAnswerChange(index, e.target.value)}
                  disabled={!canAnswer[index]}
                />
                <Button colorScheme="teal" onClick={()=> handleAnswerDone(index)}>
                  {answered[index] === true ? "Answer done" : "please answer"}
                </Button>
              </FormControl>
            </GridItem>
          </Stack>
        ))}
        {Array.from({length: 4 - participants.length}).map((_, index) =>(
          <Stack spacing={4} style={{position: 'absolute', top: (index+1)%2 == 0 ? "30%": "60%", left: (index+1)%2 == 0 ? "50%": "100%", transform: 'translateX(-50%)'}}>
            <GridItem >
              <FormControl id={`answer-${index+participants.length}`}>
              </FormControl>
            </GridItem>
          </Stack>
        ))}
      </Grid>

      <Stack spacing={5} style={{position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)'}}>
        <Button colorScheme="teal" onClick={handleSubmit}>
          {currentRound === rounds ? 'Finish Game' : 'Next Round'}
        </Button>
      </Stack>
      {/* </Stack> */}
    </>
  );
};

export default GameScreen;

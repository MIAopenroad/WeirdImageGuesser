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
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  SliderMark,
  Grid,
  GridItem,
  Container
} from '@chakra-ui/react';

interface StartScreenProps {
  startGame: (participants: Participant[], rounds: number) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ startGame }) => {
  const [numParticipants, setNumParticipants] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [playersName, setPlayersName] = useState(Array(numParticipants).fill(''));

  const handlePlayersName = (name: string,index: number) =>{
    const newPlayersName = [...playersName];
    newPlayersName[index] = name;
    setPlayersName(newPlayersName);
  }

  const handleStart = () => {
    const participants = Array.from({ length: numParticipants }, (_, index) => ({
      name: playersName[index],
      score: 0
    }));
    startGame(participants, rounds);
  };

  const handleParticipantChange = (value: number) =>{
    setNumParticipants(value);
  }

  const handleRoundsChange = (value: number) => {
    setRounds(value);
  }

  return (
    <>
      <div style={{position: 'absolute', top: 40, left: 0, width: '100%', textAlign: 'center'}}>
        <Heading as="h1" size="xl" mb={6} mt={0}>
          {APP_TITLE}
        </Heading>
      </div>

      <Stack spacing={4} as="form" onSubmit={e => e.preventDefault()}>
        <FormControl id="numParticipants">
          <FormLabel>Number of Participants</FormLabel>
          <Slider 
            aria-label='numParticipants=slider'
            style={{ width: '80%' }}
            colorScheme={'pink'}
            min={1}
            max={4}
            value={numParticipants}
            onChange={handleParticipantChange}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            {Array.from({ length: 4 }, (_, index) => (
              <SliderMark key={index + 1} value={index + 1} mt='1' ml='-2.5' fontSize='sm'>
                {index + 1}
              </SliderMark>
            ))}
            <SliderThumb boxSize={6} />
          </Slider>
        </FormControl>

        <FormControl id="rounds">
          <FormLabel>Number of Rounds</FormLabel>
          <Slider aria-label='rounds-slider' min={1} max={10} value={rounds} onChange={handleRoundsChange}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            {Array.from({ length: 10 }, (_, index) => (
              <SliderMark key={index + 1} value={index + 1} mt='1' ml='-2.5' fontSize='sm'>
                {index + 1}
              </SliderMark>
            ))}
            <SliderThumb boxSize={6} />
          </Slider>
        </FormControl>
        <div style={{position: 'relative', top: 20, left: 0, width: '100%', textAlign: 'center'}}>
        <Heading as="h1" size="xl" mb={6} mt={0}>
          参加者
        </Heading>
      </div>
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
          {Array.from({ length: numParticipants }).map((_, index) => (
            <GridItem key={`player-${index + 1}`} colSpan={1} rowSpan={1}>
              <Stack spacing={4} style={{ position: 'relative', width: '100%' }}>
                <FormControl id={`player-${index + 1}`}>
                  <FormLabel>{`Player ${index + 1} name`}</FormLabel>
                  <Input 
                  type='text'
                  onChange={e=> handlePlayersName(e.target.value, index)} />
                </FormControl>
              </Stack>
            </GridItem>
          ))}
          {Array.from({ length: 4 - numParticipants }).map((_, index) => (
            <GridItem key={`player-${ numParticipants -index}`} colSpan={1} rowSpan={1}>
              <Stack spacing={4} style={{ position: 'relative', width: '100%' }}>
                <FormControl id={`player-${index}`}>
                  <FormLabel>{`Player ${index + numParticipants + 1} name`}</FormLabel>
                  <Input 
                  type='text'
                  disabled
                  onChange={e=> handlePlayersName(e.target.value, index)} />
                </FormControl>
              </Stack>
            </GridItem>
          ))}
        </Grid>
        <div style={{
          position:"relative",
          bottom: "-50px",
        }}>
          <Button 
          colorScheme="teal" 
          onClick={handleStart}>
          Start Game
          </Button>
        </div>
      </Stack>
    </>
  );
};

export default StartScreen;

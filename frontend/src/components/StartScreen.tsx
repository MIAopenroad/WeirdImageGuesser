import React, { useState } from 'react';
import { Participant } from '../types';

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
    <div>
      <h1>Game Title</h1>
      <form onSubmit={e => e.preventDefault()}>
        <label>
          Number of Participants:
          <input type="number" value={numParticipants} onChange={e => setNumParticipants(parseInt(e.target.value))} />
        </label>
        <br />
        <label>
          Number of Rounds:
          <input type="number" value={rounds} onChange={e => setRounds(parseInt(e.target.value))} />
        </label>
        <br />
        <button onClick={handleStart}>Start Game</button>
      </form>
    </div>
  );
};

export default StartScreen;

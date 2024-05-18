import React from 'react';
import { GameState } from '../types';

interface ResultsScreenProps {
  gameState: GameState;
  returnToStart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ gameState, returnToStart }) => {
  const { participants } = gameState;

  return (
    <div>
      <h2>Results</h2>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>
            {participant.name}: {participant.score} points
          </li>
        ))}
      </ul>
      <button onClick={returnToStart}>Return to Start</button>
    </div>
  );
};

export default ResultsScreen;

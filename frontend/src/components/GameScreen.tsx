import React, { useState } from 'react';
import { GameState } from '../types';

interface GameScreenProps {
  gameState: GameState;
  nextRound: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameState, nextRound }) => {
  const { participants, currentRound, rounds } = gameState;
  const [answers, setAnswers] = useState(Array(participants.length).fill(''));

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // Update participant scores based on answers (mock logic)
    const newParticipants = participants.map((participant, index) => ({
      ...participant,
      score: participant.score + (answers[index] === 'correct' ? 1 : 0) // Example scoring logic
    }));
    nextRound();
  };

  return (
    <div>
      <h2>Round {currentRound} of {rounds}</h2>
      <p>Quiz Question: What is the capital of France?</p> {/* Example question */}
      {participants.map((participant, index) => (
        <div key={index}>
          <label>
            {participant.name}'s Answer:
            <input
              type="text"
              value={answers[index]}
              onChange={e => handleAnswerChange(index, e.target.value)}
            />
          </label>
        </div>
      ))}
      <button onClick={handleSubmit}>
        {currentRound === rounds ? 'Finish Game' : 'Next Round'}
      </button>
    </div>
  );
};

export default GameScreen;

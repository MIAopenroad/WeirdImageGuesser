export interface Participant {
  name: string;
  score: number;
}

export const ScreenKind = {
  Start: "start",
  Game: "game",
  Results: "results",
} as const;

export type ScreenType = (typeof ScreenKind)[keyof typeof ScreenKind];

export type QuestionResponse = {
  imageURL: string;
  answer: string;
};

export type ScoreResponse = {
  scores: number[];
};

export interface GameState {
  participants: Participant[];
  rounds: number;
  currentRound: number;
  currentScreen: ScreenType;
  imageURL: string;
  answerPrompt: string;
}

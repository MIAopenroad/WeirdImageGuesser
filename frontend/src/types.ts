export interface Participant {
  name: string;
  score: number;
}

export interface RoundData {
    imageURL: string;
    answerPrompt: string;
    answers: string[];
    scores: number[];
}

export const ScreenKind = {
  Start: "start",
  Game: "game",
  RoundSummary: "roundSummary",
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
  roundData: RoundData[];
}

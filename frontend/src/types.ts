export interface Participant {
    name: string;
    score: number;
}

export interface RoundData {
    imageURL: string;
    answers: string[];
    answerPrompt: string;
    scores: number[];
}

export const ScreenType = {
    Start: 'start',
    Game: 'game',
    RoundSummary: 'roundSummary',
    Results: 'results',
} as const;

export type ScreenType = typeof ScreenType[keyof typeof ScreenType];

export interface GameState {
    participants: Participant[];
    rounds: number;
    currentRound: number;
    roundData: RoundData[];
    currentScreen: ScreenType;
}
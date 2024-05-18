export interface Participant {
    name: string;
    score: number;
}

export const ScreenType = {
    Start: 'start',
    Game: 'game',
    Results: 'results',
} as const;

export type ScreenType = typeof ScreenType[keyof typeof ScreenType];

export interface GameState {
    participants: Participant[];
    rounds: number;
    currentRound: number;
    currentScreen: ScreenType;
}
  
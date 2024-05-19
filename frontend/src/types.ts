export interface Participant {
    name: string;
    score: number;
}

export const ScreenKind = {
    Start: 'start',
    Game: 'game',
    Results: 'results',
} as const;

export type ScreenType = typeof ScreenKind[keyof typeof ScreenKind];

export interface GameState {
    participants: Participant[];
    rounds: number;
    currentRound: number;
    currentScreen: ScreenType;
}
  
export interface Card {
  suit: string;
  rank: string;
  value: number;
}

export interface Player {
  id: number;
  hand: Card[];
  score: number;
  isBusted: boolean;
}

export interface Dealer {
  hand: Card[];
  score: number;
  isBusted: boolean;
}

export interface GameState {
  deck: Card[];
  players: Player[];

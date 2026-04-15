export type Suit = 'hearts' | 'diamonds' | 'clubs' | 'spades';
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';

export interface Card {
  suit: Suit;
  rank: Rank;
  value: number;
  isFaceUp: boolean;
}

export interface Player {
  id: string;
  name: string;
  hand: Card[];
  score: number;
  isBusted: boolean;
  isStanding: boolean;
  chips: number;
  currentBet: number;
  isAI: boolean;
  personality?: AIPersonality;
}

export interface Dealer {
  hand: Card[];
  score: number;
  isBusted: boolean;
  isStanding: boolean;
}

export type GamePhase = 'betting' | 'dealing' | 'playerTurn' | 'dealerTurn' | 'settlement' | 'finished';

export interface GameState {
  deck: Card[];
  players: Player[];
  dealer: Dealer;
  currentPlayerIndex: number;
  phase: GamePhase;
  round: number;
  message: string;
}

export type AIPersonality = 'cautious' | 'aggressive' | 'balanced' | 'risky';

export interface AIDecisionRequest {
  playerHand: Card[];
  dealerVisibleCard: Card | null;
  personality: AIPersonality;
  playerScore: number;
  availableChips: number;
  currentBet: number;
}

export type PlayerAction = 'hit' | 'stand' | 'doubleDown';

export interface AIDecisionResponse {
  action: PlayerAction;
  reasoning: string;
}

export const AI_PERSONALITIES: Record<AIPersonality, { name: string; description: string }> = {
  cautious: {
    name: 'Cautious Carl',
    description: 'Plays it safe, rarely takes risks, stands on lower totals',
  },
  aggressive: {
    name: 'Aggressive Alex',
    description: 'Takes bold moves, hits more often, doubles down frequently',
  },
  balanced: {
    name: 'Balanced Bob',
    description: 'Follows basic strategy, makes mathematically sound decisions',
  },
  risky: {
    name: 'Risky Rachel',
    description: 'Unpredictable, sometimes makes surprising moves for big wins',
  },
};

import { Card, Player, Dealer, GameState } from '@/types/Blackjack';

class Deck {
  private cards: Card[] = [];

  constructor() {
    this.createDeck();
    this.shuffle();
  }

  createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
      'A',
    ];
    for (const suit of suits) {
      for (const rank of ranks) {
        const value = this.getCardValue(rank);
        this.cards.push({ suit, rank, value });
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  dealCard(): Card | undefined {
    return this.cards.pop();
  }

  private getCardValue(rank: string): number {
    if (['J', 'Q', 'K'].includes(rank)) return 10;
    if (rank === 'A') return 11; // Ace can be 1 or 11, handled in score calculation

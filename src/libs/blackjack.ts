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
    return parseInt(rank, 10);
  }
}

const calculateScore = (hand: Card[]): number => {
  let score = 0;
  let numAces = 0;

  for (const card of hand) {
    score += card.value;
    if (card.rank === 'A') {
      numAces++;
    }
  }

  while (score > 21 && numAces > 0) {
    score -= 10; // Change Ace value from 11 to 1
    numAces--;
  }

  return score;
};

const dealInitialCards = (deck: Deck, players: Player[], dealer: Dealer) => {
  for (let i = 0; i < 2; i++) {
    for (const player of players) {
      const card = deck.dealCard();
      if (card) {
        player.hand.push(card);
      }
    }
    const dealerCard = deck.dealCard();
    if (dealerCard) {
      dealer.hand.push(dealerCard);
    }
  }

  // Calculate initial scores
  players.forEach((player) => {
    player.score = calculateScore(player.hand);
    player.isBusted = player.score > 21;
  });
  dealer.score = calculateScore(dealer.hand);
  dealer.isBusted = dealer.score > 21;
};

const playerHit = (deck: Deck, player: Player) => {
  const card = deck.dealCard();
  if (card) {
    player.hand.push(card);
    player.score = calculateScore(player.hand);
    player.isBusted = player.score > 21;
  }
};

const playerStand = () => {
  // Player's turn ends, nothing to do here directly
};

const playerDoubleDown = (deck: Deck, player: Player) => {
  const card = deck.dealCard();
  if (card) {
    player.hand.push(card);
    player.score = calculateScore(player.hand);
    player.isBusted = player.score > 21;
  }
  // In a real game, this would also involve doubling the bet
};

const dealerTurn = (deck: Deck, dealer: Dealer) => {
  while (dealer.score < 17 && !dealer.isBusted) {
    const card = deck.dealCard();
    if (card) {
      dealer.hand.push(card);
      dealer.score = calculateScore(dealer.hand);
      dealer.isBusted = dealer.score > 21;
    }
  }
};

const determineWinner = (players: Player[], dealer: Dealer) => {
  players.forEach((player) => {
    if (player.isBusted) {
      // Player busted, dealer wins
    } else if (dealer.isBusted) {
      // Dealer busted, player wins
    } else if (player.score > dealer.score) {
      // Player has higher score, player wins
    } else if (player.score < dealer.score) {
      // Dealer has higher score, dealer wins
    } else {
      // Push (tie)
    }
  });
};

export { Deck, calculateScore, dealInitialCards, playerHit, playerStand, playerDoubleDown, dealerTurn, determineWinner };

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


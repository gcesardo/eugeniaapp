import { Card, Rating } from '../types';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const createNewCard = (front: string, back: string): Card => ({
  id: crypto.randomUUID(),
  front,
  back,
  dueDate: Date.now(),
  interval: 0,
  ease: 2.5,
  repetition: 0,
  state: 'new',
  reviewHistory: []
});

// A simplified SuperMemo-2 Algorithm implementation
export const calculateReview = (card: Card, rating: Rating): Card => {
  let { interval, ease, repetition } = card;
  const now = Date.now();

  // Log the review
  const updatedHistory = [
    ...(card.reviewHistory || []), 
    { timestamp: now, rating }
  ];

  if (rating === Rating.Again) {
    // Forgot the card
    repetition = 0;
    interval = 1; // 1 day
    // Ease decreases slightly but not below 1.3
    ease = Math.max(1.3, ease - 0.2);
  } else {
    // Remembered
    if (rating === Rating.Hard) {
      ease = Math.max(1.3, ease - 0.15);
      interval = interval * 1.2;
    } else if (rating === Rating.Good) {
      interval = repetition === 0 ? 1 : interval * ease;
    } else if (rating === Rating.Easy) {
      ease += 0.15;
      interval = repetition === 0 ? 4 : interval * ease * 1.3;
    }
    
    repetition += 1;
  }

  // Round interval to 1 decimal place to avoid floating point mess, but keep logic simple
  interval = Math.max(1, Math.round(interval * 10) / 10);

  return {
    ...card,
    interval,
    ease,
    repetition,
    dueDate: now + (interval * ONE_DAY_MS),
    state: rating === Rating.Again ? 'relearning' : 'review',
    reviewHistory: updatedHistory
  };
};

export const getDueCards = (deckCards: Card[]): Card[] => {
  const now = Date.now();
  return deckCards.filter(card => card.dueDate <= now);
};

export const getDeckStats = (deckCards: Card[]) => {
    const total = deckCards.length;
    const newCards = deckCards.filter(c => c.repetition === 0).length;
    const due = getDueCards(deckCards).length;
    const learned = total - newCards;
    return { total, newCards, due, learned };
};
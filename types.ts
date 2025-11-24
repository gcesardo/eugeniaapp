export interface ReviewLog {
  timestamp: number;
  rating: Rating;
}

export interface Card {
  id: string;
  front: string;
  back: string;
  dueDate: number; // Timestamp
  interval: number; // Days
  ease: number; // Multiplier (e.g., 2.5)
  repetition: number;
  state: 'new' | 'learning' | 'review' | 'relearning';
  reviewHistory: ReviewLog[];
}

export interface Deck {
  id: string;
  name: string;
  description?: string;
  cards: Card[];
  createdAt: number;
}

export interface WeeklyReport {
  id: string;
  generatedAt: number;
  periodStart: number;
  periodEnd: number;
  content: string; // Markdown/Text content from AI
  summary: {
    totalReviews: number;
    averageAccuracy: number; // 0-100% based on ratings
  };
}

export enum Rating {
  Again = 1, // Reset
  Hard = 2,  // 1.2x interval
  Good = 3,  // 2.5x interval (standard)
  Easy = 4   // 3.5x+ interval
}

export type ViewState = 'dashboard' | 'study' | 'stats' | 'reports';
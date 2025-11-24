import React, { useState, useEffect, useCallback } from 'react';
import { Card, Rating, Deck } from '../types';
import { calculateReview, getDueCards } from '../services/srsService';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface StudySessionProps {
  deck: Deck;
  onUpdateDeck: (updatedDeck: Deck) => void;
  onBack: () => void;
}

const StudySession: React.FC<StudySessionProps> = ({ deck, onUpdateDeck, onBack }) => {
  // Queue state
  const [sessionQueue, setSessionQueue] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  // Initialize session
  useEffect(() => {
    const due = getDueCards(deck.cards);
    setSessionQueue(due);
  }, [deck.cards]);

  const currentCard = sessionQueue[currentCardIndex];

  const handleFlip = () => {
    setIsFlipped(true);
  };

  const handleRate = useCallback((rating: Rating) => {
    if (!currentCard) return;

    // Calculate new state for current card
    const updatedCard = calculateReview(currentCard, rating);

    // Update the deck in persistence
    const updatedCards = deck.cards.map(c => c.id === updatedCard.id ? updatedCard : c);
    const newDeck = { ...deck, cards: updatedCards };
    
    let nextQueue = [...sessionQueue];
    
    if (rating === Rating.Again) {
        // Repeat card in this session
        nextQueue.push({ ...updatedCard, id: updatedCard.id + '_session_repeat' });
    }

    onUpdateDeck(newDeck);
    
    // Move to next
    if (currentCardIndex < nextQueue.length - 1) {
        setSessionQueue(nextQueue);
        setCurrentCardIndex(prev => prev + 1);
        setIsFlipped(false);
    } else {
        setSessionComplete(true);
    }
  }, [currentCard, currentCardIndex, deck, onUpdateDeck, sessionQueue]);

  // Keyboard shortcuts (Desktop)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (sessionComplete || !currentCard) return;
        
        if (e.code === 'Space') {
            e.preventDefault();
            if (!isFlipped) handleFlip();
        } else if (isFlipped) {
            if (e.key === '1') handleRate(Rating.Again);
            if (e.key === '2') handleRate(Rating.Hard);
            if (e.key === '3') handleRate(Rating.Good);
            if (e.key === '4') handleRate(Rating.Easy);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, sessionComplete, currentCard, handleRate]);


  if (sessionQueue.length === 0 && !sessionComplete) {
     return (
        <div className="flex-grow flex items-center justify-center bg-gray-50 p-4">
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm max-w-md w-full">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Tudo em dia!</h2>
                <p className="text-gray-600 mb-6">Não há cartões para revisar neste baralho agora.</p>
                <button onClick={onBack} className="w-full bg-red-700 text-white px-6 py-3 rounded-xl hover:bg-red-800 font-medium active:scale-95 transition-transform">
                    Voltar ao Início
                </button>
            </div>
        </div>
     );
  }

  if (sessionComplete) {
    return (
        <div className="flex-grow flex items-center justify-center bg-gray-50 p-4">
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm max-w-md w-full">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Sessão Concluída! 🎉</h2>
                <p className="text-gray-600 mb-6">Você revisou {sessionQueue.length} cartões.</p>
                <button onClick={onBack} className="w-full bg-red-700 text-white px-6 py-3 rounded-xl hover:bg-red-800 font-medium active:scale-95 transition-transform">
                    Voltar ao Início
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col bg-gray-100 h-full">
      {/* Session Header */}
      <div className="bg-white shadow-sm p-3 flex justify-between items-center px-4 md:px-6 z-10">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-800 flex items-center gap-1 p-1">
            <ArrowLeft size={20} /> <span className="hidden sm:inline">Sair</span>
        </button>
        <div className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            {currentCardIndex + 1} <span className="text-gray-400">/</span> {sessionQueue.length}
        </div>
        <div className="w-8"></div> {/* Spacer */}
      </div>

      {/* Card Area */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 md:p-6 w-full max-w-3xl mx-auto">
        
        <div 
            className="w-full bg-white rounded-2xl shadow-xl flex-grow flex flex-col relative overflow-hidden cursor-pointer border border-gray-100 min-h-[50vh] md:min-h-[400px] max-h-[65vh] md:max-h-[600px]"
            onClick={!isFlipped ? handleFlip : undefined}
        >
            {/* Front */}
            <div className={`absolute inset-0 flex flex-col p-6 md:p-10 transition-opacity duration-300 ${isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100 z-10'}`}>
                <div className="flex-grow flex items-center justify-center overflow-y-auto">
                    <h2 className="text-xl md:text-3xl font-medium text-gray-800 leading-relaxed text-center">
                        {currentCard.front}
                    </h2>
                </div>
                <p className="text-center text-xs text-gray-400 uppercase tracking-widest mt-4">Frente</p>
            </div>

            {/* Back (Revealed) */}
            <div className={`absolute inset-0 flex flex-col p-6 md:p-10 bg-red-50 transition-opacity duration-300 ${!isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100 z-20'}`}>
                <div className="flex-grow flex items-center justify-center overflow-y-auto w-full">
                    <div className="text-base md:text-xl text-gray-900 leading-relaxed whitespace-pre-wrap text-left md:text-center w-full">
                        {currentCard.back}
                    </div>
                </div>
                <p className="text-center text-xs text-red-300 uppercase tracking-widest mt-4 flex-shrink-0">Verso</p>
            </div>
        </div>

        {/* Controls - Mobile Optimized */}
        <div className="mt-4 md:mt-8 w-full">
            {!isFlipped ? (
                <button 
                    onClick={handleFlip}
                    className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-4 rounded-xl shadow-lg transition-all transform active:scale-98 text-lg"
                >
                    Mostrar Resposta
                </button>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button 
                        onClick={() => handleRate(Rating.Again)}
                        className="flex flex-col items-center justify-center py-3 md:py-4 bg-white border border-red-100 text-red-700 rounded-xl shadow-sm hover:bg-red-50 active:scale-95 transition-all"
                    >
                        <span className="font-bold text-sm md:text-base">Errei</span>
                        <span className="text-[10px] md:text-xs opacity-70 mt-1">&lt; 1 min</span>
                    </button>
                    
                    <button 
                        onClick={() => handleRate(Rating.Hard)}
                        className="flex flex-col items-center justify-center py-3 md:py-4 bg-white border border-orange-100 text-orange-700 rounded-xl shadow-sm hover:bg-orange-50 active:scale-95 transition-all"
                    >
                        <span className="font-bold text-sm md:text-base">Difícil</span>
                        <span className="text-[10px] md:text-xs opacity-70 mt-1">~2 dias</span>
                    </button>

                    <button 
                        onClick={() => handleRate(Rating.Good)}
                        className="flex flex-col items-center justify-center py-3 md:py-4 bg-white border border-green-100 text-green-700 rounded-xl shadow-sm hover:bg-green-50 active:scale-95 transition-all"
                    >
                        <span className="font-bold text-sm md:text-base">Bom</span>
                        <span className="text-[10px] md:text-xs opacity-70 mt-1">~4 dias</span>
                    </button>

                    <button 
                        onClick={() => handleRate(Rating.Easy)}
                        className="flex flex-col items-center justify-center py-3 md:py-4 bg-white border border-blue-100 text-blue-700 rounded-xl shadow-sm hover:bg-blue-50 active:scale-95 transition-all"
                    >
                        <span className="font-bold text-sm md:text-base">Fácil</span>
                        <span className="text-[10px] md:text-xs opacity-70 mt-1">~7 dias</span>
                    </button>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default StudySession;
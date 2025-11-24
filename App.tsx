import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import StudySession from './components/StudySession';
import Stats from './components/Stats';
import ReportView from './components/ReportView';
import { Deck, ViewState, WeeklyReport } from './types';
import { loadDecks, saveDecks, loadReports, saveReports } from './services/storageService';
import { generateWeeklyReport } from './services/geminiService';
import { Loader2 } from 'lucide-react';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

const App: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [reports, setReports] = useState<WeeklyReport[]>([]);
  const [view, setView] = useState<ViewState>('dashboard');
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadedDecks = loadDecks();
    const loadedReports = loadReports();
    setDecks(loadedDecks);
    setReports(loadedReports);
  }, []);

  // Persist Deck changes
  useEffect(() => {
    if (decks.length > 0) saveDecks(decks);
  }, [decks]);

  // Persist Report changes
  useEffect(() => {
    if (reports.length > 0) saveReports(reports);
  }, [reports]);

  // Weekly Report Check Logic
  useEffect(() => {
    const checkWeeklyReport = async () => {
        if (decks.length === 0) return;

        // Find date of last report
        const lastReportTime = reports.length > 0 
            ? Math.max(...reports.map(r => r.generatedAt)) 
            : 0;
        
        const now = Date.now();
        // If > 7 days passed OR (no reports and user has done reviews)
        // Check if there is actual activity to report on
        const hasActivity = decks.some(d => d.cards.some(c => c.reviewHistory && c.reviewHistory.length > 0));

        if (hasActivity && (now - lastReportTime > SEVEN_DAYS_MS)) {
            setIsGeneratingReport(true);
            try {
                const newReport = await generateWeeklyReport(decks, lastReportTime);
                if (newReport) {
                    setReports(prev => [newReport, ...prev]);
                    // Optional: auto-navigate to report to show the user
                    // setView('reports'); 
                }
            } catch (e) {
                console.error("Auto report generation failed", e);
            } finally {
                setIsGeneratingReport(false);
            }
        }
    };

    const timer = setTimeout(checkWeeklyReport, 2000); // Small delay to ensure data loaded
    return () => clearTimeout(timer);
  }, [decks, reports]); // Dependencies: if decks change (new reviews) or reports change, re-eval

  const handleSelectDeck = (id: string) => {
    setActiveDeckId(id);
    setView('study');
  };

  const handleUpdateDeck = (updatedDeck: Deck) => {
    setDecks(prev => prev.map(d => d.id === updatedDeck.id ? updatedDeck : d));
  };

  const activeDeck = activeDeckId ? decks.find(d => d.id === activeDeckId) : undefined;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
        {/* Simple Top Bar */}
        <div className="bg-white border-b border-gray-200 py-3 px-4 md:py-4 md:px-6 shadow-sm sticky top-0 z-50">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
                <div 
                    className="flex items-center gap-2 cursor-pointer group" 
                    onClick={() => setView('dashboard')}
                >
                    <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-red-700 to-black rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-md group-hover:scale-105 transition-transform">
                        E
                    </div>
                    <span className="font-bold text-lg md:text-xl tracking-tight text-gray-900 truncate">Eugênia <span className="text-red-700">PPMG</span></span>
                </div>
                {isGeneratingReport && (
                    <div className="flex items-center gap-1.5 text-red-700 text-xs md:text-sm font-medium bg-red-50 px-2 py-1 md:px-3 md:py-1.5 rounded-full animate-pulse border border-red-100 max-w-[120px] md:max-w-none truncate">
                        <Loader2 className="animate-spin flex-shrink-0" size={14} />
                        <span className="truncate">Gerando Relatório...</span>
                    </div>
                )}
            </div>
        </div>

        <div className="flex-grow">
            {view === 'dashboard' && (
                <Dashboard 
                    decks={decks}
                    onSelectDeck={handleSelectDeck}
                    onViewStats={() => setView('stats')}
                    onViewReports={() => setView('reports')}
                />
            )}

            {view === 'study' && activeDeck && (
                <StudySession 
                    deck={activeDeck}
                    onUpdateDeck={handleUpdateDeck}
                    onBack={() => setView('dashboard')}
                />
            )}

            {view === 'stats' && (
                <Stats 
                    decks={decks}
                    onBack={() => setView('dashboard')}
                />
            )}

            {view === 'reports' && (
                <ReportView 
                    reports={reports}
                    onBack={() => setView('dashboard')}
                />
            )}
        </div>
    </div>
  );
};

export default App;
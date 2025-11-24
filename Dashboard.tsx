import React from 'react';
import { Deck } from '../types';
import { getDeckStats } from '../services/srsService';
import { Play, BarChart2, BookOpen, BrainCircuit } from 'lucide-react';

interface DashboardProps {
  decks: Deck[];
  onSelectDeck: (id: string) => void;
  onViewStats: () => void;
  onViewReports: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  decks, 
  onSelectDeck, 
  onViewStats,
  onViewReports
}) => {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 gap-4">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Central de Estudos</h1>
            <p className="text-sm md:text-base text-gray-500 mt-1">Selecione um curso para começar a praticar</p>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full md:w-auto">
            <button 
                onClick={onViewStats}
                className="flex items-center justify-center gap-2 px-3 py-3 md:px-4 md:py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-700 transition-all shadow-sm font-medium text-xs md:text-sm active:scale-95"
            >
                <BarChart2 size={16} className="text-red-700" />
                <span>Estatísticas</span>
            </button>
            <button 
                onClick={onViewReports}
                className="flex items-center justify-center gap-2 px-3 py-3 md:px-4 md:py-2.5 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 text-red-900 transition-all shadow-sm font-medium text-xs md:text-sm active:scale-95"
            >
                <BrainCircuit size={16} className="text-red-700" />
                <span>Mentor IA</span>
            </button>
        </div>
      </div>

      {decks.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100 mx-4">
          <h3 className="text-xl font-semibold text-gray-900">Nenhum conteúdo disponível</h3>
          <p className="text-gray-500 mt-2">Aguarde a atualização dos materiais pelo gestor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {decks.map((deck) => {
            const stats = getDeckStats(deck.cards);
            return (
              <div key={deck.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-red-100 transition-all duration-300 p-5 md:p-6 flex flex-col h-full group">
                <div className="flex items-start gap-4 mb-3 md:mb-4">
                    <div className="bg-red-50 p-3 rounded-xl group-hover:bg-red-100 transition-colors flex-shrink-0">
                        <BookOpen size={20} className="text-red-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-bold text-gray-900 truncate mb-1" title={deck.name}>{deck.name}</h3>
                        <p className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-wider">Curso Oficial</p>
                    </div>
                </div>
                
                <p className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6 flex-grow line-clamp-3 leading-relaxed">
                    {deck.description || "Pratique seus conhecimentos com este baralho oficial."}
                </p>
                
                <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-600 mb-4 md:mb-6 bg-gray-50 p-2 md:p-3 rounded-xl border border-gray-100">
                    <div>
                        <div className="font-bold text-base md:text-lg text-blue-600 mb-0.5">{stats.newCards}</div>
                        <div className="text-[9px] md:text-[10px] uppercase font-semibold text-gray-400">Novos</div>
                    </div>
                    <div className="border-l border-gray-200">
                        <div className="font-bold text-base md:text-lg text-green-600 mb-0.5">{stats.learned}</div>
                        <div className="text-[9px] md:text-[10px] uppercase font-semibold text-gray-400">Dominados</div>
                    </div>
                    <div className="border-l border-gray-200">
                        <div className="font-bold text-base md:text-lg text-red-600 mb-0.5">{stats.due}</div>
                        <div className="text-[9px] md:text-[10px] uppercase font-semibold text-gray-400">Revisar</div>
                    </div>
                </div>

                <button 
                  onClick={() => onSelectDeck(deck.id)}
                  disabled={stats.due === 0 && stats.newCards === 0}
                  className={`w-full flex items-center justify-center gap-2 py-3 md:py-3.5 rounded-xl font-bold text-sm transition-all transform active:scale-95 ${
                    (stats.due > 0 || stats.newCards > 0)
                        ? 'bg-red-700 text-white hover:bg-red-800 shadow-md md:shadow-lg shadow-red-200' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                    <Play size={18} fill={stats.due > 0 ? "currentColor" : "none"} />
                    {stats.due > 0 ? 'Iniciar Sessão' : 'Tudo em dia!'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
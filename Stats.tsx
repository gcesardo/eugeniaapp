import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Deck } from '../types';
import { ArrowLeft } from 'lucide-react';
import { getDueCards } from '../services/srsService';

interface StatsProps {
  decks: Deck[];
  onBack: () => void;
}

const Stats: React.FC<StatsProps> = ({ decks, onBack }) => {
  // Aggregate data for the chart
  const data = decks.map(deck => {
    const total = deck.cards.length;
    const due = getDueCards(deck.cards).length;
    const learned = deck.cards.filter(c => c.repetition > 0).length;
    return {
      name: deck.name.length > 10 ? deck.name.substring(0, 10) + '...' : deck.name,
      Total: total,
      'A Revisar': due,
      Aprendidos: learned
    };
  });

  const totalCards = decks.reduce((acc, d) => acc + d.cards.length, 0);
  const totalReviews = decks.reduce((acc, d) => acc + d.cards.reduce((cAcc, c) => cAcc + c.repetition, 0), 0);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 pb-20">
      <div className="flex items-center gap-4 mb-6 md:mb-8">
         <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Estatísticas</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-[10px] md:text-sm font-medium uppercase tracking-wider mb-2">Total de Cartões</h3>
            <p className="text-2xl md:text-4xl font-bold text-red-700">{totalCards}</p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-[10px] md:text-sm font-medium uppercase tracking-wider mb-2">Total de Repetições</h3>
            <p className="text-2xl md:text-4xl font-bold text-green-600">{totalReviews}</p>
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 h-[300px] md:h-[400px]">
        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 md:mb-6">Visão Geral dos Baralhos</h3>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#9CA3AF" fontSize={10} tickLine={false} axisLine={false} width={30} />
            <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                cursor={{fill: '#F3F4F6'}}
            />
            <Bar dataKey="Total" fill="#374151" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Aprendidos" fill="#10B981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="A Revisar" fill="#DC2626" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Stats;
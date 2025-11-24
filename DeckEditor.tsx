import React, { useState } from 'react';
import { Deck, Card } from '../types';
import { createNewCard } from '../services/srsService';
import { generateCardsFromTopic } from '../services/geminiService';
import { ArrowLeft, Plus, Sparkles, Trash2, Save, Loader2 } from 'lucide-react';

interface DeckEditorProps {
  deck?: Deck; // If undefined, creating new
  onSave: (deck: Deck) => void;
  onCancel: () => void;
}

const DeckEditor: React.FC<DeckEditorProps> = ({ deck, onSave, onCancel }) => {
  const [name, setName] = useState(deck?.name || '');
  const [description, setDescription] = useState(deck?.description || '');
  const [cards, setCards] = useState<Card[]>(deck?.cards || []);
  
  // AI State
  const [aiTopic, setAiTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Manual Card Input State
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');

  const handleAddManualCard = () => {
    if (!newFront.trim() || !newBack.trim()) return;
    const card = createNewCard(newFront, newBack);
    setCards([...cards, card]);
    setNewFront('');
    setNewBack('');
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter(c => c.id !== id));
  };

  const handleSaveDeck = () => {
    if (!name.trim()) return;
    
    const newDeck: Deck = {
      id: deck?.id || crypto.randomUUID(),
      name,
      description,
      cards,
      createdAt: deck?.createdAt || Date.now()
    };
    onSave(newDeck);
  };

  const handleGenerateAI = async () => {
    if (!aiTopic.trim()) return;
    setIsGenerating(true);
    setAiError(null);
    try {
      const generated = await generateCardsFromTopic(aiTopic, 5);
      const newCards = generated.map(g => createNewCard(g.front, g.back));
      setCards(prev => [...prev, ...newCards]);
      setAiTopic('');
    } catch (e) {
      setAiError("Falha ao gerar cartões. Verifique sua chave API ou tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <div className="flex items-center gap-4 mb-8 border-b pb-4">
        <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{deck ? 'Editar Baralho' : 'Novo Baralho'}</h1>
      </div>

      <div className="grid gap-6 mb-10">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Baralho</label>
            <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Ex: Espanhol Básico"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição (Opcional)</label>
            <input 
                type="text" 
                value={description} 
                onChange={e => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Vocabulário essencial para viagem"
            />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column: Card Creation */}
        <div className="space-y-8">
            {/* AI Generator */}
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                <div className="flex items-center gap-2 mb-4 text-indigo-900 font-semibold">
                    <Sparkles size={20} />
                    <h3>Gerador Mágico IA</h3>
                </div>
                <p className="text-sm text-indigo-700 mb-3">Digite um tópico e a IA criará flashcards automaticamente para você.</p>
                <div className="flex gap-2">
                    <input 
                        type="text"
                        value={aiTopic}
                        onChange={e => setAiTopic(e.target.value)}
                        placeholder="Ex: Revolução Francesa, Verbos em Inglês..."
                        className="flex-grow p-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                        disabled={isGenerating}
                    />
                    <button 
                        onClick={handleGenerateAI}
                        disabled={isGenerating || !aiTopic}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center min-w-[100px]"
                    >
                        {isGenerating ? <Loader2 className="animate-spin" size={20} /> : 'Gerar'}
                    </button>
                </div>
                {aiError && <p className="text-red-500 text-xs mt-2">{aiError}</p>}
            </div>

            {/* Manual Entry */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Adicionar Manualmente</h3>
                <div className="space-y-3">
                    <input 
                        className="w-full p-3 border rounded-lg text-sm" 
                        placeholder="Frente (Pergunta)"
                        value={newFront}
                        onChange={e => setNewFront(e.target.value)}
                    />
                    <textarea 
                        className="w-full p-3 border rounded-lg text-sm h-24 resize-none" 
                        placeholder="Verso (Resposta)"
                        value={newBack}
                        onChange={e => setNewBack(e.target.value)}
                    />
                    <button 
                        onClick={handleAddManualCard}
                        disabled={!newFront || !newBack}
                        className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        <Plus size={16} /> Adicionar Cartão
                    </button>
                </div>
            </div>
        </div>

        {/* Right Column: Card List */}
        <div className="border border-gray-200 rounded-xl overflow-hidden flex flex-col h-[600px]">
            <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold text-gray-700">Cartões ({cards.length})</h3>
            </div>
            <div className="overflow-y-auto flex-grow p-4 space-y-3 bg-white">
                {cards.length === 0 ? (
                    <div className="text-center text-gray-400 py-10 text-sm">
                        Nenhum cartão adicionado ainda.
                    </div>
                ) : (
                    cards.map((card, idx) => (
                        <div key={card.id} className="group flex gap-3 p-3 border rounded-lg hover:border-indigo-300 transition-colors relative">
                            <div className="flex-grow">
                                <div className="font-medium text-sm text-gray-900 mb-1">{card.front}</div>
                                <div className="text-xs text-gray-500 line-clamp-2">{card.back}</div>
                            </div>
                            <button 
                                onClick={() => handleDeleteCard(card.id)}
                                className="opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-50 p-2 rounded transition-all self-start"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8 pt-4 border-t">
        <button onClick={onCancel} className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">Cancelar</button>
        <button 
            onClick={handleSaveDeck}
            disabled={!name}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 flex items-center gap-2 font-medium disabled:opacity-50"
        >
            <Save size={20} /> Salvar Baralho
        </button>
      </div>
    </div>
  );
};

export default DeckEditor;

import { GoogleGenAI, Type } from "@google/genai";
import { Deck, WeeklyReport, Rating } from "../types";

// NOTE: Using environment variable as requested.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCardsFromTopic = async (topic: string, count: number = 5) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create ${count} flashcards for studying: "${topic}". 
      The content should be educational, accurate, and in Portuguese.
      The front should be a question or concept, the back should be the answer or definition.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              front: { type: Type.STRING },
              back: { type: Type.STRING },
            },
            required: ["front", "back"],
          },
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as { front: string; back: string }[];
    }
    throw new Error("No text returned from API");
  } catch (error) {
    console.error("Gemini generation error:", error);
    throw error;
  }
};

export const generateWeeklyReport = async (decks: Deck[], lastReportDate: number): Promise<WeeklyReport | null> => {
    const now = Date.now();
    const rangeStart = lastReportDate > 0 ? lastReportDate : now - (7 * 24 * 60 * 60 * 1000);
    
    // 1. Gather Data
    let totalReviews = 0;
    let totalScore = 0;
    const activityLog: string[] = [];
    const problemAreas: string[] = [];

    decks.forEach(deck => {
        deck.cards.forEach(card => {
            if (!card.reviewHistory) return;
            
            const recentReviews = card.reviewHistory.filter(r => r.timestamp > rangeStart);
            if (recentReviews.length > 0) {
                // Calculate average for this card in this period
                const avgRating = recentReviews.reduce((acc, r) => acc + r.rating, 0) / recentReviews.length;
                totalReviews += recentReviews.length;
                totalScore += recentReviews.reduce((acc, r) => acc + r.rating, 0);

                activityLog.push(`- Deck: "${deck.name}" | Card: "${card.front}" | Avg Rating: ${avgRating.toFixed(1)}`);
                
                if (avgRating <= 2.5) {
                    problemAreas.push(`"${deck.name}": ${card.front}`);
                }
            }
        });
    });

    if (totalReviews === 0) return null; // No activity, no report

    const averageAccuracy = (totalScore / (totalReviews * 4)) * 100; // Normalized to 100%

    // 2. Prompt Gemini
    const prompt = `
        Você é o "Mentor EugênIA", um assistente de estudo pessoal. 
        Analise os dados de estudo do usuário dos últimos 7 dias e crie um relatório de progresso motivador e útil em Português.

        Dados Brutos:
        ${activityLog.join('\n')}

        Instruções:
        1. Comece com uma frase amigável sobre o esforço da semana.
        2. "O que você dominou": Liste os temas/decks onde as notas foram altas (3 ou 4). Elogie especificamente.
        3. "Pontos de Atenção": Analise os cartões com notas baixas (1 ou 2). Sugira reforço nesses temas específicos.
        4. "Dica da Semana": Dê uma dica prática de estudo baseada nos erros encontrados (ex: se errou vocabulário, sugira criar frases; se errou conceitos, sugira mapas mentais).
        5. Termine com uma frase encorajadora.

        Use formatação clara (parágrafos, bullet points). Não use JSON na resposta, apenas texto formatado para leitura humana.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const reportContent = response.text || "Não foi possível gerar o texto do relatório.";

        return {
            id: crypto.randomUUID(),
            generatedAt: now,
            periodStart: rangeStart,
            periodEnd: now,
            content: reportContent,
            summary: {
                totalReviews,
                averageAccuracy
            }
        };

    } catch (error) {
        console.error("Report generation failed", error);
        return null;
    }
};
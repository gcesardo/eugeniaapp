import React from 'react';
import { WeeklyReport } from '../types';
import { ArrowLeft, Calendar } from 'lucide-react';

interface ReportViewProps {
  reports: WeeklyReport[];
  onBack: () => void;
}

const ReportView: React.FC<ReportViewProps> = ({ reports, onBack }) => {
  // Sort reports new to old
  const sortedReports = [...reports].sort((a, b) => b.generatedAt - a.generatedAt);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 pb-20 bg-gray-50">
      <div className="flex items-center gap-4 mb-6 md:mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">Relatórios do Mentor</h1>
      </div>

      {sortedReports.length === 0 ? (
        <div className="text-center py-12 md:py-20 bg-white rounded-2xl shadow-sm border border-gray-100 mx-2">
          <div className="bg-red-50 p-4 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-4 md:mb-6">
             <Calendar className="text-red-700" size={32} />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900">Nenhum relatório ainda</h3>
          <p className="text-sm md:text-base text-gray-500 mt-2 max-w-xs md:max-w-md mx-auto px-4">
            O Mentor Eugênia PPMG gera um relatório detalhado a cada 7 dias de estudo. Continue praticando!
          </p>
        </div>
      ) : (
        <div className="space-y-6 md:space-y-8">
          {sortedReports.map((report, index) => (
            <div key={report.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-900 to-red-900 p-4 md:p-6 text-white">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                        <div className="flex items-center gap-2 text-gray-100 text-xs md:text-sm font-medium uppercase tracking-wide">
                            <Calendar size={14} />
                            Semana {new Date(report.periodStart).toLocaleDateString()} - {new Date(report.periodEnd).toLocaleDateString()}
                        </div>
                        {index === 0 && (
                            <span className="bg-white/20 px-2 py-1 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold backdrop-blur-sm text-white self-start">
                                Mais Recente
                            </span>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mt-2">
                         <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                            <div className="text-[10px] md:text-xs text-red-200 uppercase mb-1">Revisões Feitas</div>
                            <div className="text-xl md:text-2xl font-bold">{report.summary.totalReviews}</div>
                         </div>
                         <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                            <div className="text-[10px] md:text-xs text-red-200 uppercase mb-1">Precisão Média</div>
                            <div className="text-xl md:text-2xl font-bold">{report.summary.averageAccuracy.toFixed(0)}%</div>
                         </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 md:p-8">
                     <div className="prose prose-sm md:prose-base prose-red max-w-none text-gray-800 whitespace-pre-wrap leading-relaxed">
                        {report.content}
                     </div>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportView;
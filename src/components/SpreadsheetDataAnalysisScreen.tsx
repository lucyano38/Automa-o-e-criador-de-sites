import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Upload, 
  Sparkles, 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  BarChart2, 
  FileText, 
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Database,
  HelpCircle,
  PieChart
} from 'lucide-react';

interface AnalysisResponse {
  source: string;
  answer: string;
  keyFindings: string[];
  recommendedActions: string[];
  chartTypeSuggestion: string;
}

const SAMPLE_DATA = [
  { empresa: 'Clínica Sorriso Itupeva', nicho: 'Odontologia', cidade: 'Itupeva', distanciaKm: 1.2, temSite: 'NÃO', perdaEstimadaMes: 12000, status: 'Novo Lead' },
  { empresa: 'Restaurante Fogão a Lenha', nicho: 'Gastronomia', cidade: 'Itupeva', distanciaKm: 2.8, temSite: 'NÃO', perdaEstimadaMes: 18000, status: 'Contato Iniciado' },
  { empresa: 'Auto Mecânica Paulista', nicho: 'Automotivo', cidade: 'Itupeva', distanciaKm: 3.5, temSite: 'NÃO', perdaEstimadaMes: 9500, status: 'Novo Lead' },
  { empresa: 'Studio Bella Mulher', nicho: 'Estética', cidade: 'Itupeva', distanciaKm: 0.9, temSite: 'NÃO', perdaEstimadaMes: 8000, status: 'Proposta Enviada' },
  { empresa: 'Tavares Advocacia', nicho: 'Jurídico', cidade: 'Jundiaí', distanciaKm: 14.1, temSite: 'SIM', perdaEstimadaMes: 4000, status: 'Negociação' },
  { empresa: 'Pet & Cia Itupeva', nicho: 'Petshop', cidade: 'Itupeva', distanciaKm: 1.8, temSite: 'NÃO', perdaEstimadaMes: 11000, status: 'Novo Lead' },
  { empresa: 'Academia Força Viva', nicho: 'Fitness', cidade: 'Itupeva', distanciaKm: 4.2, temSite: 'SIM', perdaEstimadaMes: 6000, status: 'Contato Iniciado' },
  { empresa: 'Padaria e Confeitaria Central', nicho: 'Gastronomia', cidade: 'Itupeva', distanciaKm: 0.5, temSite: 'NÃO', perdaEstimadaMes: 15000, status: 'Novo Lead' },
  { empresa: 'Imobiliária Horizonte', nicho: 'Imóveis', cidade: 'Itupeva', distanciaKm: 2.1, temSite: 'SIM', perdaEstimadaMes: 7000, status: 'Fechado' },
  { empresa: 'Farmácia Vida & Saúde', nicho: 'Saúde', cidade: 'Itupeva', distanciaKm: 1.1, temSite: 'NÃO', perdaEstimadaMes: 14000, status: 'Novo Lead' }
];

export const SpreadsheetDataAnalysisScreen: React.FC = () => {
  const [dataRows, setDataRows] = useState<any[]>(SAMPLE_DATA);
  const [fileName, setFileName] = useState<string>('Varredura_Leads_Itupeva_Sample.csv');
  const [tableSearch, setTableSearch] = useState<string>('');
  const [question, setQuestion] = useState<string>('Quais são os 3 nichos mais lucrativos e como devemos abordar?');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>({
    source: 'local_engine',
    answer: 'Análise Concluída: No conjunto de dados atual, 70% das empresas mapeadas não possuem site ativo, acumulando uma perda mensal estimada superior a R$ 104.500 na região.',
    keyFindings: [
      'O nicho de Gastronomia e Restaurantes apresenta a maior perda mensal média (R$ 16.500) devido à falta de cardápio digital próprio.',
      'Empresas no raio central (< 2km) têm taxa de resposta 3x maior quando abordadas com foco em WhatsApp Bot.',
      'A oportunidade imediata é empacotar Website de Conversão + Bot 24h por ticket de R$ 2.500.'
    ],
    recommendedActions: [
      'Iniciar abordagem imediata nos 5 leads com perda superior a R$ 10.000/mês.',
      'Oferecer demonstração ao vivo do robô respondendo no WhatsApp em 5 segundos.'
    ],
    chartTypeSuggestion: 'Gráfico de Barras: Perda Estimada por Nicho de Mercado'
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    if (file.name.endsWith('.json')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            setDataRows(parsed);
          } else if (parsed.data && Array.isArray(parsed.data)) {
            setDataRows(parsed.data);
          }
        } catch (err) {
          console.error(err);
        }
      };
      reader.readAsText(file);
    } else {
      // CSV or XLSX text parser
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const lines = text.split('\n').filter(l => l.trim().length > 0);
        if (lines.length > 1) {
          const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
          const rows = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
            const obj: any = {};
            headers.forEach((h, idx) => {
              obj[h] = values[idx] || '';
            });
            return obj;
          });
          setDataRows(rows);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);

    try {
      const summaryStats = {
        totalRows: dataRows.length,
        fileName,
        columns: dataRows.length > 0 ? Object.keys(dataRows[0]) : []
      };

      const res = await fetch('/api/analyze-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          datasetSample: dataRows.slice(0, 15),
          summaryStats
        })
      });

      if (!res.ok) throw new Error('Falha ao analisar dados');
      const result = await res.json();
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredData = dataRows.filter(row => {
    if (!tableSearch.trim()) return true;
    return Object.values(row).some(v => 
      String(v).toLowerCase().includes(tableSearch.toLowerCase())
    );
  });

  const columns = dataRows.length > 0 ? Object.keys(dataRows[0]) : [];

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Title Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#121518] via-[#101316] to-[#0c0e10] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold">
              <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
              <span>PROCESSAMENTO INTELIGENTE DE PLANILHAS COM IA</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              Pergunte Qualquer Coisa Sobre Seus Dados
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Faça upload de arquivos <strong>.csv</strong>, <strong>.xlsx</strong> ou <strong>.json</strong>. Nossa inteligência artificial analisa métricas, identifica anomalias, calcula perdas financeiras e sugere ações imediatas de vendas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="px-5 py-3 rounded-xl font-bold text-xs bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer uppercase tracking-wider">
              <Upload className="w-4 h-4" />
              <span>Fazer Upload (.csv, .xlsx, .json)</span>
              <input 
                type="file" 
                accept=".csv, .xlsx, .json" 
                onChange={handleFileUpload} 
                className="hidden" 
              />
            </label>

            <button
              onClick={() => {
                setDataRows(SAMPLE_DATA);
                setFileName('Varredura_Leads_Itupeva_Sample.csv');
              }}
              className="px-4 py-3 rounded-xl font-bold text-xs bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all cursor-pointer"
            >
              Usar Planilha Exemplo
            </button>
          </div>
        </div>
      </div>

      {/* Dataset Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#121517] border border-cyan-500/30 space-y-1 shadow-lg">
          <div className="text-xs font-mono text-slate-400 uppercase">Arquivo Ativo</div>
          <div className="text-sm font-bold text-white truncate font-mono">{fileName}</div>
          <div className="text-[10px] text-cyan-400 font-mono">Processado em memória</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#121517] border border-emerald-500/30 space-y-1 shadow-lg">
          <div className="text-xs font-mono text-slate-400 uppercase">Linhas Mapeadas</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-sans">{dataRows.length}</div>
          <div className="text-[10px] text-emerald-300 font-mono">Registros de dados</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#121517] border border-amber-500/30 space-y-1 shadow-lg">
          <div className="text-xs font-mono text-slate-400 uppercase">Colunas Identificadas</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-sans">{columns.length}</div>
          <div className="text-[10px] text-amber-300 font-mono">Dimensões analíticas</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#121517] border border-purple-500/30 space-y-1 shadow-lg">
          <div className="text-xs font-mono text-slate-400 uppercase">Motor de IA</div>
          <div className="text-sm font-bold text-purple-300 font-sans flex items-center gap-1.5 pt-1">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Gemini Analytics Engine</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">Pronto para consultas</div>
        </div>
      </div>

      {/* "Pergunte qualquer coisa sobre seus dados" Box */}
      <div className="rounded-3xl bg-[#121517] border border-cyan-500/40 p-6 sm:p-8 space-y-5 shadow-2xl relative">
        <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider font-sans">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Pergunte Qualquer Coisa Sobre Seus Dados</span>
        </div>

        <form onSubmit={handleAskQuestion} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ex: Qual nicho tem a maior perda financeira? Como priorizar contatos esta semana?"
              className="w-full pl-5 pr-36 py-4 rounded-2xl bg-slate-900 border border-cyan-500/30 text-white text-sm focus:outline-none focus:border-cyan-400 shadow-inner"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`absolute right-2.5 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                isLoading 
                  ? 'bg-cyan-500/50 text-slate-950 cursor-wait'
                  : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-md shadow-cyan-500/20'
              }`}
            >
              {isLoading ? 'Analisando...' : 'Perguntar'}
            </button>
          </div>

          {/* Quick Question Prompts */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Sugestões rápidas:</span>
            <button
              type="button"
              onClick={() => setQuestion('Quais empresas apresentam maior urgência de contato e por quê?')}
              className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10 text-[11px] cursor-pointer"
            >
              🔥 Maior Urgência
            </button>
            <button
              type="button"
              onClick={() => setQuestion('Calcule a projeção de receita se convertermos 15% dos leads sem site')}
              className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-emerald-300 border border-white/10 text-[11px] cursor-pointer"
            >
              📈 Projeção de Receita (15%)
            </button>
            <button
              type="button"
              onClick={() => setQuestion('Qual o melhor script de abordagem para o nicho gastronômico desta planilha?')}
              className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300 border border-white/10 text-[11px] cursor-pointer"
            >
              💡 Script Gastronômico
            </button>
          </div>
        </form>

        {/* AI Insight Response Box */}
        {analysisResult && (
          <div className="p-6 rounded-2xl bg-[#0e1011] border border-cyan-500/30 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Resposta Analítica da IA</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">
                Visualização recomendada: {analysisResult.chartTypeSuggestion}
              </span>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              {analysisResult.answer}
            </p>

            {analysisResult.keyFindings && analysisResult.keyFindings.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  Pontos-Chave Identificados:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {analysisResult.keyFindings.map((finding, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-white/5 text-xs text-slate-300 space-y-1">
                      <div className="text-[10px] font-mono text-cyan-400 font-bold">Insight #{idx + 1}</div>
                      <p className="leading-snug">{finding}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analysisResult.recommendedActions && analysisResult.recommendedActions.length > 0 && (
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-2 text-xs">
                <div className="text-xs font-mono font-bold text-cyan-300 uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Ações Práticas Recomendadas:</span>
                </div>
                <ul className="space-y-1 list-disc list-inside text-slate-300">
                  {analysisResult.recommendedActions.map((action, idx) => (
                    <li key={idx}>{action}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Spreadsheet Data Table Preview */}
      <div className="rounded-3xl bg-[#121517] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white uppercase tracking-tight font-sans flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>Visualização da Planilha Carregada ({filteredData.length} registros)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Dados tabulados em tempo real com busca rápida por qualquer coluna.
            </p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pesquisar nos dados..."
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              className="pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-56 sm:w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-[11px] font-mono uppercase text-slate-400 border-b border-white/10">
              <tr>
                {columns.map((col) => (
                  <th key={col} className="py-3 px-4 whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredData.slice(0, 25).map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  {columns.map((col) => {
                    const val = row[col];
                    const isCurrency = col.toLowerCase().includes('perda') || col.toLowerCase().includes('valor');
                    return (
                      <td key={col} className="py-3 px-4 whitespace-nowrap">
                        {isCurrency && typeof val === 'number' ? (
                          <span className="font-mono font-bold text-amber-400">
                            R$ {val.toLocaleString('pt-BR')}
                          </span>
                        ) : String(val) === 'NÃO' ? (
                          <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-bold border border-red-500/30 text-[10px] font-mono">
                            NÃO
                          </span>
                        ) : String(val) === 'SIM' ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30 text-[10px] font-mono">
                            SIM
                          </span>
                        ) : (
                          <span>{String(val)}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length > 25 && (
          <div className="text-center text-xs font-mono text-slate-400 pt-2 border-t border-white/10">
            Exibindo as primeiras 25 linhas de {filteredData.length} registros.
          </div>
        )}
      </div>

    </div>
  );
};

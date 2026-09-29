'use client';

import React, { useState } from 'react';

// Tipagem baseada no contrato esperado do algoritmo processado em Python (FastAPI)[cite: 5]
interface RecomendacaoFuzzy {
  viveiroId: string;
  fase: string;
  cicloDias: number;
  parametrosIn: {
    oxigenio: number;
    temperatura: number;
    sobrasBandejas: number;
  };
  decisaoOut: {
    acao: 'AUMENTAR' | 'MANTER' | 'REDUZIR';
    percentualAjuste: number;
    metaRacaoKg: number;
    justificativa: string;
  };
  tratoAtual: string;
  horaAgendada: string;
}

export default function DecisaoFuzzyPage() {
  const [carregando, setCarregando] = useState<boolean>(false);

  // Mock dos dados que serão recebidos do back-end
  const [dadosFuzzy] = useState<RecomendacaoFuzzy>({
    viveiroId: '02',
    fase: 'Camarão Vannamei',
    cicloDias: 65,
    parametrosIn: {
      oxigenio: 5.8,
      temperatura: 29.4,
      sobrasBandejas: 0.0
    },
    decisaoOut: {
      acao: 'AUMENTAR',
      percentualAjuste: 5.0,
      metaRacaoKg: 42.5,
      justificativa: 'Crescimento acelerado com consumo total das bandejas nas últimas 3 rodadas e biomassa em curva ascendente.'
    },
    tratoAtual: '3º Arraçoamento',
    horaAgendada: '14:30'
  });

  const confirmarTrato = () => {
    setCarregando(true);
    // Local onde será executado o POST/PATCH para a API REST confirmando a ação[cite: 5]
    setTimeout(() => {
      alert(`Trato de ${dadosFuzzy.decisaoOut.metaRacaoKg}kg confirmado com sucesso!`);
      setCarregando(false);
    }, 800);
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#0f172a] text-slate-200 font-sans pb-24">
      
      {/* CABEÇALHO */}
      <header className="flex justify-between items-center p-5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
          <span className="text-sm font-bold text-white">Manejo</span>
        </div>
        <div className="flex gap-4 text-slate-400">
          <span>🔔</span>
          <span>👤</span>
        </div>
      </header>

      <div className="p-4 flex flex-col gap-4">
        {/* CONTEXTO DO LOTE[cite: 14] */}
        <section className="bg-[#1e293b] rounded-2xl p-4 shadow-lg border border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-lg">📋</div>
            <div>
              <h1 className="text-sm font-bold text-white">Ronda &amp; Manejo</h1>
              <p className="text-[10px] text-slate-400">• Viveiro {dadosFuzzy.viveiroId} • {dadosFuzzy.fase}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">Ciclo</span>
            <p className="text-sm font-bold text-white">Dia {dadosFuzzy.cicloDias}</p>
          </div>
        </section>

        {/* PARÂMETROS DE ENTRADA (CRITÉRIOS DO ALGORITMO)[cite: 14] */}
        <section className="grid grid-cols-3 gap-2">
          <div className="bg-[#1e293b] border border-slate-800 rounded-xl p-3 text-center">
            <p className="text-[9px] text-slate-500 font-bold mb-1">O₂ Encontrado</p>
            <p className="text-sm font-black text-emerald-400">{dadosFuzzy.parametrosIn.oxigenio} mg/L</p>
          </div>
          <div className="bg-[#1e293b] border border-slate-800 rounded-xl p-3 text-center">
            <p className="text-[9px] text-slate-500 font-bold mb-1">Temp. Água</p>
            <p className="text-sm font-black text-white">{dadosFuzzy.parametrosIn.temperatura} °C</p>
          </div>
          <div className="bg-[#1e293b] border border-slate-800 rounded-xl p-3 text-center">
            <p className="text-[9px] text-slate-500 font-bold mb-1">Sobras Bandejas</p>
            <p className="text-sm font-black text-emerald-400">{dadosFuzzy.parametrosIn.sobrasBandejas.toFixed(1)}% (Limpas)</p>
          </div>
        </section>

        {/* PAINEL CENTRAL DE DECISÃO ZOOTÉCNICA[cite: 14] */}
        <section className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-3xl p-5 shadow-xl border border-slate-700/50 relative overflow-hidden">
          
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              🧠 Decisão Zootécnica <br/> (Fuzzy)
            </h2>
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
              ↑ AUMENTAR
            </span>
          </div>

          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-4xl font-black text-emerald-400">+{dadosFuzzy.decisaoOut.percentualAjuste.toFixed(1)}%</span>
              <p className="text-[10px] text-slate-400 mt-1 font-bold">AJUSTE (ΔR)</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-white">{dadosFuzzy.decisaoOut.metaRacaoKg.toFixed(1)}<span className="text-lg text-slate-500">kg</span></span>
              <p className="text-[10px] text-slate-400 mt-1 font-bold">META / ARRAÇOAMENTO</p>
            </div>
          </div>

          {/* Barra de Progresso Visual */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full mb-6 overflow-hidden">
            <div className="h-full bg-emerald-500 w-[85%] rounded-full"></div>
          </div>

          {/* Justificativa do Sistema[cite: 14] */}
          <div className="bg-[#0f172a]/80 p-4 rounded-xl border border-slate-700/50 flex items-start gap-3">
            <span className="text-emerald-500 mt-0.5">💬</span>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              &quot;{dadosFuzzy.decisaoOut.justificativa}&quot;
            </p>
          </div>
        </section>

        {/* ÁREA DE AÇÃO[cite: 14] */}
        <section className="bg-[#1e293b] rounded-2xl p-4 shadow-lg border border-slate-800 mt-2">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 border-2 border-emerald-500 rounded-full"></span>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Trato Atual</p>
                <h3 className="text-sm font-bold text-white">{dadosFuzzy.tratoAtual} ({dadosFuzzy.horaAgendada})</h3>
              </div>
            </div>
            <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-3 py-1.5 rounded-lg">
              Ronda em andamento
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={confirmarTrato}
              disabled={carregando}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg transition-colors flex justify-center items-center gap-2"
            >
              {carregando ? 'A processar...' : `✓ Confirmar Trato de ${dadosFuzzy.decisaoOut.metaRacaoKg.toFixed(1)}kg`}
            </button>
            
            <button className="w-full bg-transparent border border-slate-700 text-slate-300 font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-colors flex justify-center items-center gap-2">
              <span>⚙</span> Ajustar Manualmente
            </button>
          </div>
        </section>
      </div>

      {/* NAVEGAÇÃO INFERIOR SIMULADA[cite: 14] */}
      <nav className="fixed bottom-0 left-0 w-full bg-[#0f172a] border-t border-slate-800 flex justify-around p-3 pb-6 text-slate-500">
        <button className="flex flex-col items-center text-emerald-500">
          <span className="text-xl mb-1">📋</span>
          <span className="text-[10px] font-bold">Manejo</span>
        </button>
        <button className="flex flex-col items-center hover:text-slate-300 transition-colors">
          <span className="text-xl mb-1">🌊</span>
          <span className="text-[10px] font-bold">Viveiros</span>
        </button>
        <button className="flex flex-col items-center hover:text-slate-300 transition-colors">
          <span className="text-xl mb-1">✓</span>
          <span className="text-[10px] font-bold">Tarefas</span>
        </button>
      </nav>
    </main>
  );
}

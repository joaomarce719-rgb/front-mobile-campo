'use client';

import React, { useState } from 'react';

export default function MonitoramentoNoturnoPage() {
  // Estados para os parâmetros de qualidade da água
  const [od, setOd] = useState<number>(3.8);
  const [temp, setTemp] = useState<number>(28.5);

  // Estados para os botões de ação imediata
  const [aeradoresLigados, setAeradoresLigados] = useState<boolean>(true);
  const [mortalidade, setMortalidade] = useState<boolean>(false);

  // Simulação de submissão para a API RESTful[cite: 5]
  const salvarLeitura = () => {
    const payload = {
      viveiroId: '02',
      oxigenioDissolvido: od,
      temperatura: temp,
      aeradoresLigados,
      mortalidadeIdentificada: mortalidade,
      timestamp: new Date().toISOString()
    };
    console.log('A enviar para o Back-end (FastAPI):', payload);
    alert('Leitura da ronda noturna guardada com sucesso!');
  };

  return (
    <main className="flex flex-col min-h-screen bg-[#0f172a] text-slate-200 font-sans p-4 pb-24">
      {/* CABEÇALHO ESCURO */}
      <header className="mb-6 mt-2">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-500/20 text-indigo-400 p-1.5 rounded-lg text-sm">🌙</span>
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Aquasad • Visão Noturna</span>
              <h1 className="text-xl font-bold text-white leading-tight">Ronda Noturna</h1>
            </div>
          </div>
          <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[9px] font-bold px-2 py-1 rounded-full">
            Ronda: 22:00 - 04:00
          </span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
          <span className="text-[10px] text-slate-400">Modo Noturno Ativo • Sincronizado</span>
        </div>
      </header>

      {/* SELEÇÃO E INFORMAÇÃO DO VIVEIRO[cite: 13] */}
      <section className="bg-[#1e293b] rounded-2xl p-4 mb-4 shadow-lg border border-slate-700/50">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Viveiro em Monitoramento</span>
          <span className="text-[10px] text-blue-400 font-bold">LOTE #2024</span>
        </div>

        <select className="w-full bg-[#0f172a] border border-slate-700 text-white text-sm font-bold p-3 rounded-xl outline-none mb-4 appearance-none">
          <option>Viveiro 02 (Litopenaeus vannamei - 72 Dias)</option>
          <option>Viveiro 03 (Berçário - 28 Dias)</option>
        </select>

        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-[10px] bg-[#0f172a]/50 p-3 rounded-xl border border-slate-700/50">
          <div className="flex justify-between border-b border-slate-700/50 pb-1">
            <span className="text-slate-500">Área</span>
            <span className="text-slate-300 font-bold">10.000m² (1.0 ha)</span>
          </div>
          <div className="flex justify-between border-b border-slate-700/50 pb-1">
            <span className="text-slate-500">Biomassa Est.</span>
            <span className="text-slate-300 font-bold">2.400 kg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Peso Médio</span>
            <span className="text-slate-300 font-bold">12.5g</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Sobrevivência</span>
            <span className="text-emerald-400 font-bold">70%</span>
          </div>
        </div>
      </section>

      {/* CARTÃO: OXIGÉNIO DISSOLVIDO[cite: 13] */}
      <section className="bg-[#1e293b] rounded-2xl p-4 mb-4 shadow-lg border border-cyan-500/30">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-cyan-500/20 text-cyan-400 p-2 rounded-lg">💧</div>
            <div>
              <h2 className="text-sm font-bold text-white">Oxigênio Dissolvido (OD)</h2>
              <p className="text-[10px] text-slate-400">Unidade de medida: mg/L (ppm)</p>
            </div>
          </div>
          <span className="bg-slate-800 text-slate-300 text-[9px] font-bold px-2 py-1 rounded-lg">Ideal &gt; 4.0</span>
        </div>

        <div className="flex justify-between items-center bg-[#0f172a] p-3 rounded-xl border border-slate-700/50 mb-3">
          <button onClick={() => setOd(prev => +(prev - 0.1).toFixed(1))} className="w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-bold text-lg border border-slate-600 transition-colors">-0.1</button>
          <div className="text-center">
            <span className="text-4xl font-black text-white">{od.toFixed(1)}</span>
            <p className="text-[9px] font-bold text-slate-500 mt-1 tracking-widest">MG/L REGISTRADO</p>
          </div>
          <button onClick={() => setOd(prev => +(prev + 0.1).toFixed(1))} className="w-12 h-12 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white font-bold text-lg transition-colors">+0.1</button>
        </div>

        {/* ALERTA CONDICIONAL[cite: 13] */}
        {od < 4.0 && (
          <div className="bg-red-950/50 border border-red-500/50 rounded-xl p-3 flex items-start gap-3">
            <span className="text-red-500 mt-0.5">⚠️</span>
            <div>
              <h3 className="text-[11px] font-bold text-red-400">ABAIXO DO IDEAL - LIGAR AERADORES</h3>
              <p className="text-[9px] text-red-400/80 mt-0.5">Risco de estresse biológico por anóxia durante a madrugada.</p>
            </div>
          </div>
        )}
      </section>

      {/* CARTÃO: TEMPERATURA[cite: 13] */}
      <section className="bg-[#1e293b] rounded-2xl p-4 mb-4 shadow-lg border border-orange-500/30">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500/20 text-orange-400 p-2 rounded-lg">🌡️</div>
            <div>
              <h2 className="text-sm font-bold text-white">Temperatura da Água (°C)</h2>
              <p className="text-[10px] text-slate-400">Faixa ideal: 28.0°C - 30.0°C</p>
            </div>
          </div>
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold px-2 py-1 rounded-lg">✓ Normal</span>
        </div>

        <div className="flex justify-between items-center bg-[#0f172a] p-3 rounded-xl border border-slate-700/50 mb-3">
          <button onClick={() => setTemp(prev => +(prev - 0.5).toFixed(1))} className="w-12 h-12 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-bold text-lg border border-slate-600 transition-colors">-0.5</button>
          <div className="text-center">
            <span className="text-4xl font-black text-white">{temp.toFixed(1)}</span>
            <p className="text-[9px] font-bold text-slate-500 mt-1 tracking-widest">GRAUS CELSIUS (°C)</p>
          </div>
          <button onClick={() => setTemp(prev => +(prev + 0.5).toFixed(1))} className="w-12 h-12 bg-orange-600 hover:bg-orange-500 rounded-lg text-white font-bold text-lg transition-colors">+0.5</button>
        </div>
      </section>

      {/* AÇÕES IMEDIATAS[cite: 13] */}
      <section className="mb-6">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Ações Imediatas no Viveiro</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setAeradoresLigados(!aeradoresLigados)}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-colors ${aeradoresLigados ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-400' : 'bg-[#1e293b] border-slate-700 text-slate-400'}`}
          >
            <span className="text-sm font-bold">🌀 Aeradores</span>
            <span className="text-[9px]">{aeradoresLigados ? 'Ligados' : 'Desligados'}</span>
          </button>

          <button
            onClick={() => setMortalidade(!mortalidade)}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-colors ${mortalidade ? 'bg-red-950/50 border-red-500/50 text-red-400' : 'bg-[#1e293b] border-slate-700 text-slate-400'}`}
          >
            <span className="text-sm font-bold">⚠️ Mortalidade</span>
            <span className="text-[9px]">{mortalidade ? 'Identificada' : 'Nenhuma'}</span>
          </button>
        </div>
      </section>

      {/* BOTÃO SALVAR[cite: 13] */}
      <button onClick={salvarLeitura} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold p-4 rounded-xl shadow-lg transition-colors flex justify-center items-center gap-2">
        <span>💾</span> Salvar Leitura da Ronda
      </button>
    </main>
  );
}
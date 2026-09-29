'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Dados simulados representando a resposta da API REST (Back-end Python)
const dadosBiometria = [
  { semana: 'S1 (2.0g)', peso: 2.0 },
  { semana: 'S2 (3.5g)', peso: 3.5 },
  { semana: 'S3 (5.2g)', peso: 5.2 },
  { semana: 'S4 (8.1g)', peso: 8.1 },
  { semana: 'Atual (12.5g)', peso: 12.5 },
];

export default function MeusViveirosPage() {
  return (
    <main className="flex flex-col min-h-screen bg-slate-50 font-sans pb-24">
      {/* CABEÇALHO ESCURO */}
      <header className="bg-[#111827] text-white p-6 rounded-b-3xl mb-4 shadow-md">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-wider">
            <span>🔬 AQUASAD CAMPO</span>
          </div>
          <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block"></span>
            Sincronizado
          </span>
        </div>
        <h1 className="text-xl font-bold mt-1">Desempenho dos Viveiros</h1>
        <p className="text-xs text-slate-400 font-light mt-1">Operador: João Silva • Turno Manhã</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-slate-300">Foco Zootécnico: <strong className="text-white">Biometria e Sobrevivência</strong></span>
          <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">
            TOTAL VIVEIROS<br/><span className="text-sm">6 Ativos</span>
          </span>
        </div>
      </header>

      {/* VIVEIRO 02 - DETALHADO */}
      <section className="px-4 mb-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-lg font-black text-slate-800">02</span>
              <div>
                <h2 className="text-sm font-bold text-slate-800">Viveiro 02</h2>
                <p className="text-[10px] text-slate-400 italic">Litopenaeus vannamei</p>
              </div>
            </div>
            <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full">Engorda - 65 Dias</span>
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-blue-600 flex items-center gap-1">
              🔹 Indicadores Zootécnicos do Lote
            </span>
            <span className="text-[10px] text-slate-400">Lote #2024-02</span>
          </div>

          {/* INDICADORES EM GRID[cite: 10] */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border border-slate-100 p-3 rounded-xl bg-slate-50/50">
              <p className="text-[10px] text-slate-500 mb-1">Peso Médio</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-800">12.5</span>
                <span className="text-xs font-bold text-slate-500">g</span>
              </div>
              <p className="text-[10px] font-bold text-blue-500 mt-1">↑ +1.5g / semana</p>
            </div>

            <div className="border border-slate-100 p-3 rounded-xl bg-slate-50/50">
              <p className="text-[10px] text-slate-500 mb-1">Biomassa Estimada</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-800">2.700</span>
                <span className="text-xs font-bold text-slate-500">kg</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Pop: ~216.000 un</p>
            </div>

            <div className="border border-slate-100 p-3 rounded-xl bg-slate-50/50">
              <p className="text-[10px] text-slate-500 mb-1">FCA Atual</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-800">1.4</span>
                <span className="text-xs font-bold text-slate-500">fca</span>
              </div>
              <p className="text-[10px] font-bold text-emerald-500 mt-1 flex items-center gap-1">✓ Ótimo</p>
            </div>

            <div className="border border-slate-100 p-3 rounded-xl bg-slate-50/50">
              <p className="text-[10px] text-slate-500 mb-1">Sobrevivência</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-800">75%</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Meta mínima: 70%</p>
            </div>
          </div>

          {/* GRÁFICO RECHARTS[cite: 5, 10] */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h3 className="text-[10px] font-bold text-slate-600 mb-4 flex items-center gap-1">
              📈 Última Biometria: Crescimento de +1.5g na semana
            </h3>
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosBiometria} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="semana" axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="peso" radius={[4, 4, 0, 0]}>
                    {dadosBiometria.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === dadosBiometria.length - 1 ? '#2563eb' : '#93c5fd'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-2 mt-4">
               <button className="flex-1 bg-white border border-slate-200 text-slate-600 text-xs font-bold py-2 rounded-lg">📋 Histórico Amostral</button>
               <button className="flex-1 bg-[#111827] text-white text-xs font-bold py-2 rounded-lg">+ Nova Biometria</button>
            </div>
          </div>
        </div>
      </section>

      {/* VIVEIRO 03 - RESUMIDO[cite: 10] */}
      <section className="px-4 mb-3">
         <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-md font-black text-slate-800">03</span>
              <div>
                <h2 className="text-sm font-bold text-slate-800">Viveiro 03</h2>
                <p className="text-[10px] text-slate-400">Biomassa: 1.540 kg | FCA: 1.5</p>
              </div>
            </div>
            <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-md">Berçário - 28 D</span>
         </div>
      </section>
    </main>
  );
}

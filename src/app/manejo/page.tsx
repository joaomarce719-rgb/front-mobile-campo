'use client';

import React, { useState } from 'react';

export default function RegistroManejoPage() {
  const [racao, setRacao] = useState<number>(45);
  const [mortalidade, setMortalidade] = useState<number>(0);
  const [sobras, setSobras] = useState<string | null>(null);

  // Função simulada para o envio dos dados para a API REST no futuro
  const salvarRegistro = async () => {
    console.log("Enviando para o Back-end (FastAPI):", { racao, mortalidade, sobras });
    alert("Registro salvo com sucesso!");
  };

  return (
    <main className="flex flex-col min-h-screen bg-slate-50 p-4 font-sans pb-24">
      {/* CABEÇALHO */}
      <header className="bg-[#111827] text-white rounded-xl p-5 mb-4 shadow-md flex justify-between items-center">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Assinatura &amp; Manejo</span>
          <h1 className="text-xl font-bold mt-1">Registro de Manejo</h1>
        </div>
        <button className="bg-emerald-500 text-[#111827] text-xs font-bold px-3 py-2 rounded-lg">
          + SALVAR
        </button>
      </header>

      {/* VIVEIRO SELECIONADO */}
      <section className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
            📍 Viveiro Selecionado
          </span>
          <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded">OBRIGATÓRIO</span>
        </div>
        <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 outline-none">
          <option>Viveiro 02 - Fase Engorda (Setor A)</option>
          <option>Viveiro 03 - Berçário</option>
        </select>
        <div className="flex gap-4 mt-3 text-[10px] text-slate-500">
          <span>Área: 1.2 ha</span>
          <span>Lote: #2024-02</span>
          <span>Biomassa est.: 4.500 kg</span>
        </div>
      </section>

      {/* RAÇÃO DISTRIBUÍDA */}
      <section className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-slate-700 flex items-center gap-2">
            🌾 Ração Distribuída (kg)
          </h2>
          <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded">Trato 2/4</span>
        </div>
        <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
          <button onClick={() => setRacao(r => Math.max(0, r - 5))} className="w-12 h-12 bg-white rounded-lg shadow-sm font-bold text-slate-600 text-lg border border-slate-200">-5</button>
          <div className="text-center">
            <span className="text-3xl font-black text-slate-800">{racao}</span>
            <p className="text-[10px] font-bold text-slate-400 mt-1">VALOR (KG)</p>
          </div>
          <button onClick={() => setRacao(r => r + 5)} className="w-12 h-12 bg-blue-500 rounded-lg shadow-sm font-bold text-white text-lg">+5</button>
        </div>
      </section>

      {/* ANIMAIS MORTOS */}
      <section className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-slate-700 flex items-center gap-2">
            Animais Mortos
          </h2>
        </div>
        <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
          <button onClick={() => setMortalidade(valor => Math.max(0, valor - 1))} className="w-12 h-12 bg-white rounded-lg shadow-sm font-bold text-slate-600 text-lg border border-slate-200">-1</button>
          <div className="text-center">
            <span className="text-3xl font-black text-slate-800">{mortalidade}</span>
            <p className="text-[10px] font-bold text-slate-400 mt-1">ANIMAIS</p>
          </div>
          <button onClick={() => setMortalidade(valor => valor + 1)} className="w-12 h-12 bg-red-500 rounded-lg shadow-sm font-bold text-white text-lg">+1</button>
        </div>
      </section>

      {/* SOBRAS NAS BANDEJAS */}
      <section className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-bold text-slate-700 flex items-center gap-2">
            🍽️ Sobras nas Bandejas
          </h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">Verifique as bandejas de controle após a dispersão para ajustar os próximos tratos.</p>
        <div className="grid grid-cols-3 gap-2">
          <button onClick={() => setSobras('Nenhuma')} className={`p-3 rounded-lg border text-center flex flex-col items-center justify-center gap-1 ${sobras === 'Nenhuma' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
            <span className="text-emerald-500 font-bold text-sm">✓ Nenhuma</span>
          </button>
          <button onClick={() => setSobras('Pouca')} className={`p-3 rounded-lg border text-center flex flex-col items-center justify-center gap-1 ${sobras === 'Pouca' ? 'border-amber-500 bg-amber-50' : 'border-slate-200 bg-white'}`}>
            <span className="text-amber-500 font-bold text-sm">⚠️ Pouca</span>
          </button>
          <button onClick={() => setSobras('Muita')} className={`p-3 rounded-lg border text-center flex flex-col items-center justify-center gap-1 ${sobras === 'Muita' ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'}`}>
            <span className="text-red-500 font-bold text-sm">✖ Muita</span>
          </button>
        </div>
      </section>

      {/* BOTÃO SALVAR (MOCK) */}
      <button onClick={salvarRegistro} className="w-full bg-[#111827] text-white font-bold p-4 rounded-xl mt-2">
        Confirmar Registro
      </button>
    </main>
  );
}
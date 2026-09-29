'use client';

import React, { useState } from 'react';

// Tipagem baseada no contrato esperado da API REST (Back-end em Python)[cite: 5]
interface Tarefa {
  id: string;
  titulo: string;
  local: string;
  prazo: string;
  descricao: string;
  status: 'PENDENTE' | 'CONCLUIDA';
  concluidaPor?: string;
  horaConclusao?: string;
  tipo: 'MANUTENCAO' | 'MANEJO' | 'MONITORAMENTO';
}

const tarefasMock: Tarefa[] = [
  {
    id: '1',
    titulo: 'Manutenção do Aerador',
    local: 'Viveiro 04',
    prazo: 'Prazo: até 11:30',
    descricao: 'Trocar hélice quebrada do lado norte e checar a integridade do cabo de energia submerso.',
    status: 'PENDENTE',
    tipo: 'MANUTENCAO'
  },
  {
    id: '2',
    titulo: 'Aplicação de Probiótico',
    local: 'Viveiro 06',
    prazo: 'Prazo: até 16:00',
    descricao: 'Dissolver 2kg de biorremediador em 50L de água do viveiro e distribuir homogeneamente na entrada de água.',
    status: 'PENDENTE',
    tipo: 'MANEJO'
  },
  {
    id: '3',
    titulo: 'Coleta de Parâmetros de Água',
    local: 'Viveiro 01',
    prazo: 'Prazo: até 17:00',
    descricao: 'Aferição de Oxigênio Dissolvido (OD) e Temperatura com a sonda multiparâmetro no ponto central do viveiro.',
    status: 'PENDENTE',
    tipo: 'MONITORAMENTO'
  },
  {
    id: '4',
    titulo: 'Alimentação Matinal (Ração 35%)',
    local: 'Viveiro 02',
    prazo: '',
    descricao: 'Distribuir 45kg no alimentador automático e verificar taxa de consumo e sobras nas bandejas após 45 minutos.',
    status: 'CONCLUIDA',
    concluidaPor: 'João Silva',
    horaConclusao: '07:45',
    tipo: 'MANEJO'
  }
];

export default function MinhasTarefasPage() {
  const [abaAtiva, setAbaAtiva] = useState<'PENDENTE' | 'CONCLUIDA'>('PENDENTE');

  const tarefasFiltradas = tarefasMock.filter(t => t.status === abaAtiva);
  const contagemPendentes = tarefasMock.filter(t => t.status === 'PENDENTE').length;
  const contagemConcluidas = tarefasMock.filter(t => t.status === 'CONCLUIDA').length;

  const marcarComoConcluida = (id: string) => {
    // Esta função acionará um endpoint HTTP PATCH no FastAPI futuramente[cite: 5]
    console.log(`Tarefa ${id} marcada como concluída.`);
    alert('Comunicação com a API simulada: Tarefa atualizada!');
  };

  return (
    <main className="flex flex-col min-h-screen bg-slate-50 font-sans pb-24">
      {/* CABEÇALHO ESCURO[cite: 11] */}
      <header className="bg-[#111827] text-white p-6 rounded-b-3xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <button className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2">
            <span>+ NOVA ATIVIDADE</span>
          </button>
          <span className="text-slate-400 text-[10px] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full inline-block"></span>
            Sincronizado 08:30
          </span>
        </div>
        <h1 className="text-2xl font-bold">Atividades do Dia</h1>
        <p className="text-xs text-slate-300 font-light mt-1 flex items-center gap-2">
          <span className="bg-slate-700 p-1 rounded-full text-[10px]">👤</span>
          Operador: João Silva | Turno A (Manhã)
        </p>

        {/* ABAS DE FILTRO[cite: 11] */}
        <div className="flex gap-2 mt-6">
          <button
            onClick={() => setAbaAtiva('PENDENTE')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex justify-center items-center gap-2 transition-colors ${abaAtiva === 'PENDENTE' ? 'bg-amber-100 text-amber-700' : 'bg-slate-800 text-slate-400'}`}
          >
            <span>⏳</span> {contagemPendentes} Pendentes
          </button>
          <button
            onClick={() => setAbaAtiva('CONCLUIDA')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex justify-center items-center gap-2 transition-colors ${abaAtiva === 'CONCLUIDA' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-800 text-slate-400'}`}
          >
            <span>✓</span> {contagemConcluidas} Concluídas
          </button>
        </div>
      </header>

      {/* LISTA DE TAREFAS[cite: 11] */}
      <section className="p-4 flex flex-col gap-4 mt-2">
        <div className="flex justify-between items-center px-1 mb-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            {abaAtiva === 'PENDENTE' ? 'Tarefas a realizar' : 'Tarefas finalizadas'}
          </span>
        </div>

        {tarefasFiltradas.map((tarefa) => (
          <div key={tarefa.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">
                  {tarefa.tipo.replace('_', ' ')}
                </span>
                <h3 className="font-bold text-slate-800 text-sm mt-0.5">{tarefa.titulo}</h3>
              </div>
              <span className="bg-blue-50 text-blue-600 font-bold text-[10px] px-2 py-1 rounded-md">
                {tarefa.local}
              </span>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 mb-4 border border-slate-100">
              {tarefa.status === 'PENDENTE' && (
                <p className="text-[10px] font-bold text-red-500 mb-1 flex items-center gap-1">
                  <span>⏱</span> {tarefa.prazo}
                </p>
              )}
              <p className="text-xs text-slate-600 leading-relaxed">
                {tarefa.descricao}
              </p>
            </div>

            {tarefa.status === 'PENDENTE' ? (
              <button
                onClick={() => marcarComoConcluida(tarefa.id)}
                className="w-full bg-emerald-700 hover:bg-emerald-800 transition-colors text-white text-xs font-bold py-3.5 rounded-xl flex justify-center items-center gap-2"
              >
                <span className="text-sm">✓</span> Marcar como Concluído
              </button>
            ) : (
              <div className="w-full bg-emerald-50 text-emerald-700 text-xs font-bold py-3 rounded-xl flex justify-center items-center gap-2 border border-emerald-100">
                <span className="text-sm">✓</span> Concluído às {tarefa.horaConclusao} por {tarefa.concluidaPor}
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
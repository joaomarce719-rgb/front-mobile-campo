'use client';

import React, { useEffect, useState } from 'react';
import type { DadosCentralOperador } from '../types/operador';
import { obterDadosCentral } from '../services/dashboardService';

const dadosFallback: DadosCentralOperador = {
  nomeOperador: 'Operador',
  dataAtual: 'Quinta-feira, 24 de setembro',
  estadoSistema: 'Sistema Ativo',
  alertas: [
    {
      id: '1',
      tipo: 'ALERTA',
      titulo: 'Alerta de Muda (Lua Cheia)',
      descricao: 'Reforçar monitoramento de oxigênio a partir das 22h nos Viveiros 02 e 04.',
      visto: false,
    },
    {
      id: '2',
      tipo: 'MANUTENCAO',
      titulo: 'Manutenção Preventiva',
      descricao: 'Aerador B2 do Viveiro 01 programado para revisão às 14h.',
      visto: false,
    },
  ],
};

export default function CentralOperadorPage() {
  const [dados, setDados] = useState<DadosCentralOperador | null>(null);
  const [carregando, setCarregando] = useState<boolean>(true);

  useEffect(() => {
    async function carregarDashboard() {
      try {
        setDados(await obterDadosCentral());
      } catch {
        setDados(dadosFallback);
      } finally {
        setCarregando(false);
      }
    }

    carregarDashboard();
  }, []);

  if (carregando) {
    return <div className="flex h-screen items-center justify-center">Carregando...</div>;
  }

  if (!dados) {
    return <div className="flex h-screen items-center justify-center text-red-500">Erro ao carregar dados.</div>;
  }

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 p-4 pb-24 font-sans">
      <header className="mb-4 rounded-2xl bg-[#111827] p-6 text-white shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <span className="flex items-center gap-1 rounded-full bg-emerald-400 px-3 py-1 text-[10px] font-bold text-[#111827]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#111827]"></span>
            {dados.estadoSistema}
          </span>
          <span className="text-sm text-slate-400">((•))</span>
        </div>
        <h1 className="text-2xl font-bold">Olá, {dados.nomeOperador}</h1>
        <p className="text-sm text-slate-300 font-light mt-1">{dados.dataAtual}</p>
      </header>

      <section className="mb-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <span className="text-lg text-emerald-500">📢</span> Avisos &amp; Observações
          </h2>
          <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-600">
            {dados.alertas.filter((alerta) => !alerta.visto).length} novos
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {dados.alertas.map((alerta) => (
            <div key={alerta.id} className="flex items-start gap-3">
              <span className="mt-0.5 text-lg">
                {alerta.tipo === 'ALERTA' ? '⚠️' : alerta.tipo === 'MANUTENCAO' ? '🔧' : '📝'}
              </span>
              <div>
                <h3 className="text-sm font-bold text-slate-800">{alerta.titulo}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{alerta.descricao}</p>
              </div>
            </div>
          ))}
          <div className="mt-2 flex items-center justify-between border-t border-slate-50 pt-2">
            <button className="flex items-center gap-1 text-xs font-bold text-emerald-600">
              <span className="text-lg">⊕</span> Nova Observação
            </button>
            <button className="text-xs text-slate-400">Ver todas (4)</button>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div className="mb-1 flex items-center justify-between px-1">
          <span className="rounded-md bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700">
            Módulo Unificado
          </span>
          <span className="text-slate-400">⌄</span>
        </div>

        <button className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-emerald-100 p-3 text-xl text-emerald-600">📋</div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Registrar Informações</h3>
                <p className="mt-0.5 text-[10px] text-slate-500">Biometria, Ração, Mortalidade e Comedouros integrados</p>
              </div>
            </div>
            <span className="text-slate-400">→</span>
        </button>

        <button className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-slate-100 p-3 text-xl text-slate-600">💧</div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Qualidade da Água</h3>
                <p className="mt-0.5 text-[10px] text-slate-500">O₂, salinidade, pH, temp. e sonda multiparâmetro</p>
              </div>
            </div>
            <span className="text-slate-400">→</span>
        </button>

        <button className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-slate-100 p-3 text-xl text-slate-600">✓</div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Tarefas &amp; Ocorrências</h3>
                <p className="mt-0.5 text-[10px] text-slate-500">Ronda, checklist de aeradores e intercorrências</p>
              </div>
            </div>
            <span className="text-slate-400">→</span>
        </button>
      </section>

      <nav className="fixed bottom-0 left-0 flex w-full justify-around border-t border-slate-100 bg-white p-3 pb-6">
        <button className="flex flex-col items-center text-emerald-600">
          <span className="mb-1 text-xl">🏠</span>
          <span className="text-[10px] font-bold">Início</span>
        </button>
        <button className="relative flex flex-col items-center text-slate-400">
          <span className="absolute right-2 top-0 h-2 w-2 rounded-full bg-red-500"></span>
          <span className="mb-1 text-xl">🔔</span>
          <span className="text-[10px] font-bold">Alertas</span>
        </button>
        <button className="flex flex-col items-center text-slate-400">
          <span className="mb-1 text-xl">👤</span>
          <span className="text-[10px] font-bold">Perfil</span>
        </button>
      </nav>
    </main>
  );
}


import type { Evento } from "../types/events";

export type Posicionamentos = Record<string, string>;

export interface ResultadoFase {
  itens: {
    id: string;
    posicaoAtual: number;
    posicaoCorreta: number;
    correto: boolean;
  }[];
  quantidadeAcertos: number;
  totalEventos: number;
  concluida: boolean;
}

export function embaralharEventos(eventos: Evento[]): Evento[] {
  const embaralhados = [...eventos];

  for (let i = embaralhados.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [embaralhados[i], embaralhados[j]] = [
      embaralhados[j],
      embaralhados[i],
    ];
  }

  return embaralhados;
}

export function selecionarEventosDaFase(
  eventos: Evento[],
  fase: Evento["phase"],
): Evento[] {
  const eventosDisponiveis = eventos.filter(
    (evento) => evento.phase === fase,
  );

  if (eventosDisponiveis.length < 3) {
    throw new Error(
      `A fase ${fase} precisa ter pelo menos 3 eventos cadastrados.`,
    );
  }

  return embaralharEventos(eventosDisponiveis).slice(0, 3);
}

export function verificarResposta(
  posicionamentos: Posicionamentos,
  eventosDaFase: Evento[],
): ResultadoFase {
  const eventosOrdenados = [...eventosDaFase].sort(
    (a, b) => a.year - b.year,
  );

  const itens = eventosDaFase.map((evento) => {
    const posicaoCorreta =
      eventosOrdenados.findIndex(
        (eventoCorreto) => eventoCorreto.id === evento.id,
      ) + 1;

    const zonaCorreta = `timeline-position-${posicaoCorreta - 1}`;

    const zonaAtual = Object.keys(posicionamentos).find(
      (zona) => posicionamentos[zona] === evento.id,
    );

    const posicaoAtual = zonaAtual
      ? Number(zonaAtual.replace("timeline-position-", "")) + 1
      : 0;

    return {
      id: evento.id,
      posicaoAtual,
      posicaoCorreta,
      correto: zonaAtual === zonaCorreta,
    };
  });

  // Garante que os três espaços estejam preenchidos
  // com os três eventos esperados, sem duplicações.
  const eventosPosicionados = Object.values(posicionamentos);
  const todosPosicionadosCorretamente =
    eventosPosicionados.length === eventosDaFase.length &&
    new Set(eventosPosicionados).size === eventosDaFase.length &&
    eventosDaFase.every((evento) =>
      eventosPosicionados.includes(evento.id),
    );

  const quantidadeAcertos = itens.filter(
    (item) => item.correto,
  ).length;

  const concluida =
    todosPosicionadosCorretamente &&
    quantidadeAcertos === eventosDaFase.length &&
    eventosDaFase.length > 0;

  return {
    itens,
    quantidadeAcertos,
    totalEventos: eventosDaFase.length,
    concluida,
  };
}
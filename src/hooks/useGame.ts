
import { useEffect, useState } from "react";
import type { Evento } from "../types/events";
import {
  verificarResposta,
  selecionarEventosDaFase,
  type ResultadoFase,
  type Posicionamentos,
} from "../utils/gameLogic";
import {
  savePhaseEvents,
  clearFinalTimelineEvents,
} from "../utils/finalTimelineStorage";

type Fase = 1 | 2 | 3;

interface UseGameReturn {
  faseAtual: Fase;
  eventosDaFase: Evento[];
  posicionamentos: Posicionamentos;
  eventosNaMao: Evento[];
  resultado: ResultadoFase | null;
  fasesConcluidas: Fase[];
  faseConcluida: boolean;
  podeVerificar: boolean;
  podeAvancar: boolean;
  jogoConcluido: boolean;
  posicionarEvento: (eventoId: string, zonaId: string) => void;
  verificar: () => void;
  avancarFase: () => void;
  reiniciarFase: () => void;
  reiniciarJogo: () => void;
}

export function useGame(eventos: Evento[]): UseGameReturn {
  const [faseAtual, setFaseAtual] = useState<Fase>(1);

  const [eventosDaFase, setEventosDaFase] = useState<Evento[]>(
    () => selecionarEventosDaFase(eventos, 1)
  );

  const [posicionamentos, setPosicionamentos] =
    useState<Posicionamentos>({});

  const [resultado, setResultado] =
    useState<ResultadoFase | null>(null);

  const [fasesConcluidas, setFasesConcluidas] =
    useState<Fase[]>([]);

  useEffect(() => {
    savePhaseEvents(faseAtual, eventosDaFase);
  }, [faseAtual, eventosDaFase]);

  const faseConcluida = fasesConcluidas.includes(faseAtual);
  const podeAvancar = faseConcluida && faseAtual < 3;
  const jogoConcluido = fasesConcluidas.length === 3;

  const eventosPosicionados = Object.values(posicionamentos);

  const eventosNaMao = eventosDaFase.filter(
    (evento) => !eventosPosicionados.includes(evento.id)
  );

  const podeVerificar =
    !faseConcluida &&
    eventosDaFase.length === 3 &&
    eventosPosicionados.length === 3 &&
    new Set(eventosPosicionados).size === 3 &&
    eventosDaFase.every((evento) =>
      eventosPosicionados.includes(evento.id)
    );

  function posicionarEvento(
    eventoId: string,
    zonaId: string
  ): void {
    if (faseConcluida) return;

    if (!eventosDaFase.some((evento) => evento.id === eventoId)) {
      return;
    }

    if (!/^timeline-position-[0-2]$/.test(zonaId)) {
      return;
    }

    setPosicionamentos((atuais) => {
      const novos = { ...atuais };

      const zonaOrigem = Object.keys(novos).find(
        (zona) => novos[zona] === eventoId
      );

      const eventoNaZonaDestino = novos[zonaId];

      if (zonaOrigem === zonaId) {
        return atuais;
      }

      if (zonaOrigem) {
        if (eventoNaZonaDestino) {
          novos[zonaOrigem] = eventoNaZonaDestino;
        } else {
          delete novos[zonaOrigem];
        }
      }

      novos[zonaId] = eventoId;
      return novos;
    });

    setResultado(null);
  }

  function verificar(): void {
    if (!podeVerificar) return;

    const novoResultado = verificarResposta(
      posicionamentos,
      eventosDaFase
    );

    setResultado(novoResultado);

    if (novoResultado.concluida) {
      setFasesConcluidas((atuais) =>
        atuais.includes(faseAtual)
          ? atuais
          : [...atuais, faseAtual]
      );
    } else {
      setPosicionamentos({});
    }
  }

  function avancarFase(): void {
    if (!podeAvancar) return;

    const proximaFase = (faseAtual + 1) as Fase;

    setFaseAtual(proximaFase);
    setEventosDaFase(
      selecionarEventosDaFase(eventos, proximaFase)
    );
    setPosicionamentos({});
    setResultado(null);
  }

  function reiniciarFase(): void {
    if (faseConcluida) return;

    setPosicionamentos({});
    setResultado(null);
  }

  function reiniciarJogo(): void {
    clearFinalTimelineEvents();

    setFaseAtual(1);
    setEventosDaFase(selecionarEventosDaFase(eventos, 1));
    setPosicionamentos({});
    setResultado(null);
    setFasesConcluidas([]);
  }

  return {
    faseAtual,
    eventosDaFase,
    posicionamentos,
    eventosNaMao,
    resultado,
    fasesConcluidas,
    faseConcluida,
    podeVerificar,
    podeAvancar,
    jogoConcluido,
    posicionarEvento,
    verificar,
    avancarFase,
    reiniciarFase,
    reiniciarJogo,
  };
}
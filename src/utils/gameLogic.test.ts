
import { describe, it, expect } from "vitest";
import type { Evento } from "../types/events";
import {
  selecionarEventosDaFase,
  verificarResposta,
} from "./gameLogic";

const eventos: Evento[] = [
  { id: "a", phase: 1, title: "Evento A", year: 100, description: "", detailedFeedback: "", image: "" },
  { id: "b", phase: 1, title: "Evento B", year: 200, description: "", detailedFeedback: "", image: "" },
  { id: "c", phase: 1, title: "Evento C", year: 300, description: "", detailedFeedback: "", image: "" },
  { id: "d", phase: 1, title: "Evento D", year: 400, description: "", detailedFeedback: "", image: "" },
  { id: "e", phase: 1, title: "Evento E", year: 500, description: "", detailedFeedback: "", image: "" },
  { id: "f", phase: 2, title: "Evento F", year: 600, description: "", detailedFeedback: "", image: "" },
];

describe("selecionarEventosDaFase", () => {
  it("seleciona exatamente 3 eventos da fase solicitada", () => {
    const selecionados = selecionarEventosDaFase(eventos, 1);

    expect(selecionados).toHaveLength(3);
    expect(selecionados.every((evento) => evento.phase === 1)).toBe(true);
  });

  it("não repete eventos na seleção", () => {
    const selecionados = selecionarEventosDaFase(eventos, 1);
    const ids = selecionados.map((evento) => evento.id);

    expect(new Set(ids).size).toBe(3);
  });

  it("lança erro se houver menos de 3 eventos na fase", () => {
    expect(() => selecionarEventosDaFase(eventos, 2)).toThrow(
      "A fase 2 precisa ter pelo menos 3 eventos cadastrados."
    );
  });
});

describe("verificarResposta", () => {
  const eventosDaFase: Evento[] = [
    { id: "a", phase: 1, title: "Evento A", year: 100, description: "", detailedFeedback: "", image: "" },
    { id: "b", phase: 1, title: "Evento B", year: 200, description: "", detailedFeedback: "", image: "" },
    { id: "c", phase: 1, title: "Evento C", year: 300, description: "", detailedFeedback: "", image: "" },
  ];

  it("conclui a fase quando cada evento está no espaço cronológico correto", () => {
    const posicionamentos = {
      "timeline-position-0": "a",
      "timeline-position-1": "b",
      "timeline-position-2": "c",
    };

    const resultado = verificarResposta(posicionamentos, eventosDaFase);

    expect(resultado.quantidadeAcertos).toBe(3);
    expect(resultado.totalEventos).toBe(3);
    expect(resultado.concluida).toBe(true);
  });

  it("não conclui a fase quando há eventos fora de posição", () => {
    const posicionamentos = {
      "timeline-position-0": "a",
      "timeline-position-1": "c",
      "timeline-position-2": "b",
    };

    const resultado = verificarResposta(posicionamentos, eventosDaFase);

    expect(resultado.quantidadeAcertos).toBe(1);
    expect(resultado.totalEventos).toBe(3);
    expect(resultado.concluida).toBe(false);
  });

  it("identifica a posição atual e a posição correta de cada evento", () => {
    const posicionamentos = {
      "timeline-position-0": "c",
      "timeline-position-1": "a",
      "timeline-position-2": "b",
    };

    const resultado = verificarResposta(posicionamentos, eventosDaFase);

    expect(resultado.itens).toEqual([
      { id: "a", posicaoAtual: 2, posicaoCorreta: 1, correto: false },
      { id: "b", posicaoAtual: 3, posicaoCorreta: 2, correto: false },
      { id: "c", posicaoAtual: 1, posicaoCorreta: 3, correto: false },
    ]);
  });

  it("não conclui a fase se houver espaços vazios", () => {
    const posicionamentos = {
      "timeline-position-0": "a",
      "timeline-position-1": "b",
    };

    const resultado = verificarResposta(posicionamentos, eventosDaFase);

    expect(resultado.quantidadeAcertos).toBe(2);
    expect(resultado.totalEventos).toBe(3);
    expect(resultado.concluida).toBe(false);
  });

  it("não conclui a fase se o mesmo evento aparecer mais de uma vez", () => {
    const posicionamentos = {
      "timeline-position-0": "a",
      "timeline-position-1": "a",
      "timeline-position-2": "c",
    };

    const resultado = verificarResposta(posicionamentos, eventosDaFase);

    expect(resultado.concluida).toBe(false);
  });
});

 // @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useGame } from "./useGame";
import type { Evento } from "../types/events";

const eventosTeste: Evento[] = [
  {
    id: "a",
    phase: 1,
    title: "Evento A",
    year: 1500,
    description: "Descrição A",
    detailedFeedback: "Feedback A",
    image: "",
  },
  {
    id: "b",
    phase: 1,
    title: "Evento B",
    year: 1200,
    description: "Descrição B",
    detailedFeedback: "Feedback B",
    image: "",
  },
  {
    id: "c",
    phase: 1,
    title: "Evento C",
    year: 1800,
    description: "Descrição C",
    detailedFeedback: "Feedback C",
    image: "",
  },
];

function posicionarTodosCorretamente(
  result: { current: ReturnType<typeof useGame> }
) {
  const ordemCronologica = [...result.current.eventosDaFase].sort(
    (a, b) => a.year - b.year
  );

  act(() => {
    ordemCronologica.forEach((evento, index) => {
      result.current.posicionarEvento(
        evento.id,
        `timeline-position-${index}`
      );
    });
  });
}

describe("useGame", () => {
  it("inicia na fase 1 com três eventos na mão", () => {
    const { result } = renderHook(() => useGame(eventosTeste));

    expect(result.current.faseAtual).toBe(1);
    expect(result.current.eventosDaFase).toHaveLength(3);
    expect(result.current.eventosNaMao).toHaveLength(3);
    expect(result.current.posicionamentos).toEqual({});
    expect(result.current.podeVerificar).toBe(false);
    expect(result.current.resultado).toBeNull();
    expect(result.current.fasesConcluidas).toEqual([]);
    expect(result.current.faseConcluida).toBe(false);
    expect(result.current.jogoConcluido).toBe(false);
  });

  it("habilita a verificação quando os três cartões estão posicionados", () => {
    const { result } = renderHook(() => useGame(eventosTeste));

    act(() => {
      result.current.posicionarEvento("a", "timeline-position-0");
      result.current.posicionarEvento("b", "timeline-position-1");
    });

    expect(result.current.podeVerificar).toBe(false);

    act(() => {
      result.current.posicionarEvento("c", "timeline-position-2");
    });

    expect(result.current.podeVerificar).toBe(true);
    expect(result.current.eventosNaMao).toHaveLength(0);
  });

  it("conclui a fase quando os eventos estão nas posições corretas", () => {
    const { result } = renderHook(() => useGame(eventosTeste));

    posicionarTodosCorretamente(result);

    act(() => {
      result.current.verificar();
    });

    expect(result.current.resultado?.concluida).toBe(true);
    expect(result.current.resultado?.quantidadeAcertos).toBe(3);
    expect(result.current.faseConcluida).toBe(true);
    expect(result.current.podeAvancar).toBe(true);
    expect(result.current.fasesConcluidas).toContain(1);
  });

  it("devolve os cartões à mão após uma resposta incorreta", () => {
    const { result } = renderHook(() => useGame(eventosTeste));

    const idsOriginais = result.current.eventosDaFase
      .map((evento) => evento.id)
      .sort();

    const ordemInversa = [...result.current.eventosDaFase].sort(
      (a, b) => b.year - a.year
    );

    act(() => {
      ordemInversa.forEach((evento, index) => {
        result.current.posicionarEvento(
          evento.id,
          `timeline-position-${index}`
        );
      });
    });

    expect(result.current.podeVerificar).toBe(true);

    act(() => {
      result.current.verificar();
    });

    expect(result.current.resultado?.concluida).toBe(false);
    expect(result.current.faseConcluida).toBe(false);
    expect(result.current.podeAvancar).toBe(false);
    expect(result.current.posicionamentos).toEqual({});
    expect(result.current.eventosNaMao).toHaveLength(3);

    expect(
      result.current.eventosDaFase.map((evento) => evento.id).sort()
    ).toEqual(idsOriginais);
  });

  it("avança para a fase 2 após concluir a fase 1", () => {
    const eventosComTresFases: Evento[] = [
      ...eventosTeste,
      {
        id: "d",
        phase: 2,
        title: "Evento D",
        year: 400,
        description: "Descrição D",
        detailedFeedback: "Feedback D",
        image: "",
      },
      {
        id: "e",
        phase: 2,
        title: "Evento E",
        year: 800,
        description: "Descrição E",
        detailedFeedback: "Feedback E",
        image: "",
      },
      {
        id: "f",
        phase: 2,
        title: "Evento F",
        year: 1000,
        description: "Descrição F",
        detailedFeedback: "Feedback F",
        image: "",
      },
      {
        id: "g",
        phase: 3,
        title: "Evento G",
        year: 1200,
        description: "Descrição G",
        detailedFeedback: "Feedback G",
        image: "",
      },
      {
        id: "h",
        phase: 3,
        title: "Evento H",
        year: 1400,
        description: "Descrição H",
        detailedFeedback: "Feedback H",
        image: "",
      },
      {
        id: "i",
        phase: 3,
        title: "Evento I",
        year: 1600,
        description: "Descrição I",
        detailedFeedback: "Feedback I",
        image: "",
      },
    ];

    const { result } = renderHook(() => useGame(eventosComTresFases));

    posicionarTodosCorretamente(result);

    act(() => {
      result.current.verificar();
    });

    expect(result.current.faseConcluida).toBe(true);
    expect(result.current.podeAvancar).toBe(true);

    act(() => {
      result.current.avancarFase();
    });

    expect(result.current.faseAtual).toBe(2);
    expect(result.current.eventosDaFase).toHaveLength(3);
    expect(
      result.current.eventosDaFase.every((evento) => evento.phase === 2)
    ).toBe(true);
    expect(result.current.posicionamentos).toEqual({});
    expect(result.current.eventosNaMao).toHaveLength(3);
    expect(result.current.podeVerificar).toBe(false);
    expect(result.current.resultado).toBeNull();
  });

  it("não permite avançar antes de concluir a fase", () => {
    const eventosComTresFases: Evento[] = [
      ...eventosTeste,
      {
        id: "d",
        phase: 2,
        title: "Evento D",
        year: 400,
        description: "Descrição D",
        detailedFeedback: "Feedback D",
        image: "",
      },
      {
        id: "e",
        phase: 2,
        title: "Evento E",
        year: 800,
        description: "Descrição E",
        detailedFeedback: "Feedback E",
        image: "",
      },
      {
        id: "f",
        phase: 2,
        title: "Evento F",
        year: 1000,
        description: "Descrição F",
        detailedFeedback: "Feedback F",
        image: "",
      },
    ];

    const { result } = renderHook(() => useGame(eventosComTresFases));

    act(() => {
      result.current.avancarFase();
    });

    expect(result.current.faseAtual).toBe(1);
    expect(result.current.faseConcluida).toBe(false);
    expect(result.current.podeAvancar).toBe(false);
  });

  it("reinicia a fase mantendo os mesmos eventos e limpando os posicionamentos", () => {
    const { result } = renderHook(() => useGame(eventosTeste));

    const idsOriginais = result.current.eventosDaFase
      .map((evento) => evento.id)
      .sort();

    act(() => {
      result.current.posicionarEvento("a", "timeline-position-0");
    });

    act(() => {
      result.current.reiniciarFase();
    });

    expect(
      result.current.eventosDaFase.map((evento) => evento.id).sort()
    ).toEqual(idsOriginais);
    expect(result.current.posicionamentos).toEqual({});
    expect(result.current.eventosNaMao).toHaveLength(3);
    expect(result.current.resultado).toBeNull();
    expect(result.current.faseAtual).toBe(1);
    expect(result.current.faseConcluida).toBe(false);
  });
});
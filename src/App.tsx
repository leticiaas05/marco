import {
  DndContext,
  type DragEndEvent,
} from "@dnd-kit/core";

import { useGame } from "./hooks/useGame";
import eventos from "./data/events";

import { Timeline } from "./components/Timeline/Timeline";
import { DropZone } from "./components/Dropzone/DropZone";
import { EventCard } from "./components/EventCard/EventCard";
import { FinalTimeline } from "./components/FinalTimeline/FinalTimeline";
import { getFinalTimelineEvents } from "./utils/finalTimelineStorage";
import { useState } from "react";
import { HomePage } from "./components/HomePage/HomePage";
import { HowToPlayModal } from "./components/HowToPlayModal/HowToPlayModal"; // <-- Importado aqui

function App() {
  const [iniciou, setIniciou] = useState(false);
  const [modalComoJogarAberto, setModalComoJogarAberto] = useState(false); // <-- Estado do Modal

  const {
    faseAtual,
    eventosDaFase,
    posicionamentos,
    eventosNaMao,
    resultado,
    faseConcluida,
    podeVerificar,
    podeAvancar,
    jogoConcluido,
    posicionarEvento,
    verificar,
    avancarFase,
    reiniciarFase,
    reiniciarJogo,
  } = useGame(eventos);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const eventoId = String(active.id);
    const zonaId = String(over.id);

    if (!/^timeline-position-[0-2]$/.test(zonaId)) {
      return;
    }

    posicionarEvento(eventoId, zonaId);
  }

  if (jogoConcluido) {
    const eventosFinais = getFinalTimelineEvents();

    return (
      <main className="min-h-screen bg-[#FFE7C2] p-8 text-[#381313]">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Marco.
          </h1>

          <p className="mt-4 text-xl font-bold">
            Parabéns! Você concluiu todas as fases!
          </p>

          <p className="mt-2">
            Confira a linha do tempo com os eventos que você organizou.
          </p>
        </header>

        {eventosFinais.length === 9 ? (
          <FinalTimeline events={eventosFinais} />
        ) : (
          <p className="text-center">
            Não foi possível carregar os eventos da timeline final.
          </p>
        )}

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={reiniciarJogo}
            className="rounded-xl bg-[#381313] px-8 py-3 font-bold text-[#FFE7C2] shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#542323] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#381313]"
          >
            Jogar novamente
          </button>
        </div>
      </main>
    );
  }

  if (!iniciou) {
    return (
      <>
        <HomePage
          onStart={() => setIniciou(true)}
          onHowToPlay={() => setModalComoJogarAberto(true)}
        />
        
        <HowToPlayModal
          isOpen={modalComoJogarAberto}
          onClose={() => setModalComoJogarAberto(false)}
        />
      </>
    );
  }

  const anosOrdenados = [...eventosDaFase]
    .sort((a, b) => a.year - b.year)
    .map((evento) => evento.year);

  return (
    <main className="h-screen overflow-hidden bg-[#FFE7C2] text-[#381313]">
      <header className="flex h-16 shrink-0 items-center justify-between px-5 py-3 sm:px-10">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Marco.
        </h1>

        <button
          type="button"
          className="font-bold transition-opacity hover:opacity-70"
          onClick={() => setModalComoJogarAberto(true)} // <-- Abre o modal
        >
          Como jogar?
        </button>
      </header>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden bg-[#381313] px-4 py-3 sm:px-6 sm:py-4">
          <Timeline
            currentPhase={faseAtual}
            years={anosOrdenados}
          >
            {Array.from({ length: 3 }, (_, index) => {
              const zonaId = `timeline-position-${index}`;
              const eventoId = posicionamentos[zonaId];

              const eventoPosicionado = eventosDaFase.find(
                (evento) => evento.id === eventoId,
              );

              return (
                <DropZone
                  key={zonaId}
                  id={zonaId}
                  index={index}
                >
                  {eventoPosicionado && (
                    <EventCard
                      id={eventoPosicionado.id}
                      title={eventoPosicionado.title}
                      description={eventoPosicionado.description}
                      image={eventoPosicionado.image}
                      detailedFeedback={
                        eventoPosicionado.detailedFeedback
                      }
                    />
                  )}
                </DropZone>
              );
            })}
          </Timeline>

          <section
            className="mx-auto mt-4 grid w-full max-w-5xl shrink-0 grid-cols-1 items-start gap-4 sm:grid-cols-2 md:grid-cols-3"
            aria-label="Eventos disponíveis para organizar"
          >
            {eventosNaMao.map((evento) => (
              <EventCard
                key={evento.id}
                id={evento.id}
                title={evento.title}
                description={evento.description}
                image={evento.image}
                detailedFeedback={evento.detailedFeedback}
              />
            ))}
          </section>

          <div className="mx-auto mt-4 flex shrink-0 max-w-5xl flex-wrap justify-center gap-3">
            {!faseConcluida && (
              <>
                <button
                  type="button"
                  onClick={reiniciarFase}
                  className="rounded-xl border-2 border-[#FFE7C2] px-5 py-3 font-bold text-[#FFE7C2] transition-opacity hover:opacity-80"
                >
                  Limpar posições
                </button>

                <button
                  type="button"
                  onClick={verificar}
                  disabled={!podeVerificar}
                  className="rounded-xl bg-[#FFE7C2] px-5 py-3 font-bold text-[#381313] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Verificar resposta
                </button>
              </>
            )}

            {podeAvancar && (
              <button
                type="button"
                onClick={avancarFase}
                className="rounded-xl bg-[#FFE7C2] px-5 py-3 font-bold text-[#381313] transition-opacity hover:opacity-90"
              >
                Avançar para a próxima fase
              </button>
            )}
          </div>

          {resultado && (
            <p
              role="status"
              className="mx-auto mt-3 shrink-0 max-w-3xl text-center text-sm font-bold text-[#FFE7C2]"
            >
              {resultado.concluida
                ? "Parabéns! Você organizou os eventos corretamente!"
                : `Você acertou ${resultado.quantidadeAcertos} de ${resultado.totalEventos}. Tente novamente!`}
            </p>
          )}
        </div>
      </DndContext>

      <HowToPlayModal
        isOpen={modalComoJogarAberto}
        onClose={() => setModalComoJogarAberto(false)}
      />
    </main>
  );
}

export default App;
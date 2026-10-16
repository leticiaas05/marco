import {
  DndContext,
  type DragEndEvent,
} from "@dnd-kit/core";

import { useGame } from "./hooks/useGame";
import eventos from "./data/events";

import { Timeline } from "./components/Timeline/Timeline";
import { DropZone } from "./components/Dropzone/DropZone";
import { EventCard } from "./components/EventCard/EventCard";

function App() {
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

  const anosOrdenados = [...eventosDaFase]
    .sort((a, b) => a.year - b.year)
    .map((evento) => evento.year);

  return (
    <main className="min-h-screen bg-[#FFE7C2] text-[#381313]">
      <header className="flex items-center justify-between px-5 py-4 sm:px-10">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Marco.
        </h1>

        <button
          type="button"
          className="font-bold transition-opacity hover:opacity-70"
          onClick={() =>
            alert(
              "Arraste os eventos para as posições da timeline, da mais antiga para a mais recente. Depois, verifique sua resposta."
            )
          }
        >
          Como jogar?
        </button>
      </header>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="min-h-[calc(100vh-76px)] bg-[#381313] px-4 py-8 sm:px-6 sm:py-10">
          <Timeline
            currentPhase={faseAtual}
            years={anosOrdenados}
          >
            {Array.from({ length: 3 }, (_, index) => {
              const zonaId = `timeline-position-${index}`;
              const eventoId = posicionamentos[zonaId];

              const eventoPosicionado = eventosDaFase.find(
                (evento) => evento.id === eventoId
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
                      detailedFeedback={eventoPosicionado.detailedFeedback}
                    />
                  )}
                </DropZone>
              );
            })}
          </Timeline>

          <section
            className="mx-auto mt-10 grid w-full max-w-5xl grid-cols-1 items-start gap-6 sm:grid-cols-2 md:grid-cols-3"
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

          <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-4">
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
              className="mx-auto mt-6 max-w-3xl text-center font-bold text-[#FFE7C2]"
            >
              {resultado.concluida
                ? "Parabéns! Você organizou os eventos corretamente!"
                : `Você acertou ${resultado.quantidadeAcertos} de ${resultado.totalEventos}. Tente novamente!`}
            </p>
          )}

          {jogoConcluido && (
            <p
              role="status"
              className="mx-auto mt-6 max-w-3xl text-center text-xl font-extrabold text-[#FFE7C2]"
            >
              Você concluiu todas as fases do Marco!
            </p>
          )}
        </div>
      </DndContext>
    </main>
  );
}

export default App;
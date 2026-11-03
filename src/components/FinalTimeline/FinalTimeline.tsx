
import { useState } from "react";
import type { HistoricalEvent } from "../../utils/finalTimelineStorage";
import { getChronologicalYear } from "../../utils/finalTimelineStorage";
import { HistoricalContextModal } from "../HistoricalContextModal/HistoricalContextModal";

interface FinalTimelineProps {
  events: HistoricalEvent[];
}

export function FinalTimeline({ events }: FinalTimelineProps) {
  const [selectedEvent, setSelectedEvent] =
    useState<HistoricalEvent | null>(null);

  const eventosOrdenados = [...events].sort(
    (a, b) =>
      getChronologicalYear(a) - getChronologicalYear(b),
  );

  function formatarAno(evento: HistoricalEvent): string {
    const era = evento.yearEra === "BCE" ? "a.C." : "d.C.";
    return `${evento.year} ${era}`;
  }

  return (
    <>
      <section
        aria-label="Linha do tempo histórica completa"
        className="w-full overflow-x-auto pb-6"
      >
        <div className="relative mx-auto min-w-[900px]">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[186px] h-1 rounded-full bg-[#381313]/30"
          />

          <div className="grid grid-cols-9 gap-2">
            {eventosOrdenados.map((evento, index) => {
              const cardAcima = index % 2 === 0;

              return (
                <article
                  key={evento.id}
                  className="relative grid grid-rows-[160px_52px_160px] text-center"
                >
                  <div className="flex items-end justify-center pb-3">
                    {cardAcima && (
                      <div className="group relative h-[148px] w-full overflow-hidden rounded-xl bg-[#FFE7C2] text-[#381313] shadow-md transition-transform hover:-translate-y-1">
                        <img
                          src={evento.image}
                          alt=""
                          className="h-[76px] w-full object-cover"
                        />

                        <h3 className="px-1.5 pt-2 text-xs font-bold leading-tight">
                          {evento.title}
                        </h3>

                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#381313]/95 p-2 text-[#FFE7C2] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                          <p className="line-clamp-5 text-xs leading-snug">
                            {evento.description}
                          </p>
                        </div>

                        <button
                          type="button"
                          aria-label={`Consultar contexto histórico: ${evento.title}`}
                          aria-haspopup="dialog"
                          onClick={() => setSelectedEvent(evento)}
                          className="absolute right-1 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#381313]/90 text-[#FFE7C2] shadow hover:bg-[#542323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFE7C2]"
                        >
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-4 w-4"
                          >
                            <circle cx="12" cy="12" r="9" />
                            <path
                              d="M12 11v5m0-8h.01"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <span className="mb-1 whitespace-nowrap text-xs font-bold text-[#381313]">
                      {formatarAno(evento)}
                    </span>

                    <span
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 rounded-full border-[3px] border-[#FFE7C2] bg-[#381313] shadow"
                    />
                  </div>

                  <div className="flex items-start justify-center pt-3">
                    {!cardAcima && (
                      <div className="group relative h-[148px] w-full overflow-hidden rounded-xl bg-[#FFE7C2] text-[#381313] shadow-md transition-transform hover:translate-y-1">
                        <img
                          src={evento.image}
                          alt=""
                          className="h-[76px] w-full object-cover"
                        />

                        <h3 className="px-1.5 pt-2 text-xs font-bold leading-tight">
                          {evento.title}
                        </h3>

                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#381313]/95 p-2 text-[#FFE7C2] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                          <p className="line-clamp-5 text-xs leading-snug">
                            {evento.description}
                          </p>
                        </div>

                        <button
                          type="button"
                          aria-label={`Consultar contexto histórico: ${evento.title}`}
                          aria-haspopup="dialog"
                          onClick={() => setSelectedEvent(evento)}
                          className="absolute right-1 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#381313]/90 text-[#FFE7C2] shadow hover:bg-[#542323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFE7C2]"
                        >
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-4 w-4"
                          >
                            <circle cx="12" cy="12" r="9" />
                            <path
                              d="M12 11v5m0-8h.01"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <HistoricalContextModal
        event={
          selectedEvent
            ? {
                title: selectedEvent.title,
                description: selectedEvent.description,
                detailedFeedback: selectedEvent.detailedFeedback,
              }
            : null
        }
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}


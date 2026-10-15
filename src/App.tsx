
import { useState } from "react";
import {
  DndContext,
  type DragEndEvent,
} from "@dnd-kit/core";

import { Timeline } from "./components/Timeline/Timeline";
import { DropZone } from "./components/Dropzone/DropZone";
import { EventCard } from "./components/EventCard/EventCard";
import eventsData from "./data/events.json";

interface HistoricalEvent {
  id: string;
  phase: number;
  title: string;
  year: number;
  description: string;
  image: string;
}

const EVENTS = eventsData as HistoricalEvent[];
const CURRENT_PHASE = 3;

const phaseEvents = EVENTS
  .filter((event) => event.phase === CURRENT_PHASE)
  .slice(0, 3);

function App() {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  
function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;

  if (!over) return;

  const eventId = String(active.id);
  const zoneId = String(over.id);

  if (!zoneId.startsWith("timeline-position-")) return;

  setPlacements((previous) => {
    const sourceZone = Object.keys(previous).find(
      (key) => previous[key] === eventId
    );

    const targetEventId = previous[zoneId];

    if (sourceZone === zoneId) {
      return previous;
    }

    const updated = { ...previous };

    if (sourceZone) {
      if (targetEventId) {
        updated[sourceZone] = targetEventId;
      } else {
        delete updated[sourceZone];
      }
    }

    updated[zoneId] = eventId;

    return updated;
  });
}


  const placedEventIds = Object.values(placements);

  const availableEvents = phaseEvents.filter(
    (event) => !placedEventIds.includes(event.id)
  );

  return (
    <main className="min-h-screen bg-[#FFE7C2] text-[#381313]">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between px-5 py-4 sm:px-10">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Marco.
        </h1>

        <button
          type="button"
          className="font-bold transition-opacity hover:opacity-70"
          onClick={() =>
            alert("As instruções do jogo serão implementadas posteriormente.")
          }
        >
          Como jogar?
        </button>
      </header>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="min-h-[calc(100vh-76px)] bg-[#381313] px-4 py-8 sm:px-6 sm:py-10">
          {/* Timeline e posições */}
          <Timeline
            currentPhase={CURRENT_PHASE}
            years={phaseEvents.map((event) => event.year)}
          >
            {phaseEvents.map((event, index) => {
            const zoneId = `timeline-position-${index}`;
            const placedEventId = placements[zoneId];

            const placedEvent = phaseEvents.find(
              (item) => item.id === placedEventId
            );

            return (
              <DropZone key={zoneId} id={zoneId} index={index}>
                {placedEvent && (
                  <EventCard
                    id={placedEvent.id}
                    title={placedEvent.title}
                    description={placedEvent.description}
                    image={placedEvent.image}
                  />
                )}
              </DropZone>
            );
          })}
          </Timeline>

          {/* Cards que ainda não foram posicionados */}
          <section
            className="mx-auto mt-10 grid w-full max-w-5xl grid-cols-1 items-start gap-6 sm:grid-cols-2 md:grid-cols-3"
            aria-label="Eventos disponíveis para organizar"
          >
            {availableEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                image={event.image}
              />
            ))}
          </section>
        </div>
      </DndContext>
    </main>
  );
}

export default App;

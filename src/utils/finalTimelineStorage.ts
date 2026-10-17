
export interface HistoricalEvent {
  id: string;
  phase: number;
  title: string;
  year: number;
  yearEra?: "BCE" | "CE";
  description: string;
  detailedFeedback: string;
  image: string;
}

const STORAGE_KEY = "marco-final-timeline";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function isHistoricalEvent(value: unknown): value is HistoricalEvent {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const event = value as Record<string, unknown>;

  return (
    typeof event.id === "string" &&
    typeof event.phase === "number" &&
    typeof event.title === "string" &&
    typeof event.year === "number" &&
    Number.isFinite(event.year) &&
    (event.yearEra === undefined ||
      event.yearEra === "BCE" ||
      event.yearEra === "CE") &&
    typeof event.description === "string" &&
    typeof event.detailedFeedback === "string" &&
    typeof event.image === "string"
  );
}

function readEvents(): HistoricalEvent[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isHistoricalEvent);
  } catch {
    return [];
  }
}

export function savePhaseEvents(
  phase: number,
  events: HistoricalEvent[],
): void {
  if (!isBrowser()) {
    return;
  }

  if (![1, 2, 3].includes(phase)) {
    throw new Error("Fase inválida. Utilize as fases 1, 2 ou 3.");
  }

  if (
    events.length !== 3 ||
    events.some((event) => event.phase !== phase) ||
    events.some((event) => !isHistoricalEvent(event)) ||
    new Set(events.map((event) => event.id)).size !== 3
  ) {
    throw new Error(
      "A fase deve conter exatamente três eventos válidos e distintos.",
    );
  }

  const previousEvents = readEvents().filter(
    (event) => event.phase !== phase,
  );

  const selectedEvents = events.map((event) => ({
    ...event,
    phase,
  }));

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...previousEvents, ...selectedEvents]),
    );
  } catch (error) {
    console.error("Não foi possível salvar os eventos da jornada.", error);
    throw error;
  }
}

export function getFinalTimelineEvents(): HistoricalEvent[] {
  return readEvents().sort(
    (a, b) =>
      getChronologicalYear(a) - getChronologicalYear(b) ||
      a.id.localeCompare(b.id),
  );
}

export function getChronologicalYear(event: HistoricalEvent): number {
  if (event.yearEra === "BCE") {
    return -Math.abs(event.year);
  }

  return event.year;
}

export function clearFinalTimelineEvents(): void {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Não foi possível limpar os eventos da jornada.", error);
    throw error;
  }
}

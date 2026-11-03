
import { useState } from "react";
import { FinalTimeline } from "../../components/FinalTimeline/FinalTimeline";
import {
  getFinalTimelineEvents,
  type HistoricalEvent,
} from "../../utils/finalTimelineStorage";

interface FinalProps {
  onReiniciarJogo: () => void;
}

export function Final({ onReiniciarJogo }: FinalProps) {
  const [events] = useState<HistoricalEvent[]>(() =>
    getFinalTimelineEvents()
  );

  if (events.length !== 9) {
    return (
      <main className="min-h-screen bg-[#FFE7C2] p-8 text-[#381313]">
        <h1 className="text-2xl font-bold">
          Linha do tempo final
        </h1>

        <p className="mt-4">
          Não foi possível carregar os eventos da partida.
          Verifique se as três fases foram concluídas.
        </p>

        <button
          type="button"
          onClick={onReiniciarJogo}
          className="mt-6 rounded-xl bg-[#381313] px-6 py-3 font-bold text-[#FFE7C2] transition-colors hover:bg-[#542323] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#381313]"
        >
          Jogar novamente
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFE7C2] p-8 text-[#381313]">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Sua linha do tempo histórica
      </h1>

      <FinalTimeline events={events} />

      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={onReiniciarJogo}
          className="rounded-xl bg-[#381313] px-8 py-3 font-bold text-[#FFE7C2] shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#542323] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#381313]"
        >
          Jogar novamente
        </button>
      </div>
    </main>
  );
}

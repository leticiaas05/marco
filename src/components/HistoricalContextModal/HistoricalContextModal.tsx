
import { useEffect, useRef } from "react";
import type { Evento } from "../../types/events";

interface HistoricalContextModalProps {
  event: Pick<
  Evento,
  "title" | "description" | "detailedFeedback"
> | null;
  onClose: () => void;
}

export function HistoricalContextModal({
  event,
  onClose,
}: HistoricalContextModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!event) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="historical-modal-title"
        aria-describedby="historical-modal-description"
        className="relative flex max-h-[85dvh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-[#381313] text-[#FFE7C2] shadow-2xl"
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[#FFE7C2]/20 p-5 sm:p-6">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#FFE7C2]/70">
              Contexto histórico
            </p>

            <h2
              id="historical-modal-title"
              className="text-xl font-bold leading-tight sm:text-2xl"
            >
              {event.title}
            </h2>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar contexto histórico"
            className="shrink-0 rounded-lg p-2 transition-colors hover:bg-[#FFE7C2]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFE7C2]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path
                d="M18 6 6 18M6 6l12 12"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div
          id="historical-modal-description"
          className="overflow-y-auto p-5 sm:p-6"
        >
          <section className="mb-6">
            <h3 className="mb-2 text-base font-bold">
              O que aconteceu?
            </h3>

            <p className="text-sm leading-relaxed text-[#FFE7C2]/90">
              {event.description}
            </p>
          </section>

          <section>
            <h3 className="mb-2 text-base font-bold">
              Contexto, causas e consequências
            </h3>

            <p className="whitespace-pre-line text-sm leading-relaxed text-[#FFE7C2]/90">
              {event.detailedFeedback}
            </p>
          </section>
        </div>

        <footer className="shrink-0 border-t border-[#FFE7C2]/20 p-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-[#FFE7C2] px-4 py-3 font-semibold text-[#381313] transition-colors hover:bg-[#f5d7a7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFE7C2]"
          >
            Voltar à atividade
          </button>
        </footer>
      </section>
    </div>
  );
}

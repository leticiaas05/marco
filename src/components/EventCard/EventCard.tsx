import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { HistoricalContextModal } from "../HistoricalContextModal/HistoricalContextModal";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  detailedFeedback: string;
  image: string;
}

export function EventCard({
  id,
  title,
  description,
  detailedFeedback,
  image,
}: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({ id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <>
      <article
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={`relative w-full h-60 shrink-0 overflow-hidden rounded-2xl bg-historical-card-bg text-historical-card-text shadow-md cursor-grab active:cursor-grabbing select-none touch-none ${
          isDragging
            ? "opacity-50 z-50 shadow-2xl"
            : "opacity-100"
        }`}
      >
        <button
          type="button"
          aria-label={`Consultar contexto histórico: ${title}`}
          aria-haspopup="dialog"
          onPointerDown={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#381313]/90 text-[#FFE7C2] shadow-md transition-colors hover:bg-[#381313] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFE7C2]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
          >
            <circle cx="12" cy="12" r="9" />
            <path
              d="M12 11v5m0-8h.01"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <img
          src={image}
          className="h-24 w-full object-cover pointer-events-none"
          alt={title}
          draggable={false}
        />

        <div className="px-4 py-2">
          <h2 className="text-center text-sm font-bold leading-tight">
            {title}
          </h2>

          <p className="mt-1 text-justify text-xs leading-snug">
            {description}
          </p>
        </div>
      </article>

      <HistoricalContextModal
        event={
          isModalOpen
            ? { title, description, detailedFeedback }
            : null
        }
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}